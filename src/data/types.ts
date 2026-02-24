export type TenseName =
  | "présent"
  | "imparfait"
  | "futur simple"
  | "passé composé"
  | "conditionnel présent"
  | "subjonctif présent";

/** Simple tenses (everything except passé composé) */
export type SimpleTense = Exclude<TenseName, "passé composé">;

export type VerbGroup = "er" | "ir" | "re" | "irregular";

/**
 * A 6-tuple: [je, tu, il/elle/on, nous, vous, ils/elles]
 * null entries mean "derive from stem + suffix"
 */
export type FormTuple = [
  string | null,
  string | null,
  string | null,
  string | null,
  string | null,
  string | null,
];

export type FullFormTuple = [string, string, string, string, string, string];

export interface CompactVerb {
  /** The infinitive form, e.g. "parler" */
  infinitive: string;

  /** English translation, e.g. "to speak" */
  english: string;

  /** Verb group for suffix selection */
  group: VerbGroup;

  /** Which auxiliary to use for passé composé */
  auxiliary: "avoir" | "être";

  /** Past participle (singular masculine), e.g. "parlé" */
  participle: string;

  /**
   * Past participle for nous/vous/ils forms with être auxiliary.
   * Only needed for être verbs. e.g. "allés"
   * If omitted, defaults to participle + "s"
   */
  pluralParticiple?: string;

  /**
   * Stems per simple tense. Only needed for irregular verbs.
   * Regular verbs derive stems from the infinitive + group.
   * Set to null for a tense that's fully overridden.
   */
  stems?: Partial<Record<SimpleTense, string | null>>;

  /**
   * Full or partial overrides per tense.
   * A full 6-string tuple overrides the entire tense.
   * A tuple with nulls overrides only specific forms.
   */
  overrides?: Partial<Record<SimpleTense, FormTuple>>;
}
