// src/data/factions.js
// Shanmei / Celestial Planet — Factions
//
// Goals:
// - Player-facing names + short “what people think” blurbs
// - Machine-readable tags for gating classes, archetypes, gear kits, and legality
// - Minimal assumptions: you can expand later without refactoring UI
//
// Usage ideas:
// - character.factionId links to one of these
// - character.factionTags derived from faction.tags + optional subfaction tags
// - rules.js can enforce: class requires tag, gear requires tag, etc.

export const FACTION_TAGS = {
  // Broad identity
  CHURCH: "church",
  GUILD: "guild",
  NOBLE_HOUSE: "noble_house",
  INDEPENDENT: "independent",

  // Church sects
  LEDGER: "ledger_sect",
  TEMPLE: "temple_sect",
  STONE: "stone_sect",
  PALM: "palm_sect",
  HAMMER: "hammer_sect",

  // Five Guilds (Tech Mage orders)
  MAGI: "guild_magi",
  TRAVELLERS: "guild_travellers",
  SLAVERS: "guild_slavers",
  ORACLES: "guild_oracles",
  GRAFTERS: "guild_grafters",

  // Local noble
  JINYU: "house_jinyu",

  // Useful meta-tags for rules
  MILITARY: "military",
  INQUISITION: "inquisition",
  HEALING: "healing",
  MYSTIC: "mystic",
  BUREAUCRACY: "bureaucracy",
  TECH_ACCESS: "tech_access",
  FORBIDDEN_TECH: "forbidden_tech", // Grafters etc.
  SURVEY_AUTHORITY: "survey_authority",

  // Region / campaign
  SHANMEI: "shanmei_prefecture",
};

