import type { CompactVerb } from "./types.ts";

export type { CompactVerb, TenseName, SimpleTense } from "./types.ts";

export const verbs: CompactVerb[] = [
  // ═══════════════════════════════════════════
  // IRREGULAR VERBS (20)
  // ═══════════════════════════════════════════

  {
    infinitive: "être",
    english: "to be",
    group: "irregular",
    auxiliary: "avoir",
    participle: "été",
    stems: {
      "présent": null,
      "imparfait": "ét",
      "futur simple": "ser",
      "conditionnel présent": "ser",
      "subjonctif présent": null,
    },
    overrides: {
      "présent": ["suis", "es", "est", "sommes", "êtes", "sont"],
      "subjonctif présent": ["sois", "sois", "soit", "soyons", "soyez", "soient"],
    },
  },

  {
    infinitive: "avoir",
    english: "to have",
    group: "irregular",
    auxiliary: "avoir",
    participle: "eu",
    stems: {
      "présent": null,
      "imparfait": "av",
      "futur simple": "aur",
      "conditionnel présent": "aur",
      "subjonctif présent": null,
    },
    overrides: {
      "présent": ["ai", "as", "a", "avons", "avez", "ont"],
      "subjonctif présent": ["aie", "aies", "ait", "ayons", "ayez", "aient"],
    },
  },

  {
    infinitive: "aller",
    english: "to go",
    group: "irregular",
    auxiliary: "être",
    participle: "allé",
    pluralParticiple: "allés",
    stems: {
      "présent": null,
      "imparfait": "all",
      "futur simple": "ir",
      "conditionnel présent": "ir",
      "subjonctif présent": "aill",
    },
    overrides: {
      "présent": ["vais", "vas", "va", "allons", "allez", "vont"],
      "subjonctif présent": [null, null, null, "allions", "alliez", null],
    },
  },

  {
    infinitive: "faire",
    english: "to do / to make",
    group: "irregular",
    auxiliary: "avoir",
    participle: "fait",
    stems: {
      "présent": null,
      "imparfait": "fais",
      "futur simple": "fer",
      "conditionnel présent": "fer",
      "subjonctif présent": "fass",
    },
    overrides: {
      "présent": ["fais", "fais", "fait", "faisons", "faites", "font"],
    },
  },

  {
    infinitive: "pouvoir",
    english: "to be able to / can",
    group: "irregular",
    auxiliary: "avoir",
    participle: "pu",
    stems: {
      "présent": "peu",
      "imparfait": "pouv",
      "futur simple": "pourr",
      "conditionnel présent": "pourr",
      "subjonctif présent": "puiss",
    },
    overrides: {
      "présent": ["peux", "peux", "peut", "pouvons", "pouvez", "peuvent"],
    },
  },

  {
    infinitive: "vouloir",
    english: "to want",
    group: "irregular",
    auxiliary: "avoir",
    participle: "voulu",
    stems: {
      "présent": null,
      "imparfait": "voul",
      "futur simple": "voudr",
      "conditionnel présent": "voudr",
      "subjonctif présent": "veuill",
    },
    overrides: {
      "présent": ["veux", "veux", "veut", "voulons", "voulez", "veulent"],
      "subjonctif présent": [null, null, null, "voulions", "vouliez", null],
    },
  },

  {
    infinitive: "devoir",
    english: "to have to / must",
    group: "irregular",
    auxiliary: "avoir",
    participle: "dû",
    stems: {
      "présent": "doi",
      "imparfait": "dev",
      "futur simple": "devr",
      "conditionnel présent": "devr",
      "subjonctif présent": "doiv",
    },
    overrides: {
      "présent": ["dois", "dois", "doit", "devons", "devez", "doivent"],
      "subjonctif présent": [null, null, null, "devions", "deviez", null],
    },
  },

  {
    infinitive: "savoir",
    english: "to know (a fact)",
    group: "irregular",
    auxiliary: "avoir",
    participle: "su",
    stems: {
      "présent": null,
      "imparfait": "sav",
      "futur simple": "saur",
      "conditionnel présent": "saur",
      "subjonctif présent": "sach",
    },
    overrides: {
      "présent": ["sais", "sais", "sait", "savons", "savez", "savent"],
    },
  },

  {
    infinitive: "venir",
    english: "to come",
    group: "irregular",
    auxiliary: "être",
    participle: "venu",
    pluralParticiple: "venus",
    stems: {
      "présent": "vien",
      "imparfait": "ven",
      "futur simple": "viendr",
      "conditionnel présent": "viendr",
      "subjonctif présent": "vienn",
    },
    overrides: {
      "présent": [null, null, null, "venons", "venez", "viennent"],
      "subjonctif présent": [null, null, null, "venions", "veniez", null],
    },
  },

  {
    infinitive: "tenir",
    english: "to hold",
    group: "irregular",
    auxiliary: "avoir",
    participle: "tenu",
    stems: {
      "présent": "tien",
      "imparfait": "ten",
      "futur simple": "tiendr",
      "conditionnel présent": "tiendr",
      "subjonctif présent": "tienn",
    },
    overrides: {
      "présent": [null, null, null, "tenons", "tenez", "tiennent"],
      "subjonctif présent": [null, null, null, "tenions", "teniez", null],
    },
  },

  {
    infinitive: "prendre",
    english: "to take",
    group: "irregular",
    auxiliary: "avoir",
    participle: "pris",
    stems: {
      "présent": "prend",
      "imparfait": "pren",
      "futur simple": "prendr",
      "conditionnel présent": "prendr",
      "subjonctif présent": "prenn",
    },
    overrides: {
      "présent": ["prends", "prends", "prend", "prenons", "prenez", "prennent"],
      "subjonctif présent": [null, null, null, "prenions", "preniez", null],
    },
  },

  {
    infinitive: "mettre",
    english: "to put",
    group: "irregular",
    auxiliary: "avoir",
    participle: "mis",
    stems: {
      "présent": "met",
      "imparfait": "mett",
      "futur simple": "mettr",
      "conditionnel présent": "mettr",
      "subjonctif présent": "mett",
    },
    overrides: {
      "présent": ["mets", "mets", "met", "mettons", "mettez", "mettent"],
    },
  },

  {
    infinitive: "dire",
    english: "to say / to tell",
    group: "irregular",
    auxiliary: "avoir",
    participle: "dit",
    stems: {
      "présent": "di",
      "imparfait": "dis",
      "futur simple": "dir",
      "conditionnel présent": "dir",
      "subjonctif présent": "dis",
    },
    overrides: {
      "présent": ["dis", "dis", "dit", "disons", "dites", "disent"],
    },
  },

  {
    infinitive: "lire",
    english: "to read",
    group: "irregular",
    auxiliary: "avoir",
    participle: "lu",
    stems: {
      "présent": "li",
      "imparfait": "lis",
      "futur simple": "lir",
      "conditionnel présent": "lir",
      "subjonctif présent": "lis",
    },
    overrides: {
      "présent": ["lis", "lis", "lit", "lisons", "lisez", "lisent"],
    },
  },

  {
    infinitive: "écrire",
    english: "to write",
    group: "irregular",
    auxiliary: "avoir",
    participle: "écrit",
    stems: {
      "présent": "écri",
      "imparfait": "écriv",
      "futur simple": "écrir",
      "conditionnel présent": "écrir",
      "subjonctif présent": "écriv",
    },
    overrides: {
      "présent": ["écris", "écris", "écrit", "écrivons", "écrivez", "écrivent"],
    },
  },

  {
    infinitive: "voir",
    english: "to see",
    group: "irregular",
    auxiliary: "avoir",
    participle: "vu",
    stems: {
      "présent": "voi",
      "imparfait": "voy",
      "futur simple": "verr",
      "conditionnel présent": "verr",
      "subjonctif présent": "voi",
    },
    overrides: {
      "présent": ["vois", "vois", "voit", "voyons", "voyez", "voient"],
      "subjonctif présent": [null, null, null, "voyions", "voyiez", null],
    },
  },

  {
    infinitive: "connaître",
    english: "to know (a person/place)",
    group: "irregular",
    auxiliary: "avoir",
    participle: "connu",
    stems: {
      "présent": "connai",
      "imparfait": "connaiss",
      "futur simple": "connaîtr",
      "conditionnel présent": "connaîtr",
      "subjonctif présent": "connaiss",
    },
    overrides: {
      "présent": ["connais", "connais", "connaît", "connaissons", "connaissez", "connaissent"],
    },
  },

  {
    infinitive: "croire",
    english: "to believe",
    group: "irregular",
    auxiliary: "avoir",
    participle: "cru",
    stems: {
      "présent": "croi",
      "imparfait": "croy",
      "futur simple": "croir",
      "conditionnel présent": "croir",
      "subjonctif présent": "croi",
    },
    overrides: {
      "présent": ["crois", "crois", "croit", "croyons", "croyez", "croient"],
      "subjonctif présent": [null, null, null, "croyions", "croyiez", null],
    },
  },

  {
    infinitive: "boire",
    english: "to drink",
    group: "irregular",
    auxiliary: "avoir",
    participle: "bu",
    stems: {
      "présent": "boi",
      "imparfait": "buv",
      "futur simple": "boir",
      "conditionnel présent": "boir",
      "subjonctif présent": "boiv",
    },
    overrides: {
      "présent": ["bois", "bois", "boit", "buvons", "buvez", "boivent"],
      "subjonctif présent": [null, null, null, "buvions", "buviez", null],
    },
  },

  {
    infinitive: "vivre",
    english: "to live",
    group: "irregular",
    auxiliary: "avoir",
    participle: "vécu",
    stems: {
      "présent": "vi",
      "imparfait": "viv",
      "futur simple": "vivr",
      "conditionnel présent": "vivr",
      "subjonctif présent": "viv",
    },
    overrides: {
      "présent": ["vis", "vis", "vit", "vivons", "vivez", "vivent"],
    },
  },

  // ═══════════════════════════════════════════
  // COMMON REGULAR / SEMI-REGULAR VERBS (20)
  // ═══════════════════════════════════════════

  // ── Regular -er verbs ──

  {
    infinitive: "parler",
    english: "to speak",
    group: "er",
    auxiliary: "avoir",
    participle: "parlé",
  },

  {
    infinitive: "manger",
    english: "to eat",
    group: "er",
    auxiliary: "avoir",
    participle: "mangé",
    overrides: {
      "présent": [null, null, null, "mangeons", null, null],
      "imparfait": ["mangeais", "mangeais", "mangeait", null, null, "mangeaient"],
    },
  },

  {
    infinitive: "aimer",
    english: "to love / to like",
    group: "er",
    auxiliary: "avoir",
    participle: "aimé",
  },

  {
    infinitive: "travailler",
    english: "to work",
    group: "er",
    auxiliary: "avoir",
    participle: "travaillé",
  },

  {
    infinitive: "donner",
    english: "to give",
    group: "er",
    auxiliary: "avoir",
    participle: "donné",
  },

  {
    infinitive: "penser",
    english: "to think",
    group: "er",
    auxiliary: "avoir",
    participle: "pensé",
  },

  {
    infinitive: "trouver",
    english: "to find",
    group: "er",
    auxiliary: "avoir",
    participle: "trouvé",
  },

  {
    infinitive: "demander",
    english: "to ask",
    group: "er",
    auxiliary: "avoir",
    participle: "demandé",
  },

  {
    infinitive: "regarder",
    english: "to watch / to look at",
    group: "er",
    auxiliary: "avoir",
    participle: "regardé",
  },

  {
    infinitive: "appeler",
    english: "to call",
    group: "er",
    auxiliary: "avoir",
    participle: "appelé",
    overrides: {
      "présent": ["appelle", "appelles", "appelle", null, null, "appellent"],
      "futur simple": ["appellerai", "appelleras", "appellera", "appellerons", "appellerez", "appelleront"],
      "conditionnel présent": ["appellerais", "appellerais", "appellerait", "appellerions", "appelleriez", "appelleraient"],
      "subjonctif présent": ["appelle", "appelles", "appelle", null, null, "appellent"],
    },
  },

  // ── Regular -ir verbs ──

  {
    infinitive: "finir",
    english: "to finish",
    group: "ir",
    auxiliary: "avoir",
    participle: "fini",
  },

  {
    infinitive: "choisir",
    english: "to choose",
    group: "ir",
    auxiliary: "avoir",
    participle: "choisi",
  },

  {
    infinitive: "réussir",
    english: "to succeed",
    group: "ir",
    auxiliary: "avoir",
    participle: "réussi",
  },

  {
    infinitive: "remplir",
    english: "to fill",
    group: "ir",
    auxiliary: "avoir",
    participle: "rempli",
  },

  // ── Regular -re verbs ──

  {
    infinitive: "attendre",
    english: "to wait",
    group: "re",
    auxiliary: "avoir",
    participle: "attendu",
  },

  {
    infinitive: "vendre",
    english: "to sell",
    group: "re",
    auxiliary: "avoir",
    participle: "vendu",
  },

  {
    infinitive: "répondre",
    english: "to answer",
    group: "re",
    auxiliary: "avoir",
    participle: "répondu",
  },

  {
    infinitive: "perdre",
    english: "to lose",
    group: "re",
    auxiliary: "avoir",
    participle: "perdu",
  },

  {
    infinitive: "entendre",
    english: "to hear",
    group: "re",
    auxiliary: "avoir",
    participle: "entendu",
  },

  {
    infinitive: "rendre",
    english: "to return / to give back",
    group: "re",
    auxiliary: "avoir",
    participle: "rendu",
  },
];
