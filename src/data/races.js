// src/data/races.js
// Shanmei / Celestial Planet — Playable Races
//
// Design goals:
// - Player-facing clarity (what you get, what it looks like, what it costs socially)
// - Machine-readable structure (for gating gear, faction tags, exports, validation)
// - PF1-friendly defaults (ability mods, size, speed, senses, languages)
//
// Notes:
// - Keep mechanics “light” here; deeper rules (extra attacks, growth stages, etc.)
//   can live in src/lib/rules.js so the data stays readable.

export const RACE_TAGS = {
  CELESTIAL: "celestial",
  NOBLE: "noble",
  KHAMEK: "khamek",
  ABHORRENT_SCARRED: "abhorrent_scarred",
  HENGE: "henge",
  KAMI_TOUCHED: "kami_touched",
  HALF_ONI: "half_oni",
  DRAGON_HATCHLING: "dragon_hatchling",

  // Meta tags used for gating items/paths
  TECH_SUSCEPTIBLE: "tech_susceptible", // e.g., EMP interactions
  SPIRIT_TUNED: "spirit_tuned",
  LARGE_ARMS: "large_arms", // Half-Oni oni arms / monkey-grip vibe
  MANY_LIMBS: "many_limbs", // Khamek
  GROWTH_TRACK: "growth_track", // Dragon hatchling progression
};