export const FACTIONS = [
  // ---------------------------
  // UNITED CHURCH OF TIAN (5 Sects)
  // ---------------------------
  {
    id: "church_ledger",
    name: "United Church of Tian — Ledger Sect",
    shortName: "Ledger Sect",
    tags: [
      FACTION_TAGS.CHURCH,
      FACTION_TAGS.LEDGER,
      FACTION_TAGS.BUREAUCRACY,
      FACTION_TAGS.SHANMEI,
    ],
    summary:
      "Legalists and doctrinal administrators. They govern the Church’s decrees, quarantines, censures, and official truths.",
    commonerView:
      "Feared as paper-wielding judges. People behave when the Ledger arrives.",
    doctrine: {
      virtues: ["Order", "Stability", "Quarantine", "Doctrine"],
      vices: ["Censorship", "Pride", "Slow mercy"],
    },
    authority: {
      legalityProfile:
        "Can declare quarantines, seize relic evidence, and arrest unauthorized mediums.",
      techStance:
        "Suspicious of unsanctioned tech; prefers regulation over experimentation.",
    },
    startingHooks: [
      "Assigned as a shrine auditor or magistrate’s clerk.",
      "Sent to enforce quarantine around the Winter Mouth.",
      "Investigating doctrinal embarrassment tied to planetfall records.",
    ],
  },

  {
    id: "church_temple",
    name: "United Church of Tian — Temple Sect",
    shortName: "Temple Sect",
    tags: [
      FACTION_TAGS.CHURCH,
      FACTION_TAGS.TEMPLE,
      FACTION_TAGS.INQUISITION,
      FACTION_TAGS.SHANMEI,
    ],
    summary:
      "Inquisitors and spies. The Temple Sect studies demonology to fight demons and hunts spiritual corruption through secrecy and leverage.",
    commonerView:
      "Whispered about like ghosts with warrants. They smile politely while you confess anyway.",
    doctrine: {
      virtues: ["Vigilance", "Sacrifice", "Hidden war"],
      vices: ["Paranoia", "Cruel certainty", "Forbidden methods"],
    },
    authority: {
      legalityProfile:
        "Can detain suspects for ‘spiritual questioning’ and seize cursed artifacts.",
      techStance:
        "Pragmatic: will use tech if it defeats demons, then deny it in public.",
    },
    startingHooks: [
      "Undercover in Héshì as a pilgrim, scribe, or trader.",
      "Sent to identify who (or what) is feeding the rift.",
      "Carrying a sealed dossier on Abhorrent-demon bindings.",
    ],
  },

  {
    id: "church_stone",
    name: "United Church of Tian — Stone Sect",
    shortName: "Stone Sect",
    tags: [
      FACTION_TAGS.CHURCH,
      FACTION_TAGS.STONE,
      FACTION_TAGS.MYSTIC,
      FACTION_TAGS.SHANMEI,
    ],
    summary:
      "Mystics on the edge of society. The Stone Sect keeps shrine rites, negotiates with local spirits, and maintains warding stations like Fēnggēn.",
    commonerView:
      "Respected and slightly feared. They know the old ways and speak to what lives in the hills.",
    doctrine: {
      virtues: ["Balance", "Reciprocity", "Rites", "Listening"],
      vices: ["Isolation", "Oddness", "Political weakness"],
    },
    authority: {
      legalityProfile:
        "Local spiritual authority; often overruled by Ledger on paper, but trusted by villages in practice.",
      techStance:
        "Cautious. Tech must be sanctified, understood, and placed in right relation—or it becomes pollution.",
    },
    startingHooks: [
      "Caretaker of a shrine ward or keeper of rites.",
      "Assigned to stabilize the spirit ecology around the Winter Mouth.",
      "Protecting a village medium from Ledger arrest.",
    ],
  },

  {
    id: "church_palm",
    name: "United Church of Tian — Palm Sect",
    shortName: "Palm Sect",
    tags: [
      FACTION_TAGS.CHURCH,
      FACTION_TAGS.PALM,
      FACTION_TAGS.HEALING,
      FACTION_TAGS.SHANMEI,
    ],
    summary:
      "Healers and mendicants. The Palm Sect treats plague, injury, and spiritual exhaustion, and keeps people alive when doctrine fails them.",
    commonerView:
      "Beloved. They show up when you’ve got nothing left but breath and hope.",
    doctrine: {
      virtues: ["Mercy", "Care", "Community"],
      vices: ["Naiveté", "Overextension"],
    },
    authority: {
      legalityProfile:
        "Limited legal authority; enormous moral authority. Often protected by villages.",
      techStance:
        "Practical and humble. Will use what heals—if it doesn’t invite worse harm.",
    },
    startingHooks: [
      "Traveling medic responding to shrine refugees.",
      "Assigned to keep survivors alive during containment operations.",
      "Carrying medicines that smell faintly of ozone (sanctified tech).",
    ],
  },

  {
    id: "church_hammer",
    name: "United Church of Tian — Hammer Sect",
    shortName: "Hammer Sect",
    tags: [
      FACTION_TAGS.CHURCH,
      FACTION_TAGS.HAMMER,
      FACTION_TAGS.MILITARY,
      FACTION_TAGS.SHANMEI,
    ],
    summary:
      "The Church’s militant arm. Born from frontier wars against the Abhorrent, the Hammer Sect specializes in containment, purification, and burning the dead.",
    commonerView:
      "Safety and terror in the same armor. When they arrive, something is already too late.",
    doctrine: {
      virtues: ["Duty", "Courage", "Containment"],
      vices: ["Ruthlessness", "Collateral damage"],
    },
    authority: {
      legalityProfile:
        "Emergency powers during outbreaks: cordons, burn orders, battlefield tribunals (often backed by Ledger).",
      techStance:
        "Weapon-only. Tech is a tool; uncontrolled tech is a sin-vector.",
    },
    startingHooks: [
      "Cremator veteran assigned to Shanmei’s emergency cordon.",
      "Escort for a Stone Sect ritual team entering the rift site.",
      "Ordered to prevent Magi extraction of forbidden cores.",
    ],
  },

  // ---------------------------
  // THE FIVE GUILDS (Tech Mage Orders)
  // ---------------------------
  {
    id: "guild_magi",
    name: "The Five Guilds — The Magi",
    shortName: "Magi",
    tags: [
      FACTION_TAGS.GUILD,
      FACTION_TAGS.MAGI,
      FACTION_TAGS.TECH_ACCESS,
      FACTION_TAGS.SURVEY_AUTHORITY,
      FACTION_TAGS.SHANMEI,
    ],
    summary:
      "Keepers of lore and workers of wonder. They study relic-tech, maintain sanctioned devices, and claim authority over ‘infrastructure events.’",
    commonerView:
      "Awe and resentment. They look like wizards who never share their secrets.",
    doctrine: {
      virtues: ["Knowledge", "Control", "Stability through understanding"],
      vices: ["Arrogance", "Extraction mindset"],
    },
    authority: {
      legalityProfile:
        "Sanctioned to deploy survey camps, claim tech evidence, and issue ‘safety protocols’ (often contested by Church).",
      techStance:
        "Pro-tech, pro-containment. They believe the world is readable if you have the right instruments.",
    },
    startingHooks: [
      "Assigned to Azure Lantern Survey to ‘assess and stabilize.’",
      "Secretly tasked to recover a seed shard for the guild vault.",
      "Embedded liaison to negotiate with Church sects (and manipulate them).",
    ],
  },

  {
    id: "guild_travellers",
    name: "The Five Guilds — The Travellers",
    shortName: "Travellers",
    tags: [FACTION_TAGS.GUILD, FACTION_TAGS.TRAVELLERS, FACTION_TAGS.TECH_ACCESS],
    summary:
      "Masters of locomotion and wanderers of the road. They build portals, vehicles, and travel-tech, and they know the old stone roads better than nobles do.",
    commonerView:
      "Romantic and suspicious—like friendly smugglers with impossible boots.",
    doctrine: { virtues: ["Freedom", "Mapping", "Speed"], vices: ["Lawless pragmatism"] },
    authority: {
      legalityProfile:
        "Limited formal authority; enormous influence via transport networks and ‘missing routes.’",
      techStance:
        "Tech should move. If it can’t move, they’ll make it move.",
    },
    startingHooks: [
      "Hired guide to reach severed roads near the rift.",
      "Courier with a sealed device that must not be scanned.",
      "Saboteur tasked to deny rivals access to a ruin-road.",
    ],
  },

  {
    id: "guild_slavers",
    name: "The Five Guilds — The Slavers",
    shortName: "Slavers",
    tags: [FACTION_TAGS.GUILD, FACTION_TAGS.SLAVERS, FACTION_TAGS.TECH_ACCESS],
    summary:
      "Purveyors in servants of flesh and metal. They trade in indenture, constructs, and controlled cyborg labor—especially targeting the vulnerable.",
    commonerView:
      "Hated. People don’t say their name loudly.",
    doctrine: { virtues: ["Efficiency", "Order"], vices: ["Cruelty", "Dehumanization"] },
    authority: {
      legalityProfile:
        "Legally protected by guild charters in many regions; constantly challenged by Church doctrine and local uprisings.",
      techStance:
        "Tech is leverage. People are assets. They prefer ‘control’ over ‘innovation.’",
    },
    startingHooks: [
      "An agent ‘inspecting’ Khamek labor conditions (a lie).",
      "Trying to capture Abhorrent-Scarred as ‘recoverable property.’",
      "Seeking to profit from refugee desperation after the rift opens.",
    ],
  },

  {
    id: "guild_oracles",
    name: "The Five Guilds — The Oracles",
    shortName: "Oracles",
    tags: [FACTION_TAGS.GUILD, FACTION_TAGS.ORACLES, FACTION_TAGS.TECH_ACCESS],
    summary:
      "Seers of fortune and eye to the empire. They run predictive engines, political intelligence, and ‘auspice arrays’ that look like divination to commoners.",
    commonerView:
      "Unnerving. They know things they shouldn’t, and they smile like it’s polite.",
    doctrine: { virtues: ["Foresight", "Information"], vices: ["Manipulation"] },
    authority: {
      legalityProfile:
        "Protected as ‘advisors’ to nobles and guild councils; often operate above local law.",
      techStance:
        "Tech is prophecy. If the numbers say it, reality will comply.",
    },
    startingHooks: [
      "Sent to predict spread patterns of the Abhorrent outbreak.",
      "Carrying a forecast that contradicts Church doctrine.",
      "Secretly tracking a demon prince’s behavioral signature.",
    ],
  },

  {
    id: "guild_grafters",
    name: "The Five Guilds — The Grafters",
    shortName: "Grafters",
    tags: [
      FACTION_TAGS.GUILD,
      FACTION_TAGS.GRAFTERS,
      FACTION_TAGS.TECH_ACCESS,
      FACTION_TAGS.FORBIDDEN_TECH,
    ],
    summary:
      "Shapers of flesh and seekers of the Abhorrent. They graft augments, study mutations, and dance at the edge of sanctioned science.",
    commonerView:
      "Feared like surgeons who don’t believe in souls.",
    doctrine: { virtues: ["Adaptation", "Survival"], vices: ["Hubris", "Monstrosity"] },
    authority: {
      legalityProfile:
        "Officially sanctioned under strict rules; unofficially infamous for ‘field exceptions.’",
      techStance:
        "The body is a platform. The Abhorrent is a library. Both are dangerous.",
    },
    startingHooks: [
      "Sent to recover living samples from *Lamina osseus* units.",
      "Offering ‘help’ to wounded soldiers in exchange for consent forms.",
      "Trying to bind a demon into an Abhorrent commander (for science).",
    ],
  },

  // ---------------------------
  // NOBLE HOUSE (Local Power)
  // ---------------------------
  {
    id: "house_jinyu_jade_mantle",
    name: "House Jinyu — Jade Mantle Retainers",
    shortName: "Jade Mantle",
    tags: [FACTION_TAGS.NOBLE_HOUSE, FACTION_TAGS.JINYU, FACTION_TAGS.MILITARY, FACTION_TAGS.SHANMEI],
    summary:
      "Shanmei’s ruling house and its sworn retainers. They keep order, guard roads, and try to prevent panic from becoming rebellion.",
    commonerView:
      "Distant authority—sometimes protective, sometimes predatory. Everyone knows who holds the rice stores.",
    doctrine: {
      virtues: ["Order", "Duty", "Prestige"],
      vices: ["Control", "Pride", "Politics over truth"],
    },
    authority: {
      legalityProfile:
        "Local law, taxation, conscription, and armed response—often competing with Church decrees and guild charters.",
      techStance:
        "Selective. Nobles keep refined relic-tech and outlaw what empowers peasants.",
    },
    startingHooks: [
      "Retainer assigned to escort Church officials into the shrine.",
      "Officer trying to keep Magi ‘help’ from becoming occupation.",
      "Noble scion seeking glory by sealing the Winter Mouth publicly.",
    ],
  },

  // ---------------------------
  // INDEPENDENT / LOCAL GROUPS
  // ---------------------------
  {
    id: "independent_wanderer",
    name: "Independent — Wanderer / Free Agent",
    shortName: "Independent",
    tags: [FACTION_TAGS.INDEPENDENT],
    summary:
      "Unaffiliated adventurers, mercenaries, pilgrims, and local heroes operating outside formal faction authority.",
    commonerView:
      "Unpredictable. Sometimes saviors, sometimes trouble magnets.",
    doctrine: { virtues: ["Freedom"], vices: ["No backing when things go bad"] },
    authority: {
      legalityProfile:
        "No inherent authority. Survival depends on reputation and who you offend.",
      techStance:
        "Varies wildly—from scavengers to purists to secret tech hoarders.",
    },
    startingHooks: [
      "Hired by a village to protect them when factions argue.",
      "Running from guild debt or Church scrutiny.",
      "Following a rumor that the rift leads to planetfall relics.",
    ],
  },

  {
    id: "old_song_keepers",
    name: "Local Group — Keepers of the Old Song",
    shortName: "Old Song Keepers",
    tags: [FACTION_TAGS.INDEPENDENT, FACTION_TAGS.MYSTIC, FACTION_TAGS.SHANMEI],
    summary:
      "Bandits, exiles, or traditionalists who ‘remember’ pre-Church rites and guard old roads. Potential allies or rivals depending on how the PCs treat them.",
    commonerView:
      "Half folk hero, half nightmare. They steal—sometimes from the rich, sometimes from you.",
    doctrine: { virtues: ["Memory", "Local loyalty"], vices: ["Violence", "Mythic stubbornness"] },
    authority: {
      legalityProfile: "Illegal under noble law; tolerated in places where they keep worse things away.",
      techStance:
        "Suspicious. They believe tech is a hungry thing that brings demons (often correct).",
    },
    startingHooks: [
      "Offering a secret mountain path around a broken road.",
      "Trading shrine knowledge for supplies.",
      "Trying to sabotage Magi extraction teams.",
    ],
  },
];

// Fast lookup
export const FACTIONS_BY_ID = Object.fromEntries(FACTIONS.map((f) => [f.id, f]));

export function getFaction(id) {
  return FACTIONS_BY_ID[id] ?? null;
}

export function factionHasTag(factionId, tag) {
  const f = getFaction(factionId);
  return !!f && (f.tags ?? []).includes(tag);
}