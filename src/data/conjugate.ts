import type {
  CompactVerb,
  SimpleTense,
  TenseName,
  VerbGroup,
  FullFormTuple,
} from "./types.ts";

// ── Suffix tables ──────────────────────────────────────────────

/** Présent suffixes vary by group */
const PRESENT_SUFFIXES: Record<string, FullFormTuple> = {
  er: ["e", "es", "e", "ons", "ez", "ent"],
  ir: ["is", "is", "it", "issons", "issez", "issent"],
  re: ["s", "s", "", "ons", "ez", "ent"],
};

/** These tenses use the same suffixes regardless of group */
const SHARED_SUFFIXES: Record<string, FullFormTuple> = {
  imparfait: ["ais", "ais", "ait", "ions", "iez", "aient"],
  "futur simple": ["ai", "as", "a", "ons", "ez", "ont"],
  "conditionnel présent": ["ais", "ais", "ait", "ions", "iez", "aient"],
  "subjonctif présent": ["e", "es", "e", "ions", "iez", "ent"],
};

// ── Auxiliary forms for passé composé ──────────────────────────

const AVOIR_FORMS: FullFormTuple = ["ai", "as", "a", "avons", "avez", "ont"];
const ETRE_FORMS: FullFormTuple = [
  "suis",
  "es",
  "est",
  "sommes",
  "êtes",
  "sont",
];

// ── Stem derivation for regular verbs ──────────────────────────

function deriveStems(
  infinitive: string,
  group: VerbGroup,
): Record<SimpleTense, string> {
  switch (group) {
    case "er": {
      const root = infinitive.slice(0, -2);
      return {
        présent: root,
        imparfait: root,
        "futur simple": infinitive,
        "conditionnel présent": infinitive,
        "subjonctif présent": root,
      };
    }
    case "ir": {
      const root = infinitive.slice(0, -2);
      return {
        présent: root,
        imparfait: root + "iss",
        "futur simple": infinitive,
        "conditionnel présent": infinitive,
        "subjonctif présent": root + "iss",
      };
    }
    case "re": {
      const root = infinitive.slice(0, -2);
      const futurRoot = infinitive.slice(0, -1); // drop final "e"
      return {
        présent: root,
        imparfait: root,
        "futur simple": futurRoot,
        "conditionnel présent": futurRoot,
        "subjonctif présent": root,
      };
    }
    default:
      // Irregular verbs must provide stems explicitly
      throw new Error(
        `Cannot derive stems for irregular verb: ${infinitive}`,
      );
  }
}

// ── Suffix lookup ──────────────────────────────────────────────

function getSuffixes(tense: SimpleTense, group: VerbGroup): FullFormTuple {
  if (tense === "présent") {
    const key = group === "irregular" ? "re" : group; // fallback for irregular
    return PRESENT_SUFFIXES[key];
  }
  return SHARED_SUFFIXES[tense];
}

// ── Main conjugation function ──────────────────────────────────

/**
 * Returns 6 verb forms (without pronouns) for the given verb + tense.
 * [je, tu, il, nous, vous, ils]
 */
export function conjugate(verb: CompactVerb, tense: TenseName): FullFormTuple {
  // ── Passé composé: auxiliary + participle ──
  if (tense === "passé composé") {
    const auxForms = verb.auxiliary === "être" ? ETRE_FORMS : AVOIR_FORMS;
    const pp = verb.participle;
    const pluralPp = verb.pluralParticiple ?? pp + "s";

    return auxForms.map((aux, i) => {
      // nous (3), vous (4), ils (5) get plural participle for être verbs
      const participle =
        verb.auxiliary === "être" && i >= 3 ? pluralPp : pp;
      return `${aux} ${participle}`;
    }) as FullFormTuple;
  }

  // ── Check for full override ──
  const simpleTense = tense as SimpleTense;
  const overrides = verb.overrides?.[simpleTense];
  if (overrides && overrides.every((o) => o !== null)) {
    return overrides as FullFormTuple;
  }

  // ── Get stem ──
  let stem: string;
  const customStem = verb.stems?.[simpleTense];
  if (customStem !== undefined && customStem !== null) {
    stem = customStem;
  } else if (customStem === null) {
    // Explicitly null means "fully overridden" — should have been caught above
    throw new Error(
      `Stem is null but no full override for ${verb.infinitive} ${tense}`,
    );
  } else if (verb.group !== "irregular") {
    // Derive from infinitive + group
    stem = deriveStems(verb.infinitive, verb.group)[simpleTense];
  } else {
    throw new Error(
      `No stem provided for irregular verb ${verb.infinitive} in ${tense}`,
    );
  }

  // ── Get suffixes ──
  const suffixes = getSuffixes(simpleTense, verb.group);

  // ── Build forms, applying per-form overrides where present ──
  return suffixes.map((suffix, i) => {
    if (overrides?.[i] !== undefined && overrides[i] !== null) {
      return overrides[i];
    }
    return stem + suffix;
  }) as FullFormTuple;
}

// ── Pronoun formatting ─────────────────────────────────────────

const PRONOUNS = [
  "je",
  "tu",
  "il/elle/on",
  "nous",
  "vous",
  "ils/elles",
] as const;

/** Check if a verb form starts with a vowel sound (needs j' elision) */
function needsElision(form: string): boolean {
  return /^[aeéèêëiîïoôuûùühyæœ]/i.test(form);
}

/** Format a verb form with its pronoun for display */
export function withPronoun(form: string, personIndex: number): string {
  if (personIndex === 0) {
    return needsElision(form) ? `j'${form}` : `je ${form}`;
  }
  const pronoun = PRONOUNS[personIndex];
  return `${pronoun} ${form}`;
}

/** Get the pronoun label for display next to an input */
export function getPronounLabel(personIndex: number): string {
  return PRONOUNS[personIndex];
}