export const RACES = [
  {
    id: "celestial_human",
    name: "Celestial (Human)",
    tags: [RACE_TAGS.CELESTIAL],
    summary:
      "Humans who call themselves Celestials—descendants of planetfall, living under Tian’s sky with half-remembered star-ancestry.",
    appearance:
      "Ordinary humans with regional fashions: shrine cords, winter cloaks, lacquered hats, court sashes.",
    pf1: {
      type: "humanoid",
      subtype: ["human"],
      size: "Medium",
      speed: 30,
      abilityMods: {}, // PF1 human baseline
      senses: [],
      languages: {
        automatic: ["Celestial Common"],
        bonus: ["Khamek Tongue", "Guild Cant", "Classical Script", "Spirit Speech"],
      },
      racialTraits: [
        {
          id: "bonus_feat",
          name: "Bonus Feat",
          kind: "feat",
          text: "Gain 1 extra feat at 1st level.",
        },
        {
          id: "skilled",
          name: "Skilled",
          kind: "skill",
          text: "Gain +1 skill rank per level.",
        },
      ],
    },
    social: {
      legality: "varies",
      commonView:
        "The default people of the prefectures—loved, judged, taxed, drafted.",
    },
  },

  {
    id: "noble_nanite_blooded",
    name: "Noble (Nanite-Blooded)",
    tags: [RACE_TAGS.NOBLE, RACE_TAGS.TECH_SUSCEPTIBLE],
    summary:
      "A human lineage marked by refined ‘nanite blood’—wuxia nobility whose bodies carry engineered advantages (and engineered vulnerabilities).",
    appearance:
      "Courtly features, immaculate attire, subtle ‘too-perfect’ healing; some bear faint skin-lattice sheen under lantern light.",
    pf1: {
      type: "humanoid",
      subtype: ["human", "augmented"],
      size: "Medium",
      speed: 30,
      abilityMods: {
        // Keep conservative; you can tune later
        // If you prefer PF1-style: +2 to any one, -2 to any one (optional).
        cha: 2,
        wis: -2,
      },
      senses: [],
      languages: {
        automatic: ["Celestial Common", "Court Cant"],
        bonus: ["Guild Cant", "Classical Script", "Spirit Speech"],
      },
      racialTraits: [
        {
          id: "particle_veil",
          name: "Particle Veil (Su)",
          kind: "active",
          uses: "1/day",
          text:
            "As a swift action, gain a brief particle-shield: +2 shield bonus to AC for 3 rounds. (Tech effect; see EMP rules.)",
        },
        {
          id: "nanite_mending",
          name: "Nanite Mending (Ex)",
          kind: "passive",
          text:
            "Gain +2 racial bonus on Fortitude saves vs disease and poison; regain +1 hp whenever you receive magical healing (min 1).",
        },
        {
          id: "emp_sensitivity",
          name: "EMP Sensitivity",
          kind: "drawback",
          text:
            "If affected by an EMP effect, you are staggered for 1 round unless you succeed at a Fort save (DC set by effect).",
        },
      ],
    },
    social: {
      legality: "privileged",
      commonView:
        "‘Born wearing authority.’ Villagers lower their eyes; guilds bargain; the Church watches them carefully.",
    },
  },

  {
    id: "khamek_six_limbed",
    name: "Khamek (Six-Limbed Amphibian)",
    tags: [RACE_TAGS.KHAMEK, RACE_TAGS.MANY_LIMBS, RACE_TAGS.SPIRIT_TUNED],
    summary:
      "Medium-to-large amphibian folk with six limbs—climbers, marsh-born mystics, and frequent targets of Tech Mage enslavement.",
    appearance:
      "Frog/toad-like humanoids with 6 limbs; wide hands with gripping pads; glossy eyes; ceremonial scarification in some tribes.",
    pf1: {
      type: "humanoid",
      subtype: ["khamek"],
      size: "Medium",
      speed: 30,
      abilityMods: {
        str: 2,
        int: -2,
        wis: 2,
      },
      senses: ["low-light vision"],
      languages: {
        automatic: ["Khamek Tongue", "Celestial Common"],
        bonus: ["Spirit Speech", "Guild Cant"],
      },
      racialTraits: [
        {
          id: "six_limbed_climber",
          name: "Six-Limbed Climber",
          kind: "movement",
          text:
            "Gain a climb speed 20 ft and a +4 racial bonus on Climb checks. You are never flat-footed while climbing.",
        },
        {
          id: "amphibious",
          name: "Amphibious",
          kind: "movement",
          text: "You can breathe air and water.",
        },
        {
          id: "multiattack_framework",
          name: "Multi-Attack Framework",
          kind: "rules_hook",
          text:
            "Your extra limbs support multi-attack styles. (See rules: Khamek Multi-Attack & Feat Support.)",
        },
        {
          id: "feat_support_placeholder",
          name: "Feat Support",
          kind: "rules_hook",
          text:
            "Qualify for setting feats that key off extra limbs (e.g., extra off-hands, shield + weapon + tool use).",
        },
      ],
    },
    social: {
      legality: "contested",
      commonView:
        "Awe in village spirit traditions; suspicion in cities; danger near Slaver influence—Hammer doctrine offers partial protection.",
    },
  },

  {
    id: "abhorrent_scarred_cyborg",
    name: "Abhorrent-Scarred (Cyborg)",
    tags: [RACE_TAGS.ABHORRENT_SCARRED, RACE_TAGS.TECH_SUSCEPTIBLE],
    summary:
      "Survivors of Abhorrent assimilation—part corpse-machine, part stubborn self. Treated as ‘undead’ by many, but not beholden to the hive.",
    appearance:
      "Visible plating, cable-veins, synthetic joints; voice sometimes carries faint mechanical overtones in cold air.",
    pf1: {
      type: "humanoid", // You can swap to "undead" if you want full undead type later
      subtype: ["cyborg", "abhorrent-scarred"],
      size: "Medium",
      speed: 30,
      abilityMods: {
        con: 2,
        cha: -2,
      },
      senses: ["darkvision 60 ft"],
      languages: {
        automatic: ["Celestial Common"],
        bonus: ["Guild Cant", "Machine Cant", "Khamek Tongue"],
      },
      racialTraits: [
        {
          id: "machine_silence",
          name: "Machine Silence (Ex)",
          kind: "passive",
          text:
            "You reduce the normal noise of your machinery. Gain +4 racial bonus on Stealth checks in urban/ruin/metal environments; you do not take armor check penalty to Stealth from medium armor you are proficient with.",
        },
        {
          id: "no_food_no_breath",
          name: "Dead-Quiet Body",
          kind: "passive",
          text:
            "You do not need to eat or drink. You can hold your breath indefinitely (you still suffer from inhaled poisons if applicable by GM ruling).",
        },
        {
          id: "limited_sleep",
          name: "Limited Sleep",
          kind: "passive",
          text:
            "You do not sleep normally. You must enter a motionless ‘maintenance trance’ for 4 hours to regain spells/rest (counts as 8 hours for that purpose).",
        },
        {
          id: "emp_vulnerability",
          name: "EMP Vulnerability",
          kind: "drawback",
          text:
            "You take a –2 penalty on saves vs EMP effects. On a failed save, you are staggered for 1 round (or as effect dictates).",
        },
      ],
    },
    social: {
      legality: "feared",
      commonView:
        "Villagers make ward signs; Hammer Sect watches you like a lit fuse; Magi see you as evidence; Temple Sect sees you as a case file.",
    },
  },

  {
    id: "henge_shapeshifter",
    name: "Henge (Shapeshifter)",
    tags: [RACE_TAGS.HENGE, RACE_TAGS.SPIRIT_TUNED],
    summary:
      "Shape-changers tied to animal spirits—fox, crane, wolf, cat, and other forms. Their bodies wear myth like a second skin.",
    appearance:
      "Humanoid with subtle animal markers (ears, eyes, tail) in base form; full animal form is unmistakable.",
    pf1: {
      type: "humanoid",
      subtype: ["shapechanger"],
      size: "Medium",
      speed: 30,
      abilityMods: { dex: 2, int: -2, cha: 2 },
      senses: ["low-light vision"],
      languages: {
        automatic: ["Celestial Common"],
        bonus: ["Spirit Speech", "Khamek Tongue"],
      },
      racialTraits: [
        {
          id: "two_shapes",
          name: "Two Shapes (Su)",
          kind: "active",
          uses: "at-will",
          text:
            "You can assume a chosen animal form (Small or Medium) as beast shape I for a total of 10 minutes per level per day, divided as you choose. Returning to humanoid is a swift action.",
        },
        {
          id: "spirit_scent",
          name: "Spirit Scent",
          kind: "passive",
          text:
            "Gain scent, but only to detect supernatural taint (demons, cursed relics, Abhorrent drift).",
        },
      ],
    },
    social: {
      legality: "uneasy",
      commonView:
        "Beloved in folktales, distrusted in court. Stone Sect often protects them; Ledger Sect loves paperwork about them.",
    },
  },

  {
    id: "kami_touched_spirit_folk",
    name: "Spirit Folk / Kami-Touched",
    tags: [RACE_TAGS.KAMI_TOUCHED, RACE_TAGS.SPIRIT_TUNED],
    summary:
      "Mortals touched by place-spirits—river, orchard, mountain, hearth. They are closer to the spirit ecology and suffer when it destabilizes.",
    appearance:
      "Humanlike with subtle tells: water-sheen skin, leaf-hair, frost-breath in warm rooms, ink-black eyes, etc.",
    pf1: {
      type: "humanoid",
      subtype: ["spiritfolk"],
      size: "Medium",
      speed: 30,
      abilityMods: { wis: 2, con: -2, cha: 2 },
      senses: [],
      languages: {
        automatic: ["Celestial Common", "Spirit Speech"],
        bonus: ["Khamek Tongue", "Classical Script"],
      },
      racialTraits: [
        {
          id: "kami_ward",
          name: "Kami Ward (Su)",
          kind: "active",
          uses: "1/day",
          text:
            "Gain a +2 deflection bonus to AC and +2 on saves vs demons/possession for 3 rounds (as a blessing of local spirits).",
        },
        {
          id: "placebound_attunement",
          name: "Placebound Attunement",
          kind: "passive",
          text:
            "Once per day, ask the local place-spirit a question (as augury, but limited to 70% accuracy; GM may answer in omens).",
        },
      ],
    },
    social: {
      legality: "tolerated",
      commonView:
        "Villagers treat you as ‘lucky’ or ‘dangerous’; Temple Sect watches you; Stone Sect often claims you as kin.",
    },
  },

  {
    id: "half_oni",
    name: "Half-Oni",
    tags: [RACE_TAGS.HALF_ONI, RACE_TAGS.LARGE_ARMS],
    summary:
      "Ogre/oni-blooded mortals—physically imposing, spiritually ‘hot,’ often feared as bad-omen births or recruited as enforcers.",
    appearance:
      "Large frame, visible tusks or small horns, heavy hands/forearms (‘oni arms’), skin tones from ash to ember.",
    pf1: {
      type: "humanoid",
      subtype: ["oni-blooded"],
      size: "Medium",
      speed: 30,
      abilityMods: { str: 2, con: 2, cha: -2 },
      senses: ["darkvision 60 ft"],
      languages: {
        automatic: ["Celestial Common"],
        bonus: ["Oni Cant", "Spirit Speech", "Guild Cant"],
      },
      racialTraits: [
        {
          id: "oni_arms",
          name: "Oni Arms (Monkey-Grip)",
          kind: "passive",
          text:
            "You can wield weapons one size category larger than you as if they were your size, but you take a –2 penalty on attack rolls when doing so. (This does not stack with other size-increase effects.)",
        },
        {
          id: "demonic_resistance",
          name: "Demonic Resistance",
          kind: "passive",
          text:
            "Gain resist 5 to either fire or electricity (choose at character creation).",
        },
        {
          id: "intimidating_presence",
          name: "Intimidating Presence",
          kind: "skill",
          text: "Gain +2 racial bonus on Intimidate checks.",
        },
      ],
    },
    social: {
      legality: "suspect",
      commonView:
        "People assume trouble follows you. Hammer Sect respects strength; Ledger Sect assumes guilt; Temple Sect assumes possession risk.",
    },
  },

  {
    id: "dragon_hatchling",
    name: "Dragon Hatchling",
    tags: [RACE_TAGS.DRAGON_HATCHLING, RACE_TAGS.GROWTH_TRACK, RACE_TAGS.SPIRIT_TUNED],
    summary:
      "A small faerie-dragon-like hatchling—myth returned to the world. Begins tiny and gear-limited; grows into a herald-being over time.",
    appearance:
      "Brightwing/Grogu energy: small, winged, luminous eyes; later develops more draconic proportions and elemental resonance.",
    pf1: {
      type: "dragon", // If you want PF1 strictness, you can keep as "dragon"
      subtype: ["hatchling"],
      size: "Small",
      speed: 20,
      fly: { speed: 40, maneuverability: "good" }, // tweak to taste
      abilityMods: { dex: 2, cha: 2, str: -2 },
      senses: ["darkvision 60 ft", "low-light vision"],
      languages: {
        automatic: ["Draconic", "Celestial Common (broken)"],
        bonus: ["Spirit Speech", "Classical Script"],
      },
      racialTraits: [
        {
          id: "elemental_spark",
          name: "Elemental Spark (Su)",
          kind: "active",
          uses: "3/day",
          text:
            "Choose an element (fire, cold, electricity, acid) at creation. As a standard action, make a 15-ft line or 10-ft cone dealing 1d6 damage (Ref half). Damage scales by growth stage (see growth rules).",
        },
        {
          id: "gear_limitation",
          name: "Nonhumanoid Anatomy",
          kind: "drawback",
          text:
            "You cannot wear most humanoid armor or gear without custom modification (typically +50% cost).",
        },
        {
          id: "growth_track",
          name: "Growth Track",
          kind: "rules_hook",
          text:
            "You advance through draconic stages with story milestones. At Young Wyrmling stage, you gain opposable thumbs and can use humanoid weapons normally.",
        },
      ],
      growthStages: [
        {
          id: "hatchling",
          name: "Hatchling",
          size: "Small",
          notes:
            "Limited gear use; flight possible; breath is minor; claws/bite only.",
          unlocks: ["elemental_spark", "gear_limitation"],
        },
        {
          id: "young_wyrmling",
          name: "Young Wyrmling",
          size: "Small or Medium (GM choice)",
          notes:
            "Hands develop opposable thumbs; can wield humanoid weapons; breath increases; stronger natural armor.",
          unlocks: ["humanoid_weapon_use"],
        },
      ],
    },
    social: {
      legality: "mythic",
      commonView:
        "Either a holy omen or a disaster magnet. Everyone wants to claim you: Stone Sect protects, Magi study, nobles covet, demons notice.",
    },
  },
];

// Handy lookup map
export const RACES_BY_ID = Object.fromEntries(RACES.map((r) => [r.id, r]));

// Optional: small helpers (used by UI)
export function getRace(id) {
  return RACES_BY_ID[id] ?? null;
}

export function raceHasTag(raceId, tag) {
  const r = getRace(raceId);
  return !!r && (r.tags ?? []).includes(tag);
}