// src/data/classes.js
// Shanmei / Celestial Planet — Classes (PF1 chassis, setting reskins)
//
// Goals:
// - Keep PF1 class chassis names visible (so rules lookups are easy)
// - Provide setting-facing “role names” and one-paragraph flavor
// - Provide faction/race tag suggestions + optional restrictions hooks
// - Provide starter kit hints (gear kits will live in gearKits.js)
//
// Notes:
// - Do NOT encode deep PF1 mechanics here.
// - Use rules hooks so rules.js can enforce restrictions if you want.

import { FACTION_TAGS } from "./factions";
import { RACE_TAGS } from "./races";

export const CLASS_TAGS = {
  THEURGE: "class_theurge",
  TECH_MAGE: "class_tech_mage",
  NOBLE: "class_noble",
  WANDERER: "class_wanderer",
};

export const CLASSES = [
  // ---------------------------
  // THEURGES (Heaven + Spirits)
  // ---------------------------
  {
    id: "cleric_theurge",
    pf1Class: "Cleric",
    name: "Cleric",
    roleName: "Theurge Priest",
    group: "Theurges (Heaven + Spirits)",
    tags: [CLASS_TAGS.THEURGE],
    summary:
      "Ordained ministers and shrine-priests who channel Tian’s order and local spirits through formal rites, blessings, and sanctified law.",
    recommendedFactions: [
      "church_stone",
      "church_palm",
      "church_ledger",
      "church_hammer",
    ],
    suggestedFactionTags: [FACTION_TAGS.CHURCH],
    allowedFactionTags: [FACTION_TAGS.CHURCH], // soft restriction; rules.js may enforce
    suggestedRaceTags: [RACE_TAGS.CELESTIAL, RACE_TAGS.NOBLE, RACE_TAGS.KAMI_TOUCHED],
    hooks: [
      "You were posted to Fēnggēn Shrine before the seal failed.",
      "You carry a rite-book stamped by the Ledger Sect.",
      "You have seen a demon’s shadow in a bell’s reflection.",
    ],
    starterKitHints: ["stone_warder", "palm_medic", "hammer_cordoner"],
  },

  {
    id: "oracle_theurge",
    pf1Class: "Oracle",
    name: "Oracle",
    roleName: "Omen-Bound Theurge",
    group: "Theurges (Heaven + Spirits)",
    tags: [CLASS_TAGS.THEURGE],
    summary:
      "Chosen (or cursed) seers whose power leaks through them like weather. Their revelations feel like prophecy to villages and like liability to bureaucrats.",
    recommendedFactions: ["church_stone", "church_temple", "church_ledger", "guild_oracles"],
    suggestedFactionTags: [FACTION_TAGS.CHURCH, FACTION_TAGS.ORACLES],
    allowedFactionTags: [FACTION_TAGS.CHURCH, FACTION_TAGS.ORACLES, FACTION_TAGS.INDEPENDENT],
    suggestedRaceTags: [RACE_TAGS.CELESTIAL, RACE_TAGS.KAMI_TOUCHED, RACE_TAGS.HENGE],
    hooks: [
      "You dreamed the Winter Mouth before it opened.",
      "Your curse is a ‘fault-line’ in your own spirit.",
      "The Tech Mages keep offering you instruments you refuse to touch.",
    ],
    starterKitHints: ["omen_reader", "temple_inquisitor"],
  },

  {
    id: "shaman_witch_theurge",
    pf1Class: "Shaman/Witch",
    name: "Shaman (or Witch)",
    roleName: "Spirit-Binder",
    group: "Theurges (Heaven + Spirits)",
    tags: [CLASS_TAGS.THEURGE],
    summary:
      "Mediums, hexers, and spirit-binders who work the edge between village cosmology and Church doctrine—often tolerated, often hunted.",
    recommendedFactions: ["church_stone", "church_temple", "independent_wanderer"],
    suggestedFactionTags: [FACTION_TAGS.STONE, FACTION_TAGS.TEMPLE, FACTION_TAGS.INDEPENDENT],
    allowedFactionTags: [FACTION_TAGS.CHURCH, FACTION_TAGS.INDEPENDENT],
    suggestedRaceTags: [RACE_TAGS.KHAMEK, RACE_TAGS.KAMI_TOUCHED, RACE_TAGS.HENGE],
    hooks: [
      "A place-spirit speaks to you through winter birds.",
      "Your familiar refuses to approach the rift.",
      "The Ledger Sect has your name in a file.",
    ],
    starterKitHints: ["stone_medium", "fox_binder"],
  },

  {
    id: "shugenja_reskinned",
    pf1Class: "Shugenja (Reskinned)",
    name: "Shugenja",
    roleName: "Elemental Rite-Caster",
    group: "Theurges (Heaven + Spirits)",
    tags: [CLASS_TAGS.THEURGE],
    summary:
      "Rite-casters who negotiate with elemental spirits through formal offerings. Their magic feels ‘old’ even when it’s doing something technologically impossible.",
    recommendedFactions: ["church_stone", "church_temple"],
    suggestedFactionTags: [FACTION_TAGS.CHURCH],
    allowedFactionTags: [FACTION_TAGS.CHURCH, FACTION_TAGS.INDEPENDENT],
    suggestedRaceTags: [RACE_TAGS.CELESTIAL, RACE_TAGS.KAMI_TOUCHED, RACE_TAGS.DRAGON_HATCHLING],
    hooks: [
      "Your prayers sound like code to the Magi.",
      "You can taste metal in the air when demons are near.",
      "A shrine bell answers you when you whisper its true name.",
    ],
    starterKitHints: ["elemental_rites"],
    rulesHooks: ["requires_shugenja_ruleset"],
  },

  // ---------------------------
  // TECH MAGES
  // ---------------------------
  {
    id: "magus_tech_blade",
    pf1Class: "Magus",
    name: "Magus",
    roleName: "Tech-Blade Adept",
    group: "Tech Mages",
    tags: [CLASS_TAGS.TECH_MAGE],
    summary:
      "Relic-sword duelists who fuse disciplined arcana with device-cores—wuxia steel guided by engineered wonders.",
    recommendedFactions: ["guild_magi", "house_jinyu_jade_mantle"],
    suggestedFactionTags: [FACTION_TAGS.MAGI, FACTION_TAGS.NOBLE_HOUSE],
    allowedFactionTags: [FACTION_TAGS.GUILD, FACTION_TAGS.NOBLE_HOUSE, FACTION_TAGS.INDEPENDENT],
    suggestedRaceTags: [RACE_TAGS.NOBLE, RACE_TAGS.CELESTIAL],
    hooks: [
      "Your blade hums when the Abhorrent are close.",
      "Your training manuals are sealed in guild lacquer.",
      "You’ve seen a device that the Church would burn on sight.",
    ],
    starterKitHints: ["magi_duelist", "jade_mantle_duelist"],
  },

  {
    id: "alchemist_device_maker",
    pf1Class: "Alchemist",
    name: "Alchemist",
    roleName: "Device-Maker",
    group: "Tech Mages",
    tags: [CLASS_TAGS.TECH_MAGE],
    summary:
      "Chemistry, powders, stimulants, and relic-tech prototypes. In Shanmei, an Alchemist looks like a tinkerer until the lantern turns blue.",
    recommendedFactions: ["guild_magi", "guild_grafters", "guild_travellers"],
    suggestedFactionTags: [FACTION_TAGS.GUILD],
    allowedFactionTags: [FACTION_TAGS.GUILD, FACTION_TAGS.INDEPENDENT],
    suggestedRaceTags: [RACE_TAGS.CELESTIAL, RACE_TAGS.KHAMEK, RACE_TAGS.ABHORRENT_SCARRED],
    hooks: [
      "You can’t stop taking notes when you see Abhorrent tissue.",
      "Your kit is legal on paper and illegal in practice.",
      "You’ve sworn never to work for the Slavers—again.",
    ],
    starterKitHints: ["magi_surveyor", "grafter_field_kit"],
  },

  {
    id: "investigator_relic_engineer",
    pf1Class: "Investigator",
    name: "Investigator",
    roleName: "Relic Engineer",
    group: "Tech Mages",
    tags: [CLASS_TAGS.TECH_MAGE],
    summary:
      "Forensic relic-handlers and field analysts. They read a battlefield like a circuit diagram and a shrine like a crime scene.",
    recommendedFactions: ["guild_magi", "guild_oracles", "church_temple"],
    suggestedFactionTags: [FACTION_TAGS.MAGI, FACTION_TAGS.ORACLES, FACTION_TAGS.TEMPLE],
    allowedFactionTags: [FACTION_TAGS.GUILD, FACTION_TAGS.CHURCH, FACTION_TAGS.INDEPENDENT],
    suggestedRaceTags: [RACE_TAGS.CELESTIAL, RACE_TAGS.NOBLE],
    hooks: [
      "You carry a seal-stamped notebook with blank pages that fill themselves.",
      "You know the name of the last person who opened this vault.",
      "You have a personal grudge against the Grafters.",
    ],
    starterKitHints: ["azure_lantern_investigator"],
  },

  {
    id: "wizard_system_scholar",
    pf1Class: "Wizard",
    name: "Wizard",
    roleName: "System Scholar",
    group: "Tech Mages",
    tags: [CLASS_TAGS.TECH_MAGE],
    summary:
      "Not ‘book wizards’—system scholars who treat magic as a formal language and technology as a spellbook you can rewrite.",
    recommendedFactions: ["guild_magi", "guild_oracles"],
    suggestedFactionTags: [FACTION_TAGS.GUILD],
    allowedFactionTags: [FACTION_TAGS.GUILD, FACTION_TAGS.INDEPENDENT, FACTION_TAGS.CHURCH],
    suggestedRaceTags: [RACE_TAGS.CELESTIAL, RACE_TAGS.KHAMEK, RACE_TAGS.ABHORRENT_SCARRED],
    hooks: [
      "You believe the Abhorrent is a corrupted operating system.",
      "You can’t unsee the geometry of the rift.",
      "Your mentor vanished into a vault and never came out.",
    ],
    starterKitHints: ["magi_scholar"],
  },

  // ---------------------------
  // NOBLES / WUXIA KNIGHTS
  // ---------------------------
  {
    id: "samurai_wuxia_retainer",
    pf1Class: "Samurai",
    name: "Samurai",
    roleName: "Wuxia Retainer",
    group: "Nobles / Wuxia Knights",
    tags: [CLASS_TAGS.NOBLE],
    summary:
      "A sworn retainer of a house or sect—disciplined steel, oaths, banners, and the politics that follow you like a shadow.",
    recommendedFactions: ["house_jinyu_jade_mantle", "church_hammer"],
    suggestedFactionTags: [FACTION_TAGS.JINYU, FACTION_TAGS.HAMMER],
    allowedFactionTags: [FACTION_TAGS.NOBLE_HOUSE, FACTION_TAGS.CHURCH, FACTION_TAGS.INDEPENDENT],
    suggestedRaceTags: [RACE_TAGS.NOBLE, RACE_TAGS.CELESTIAL, RACE_TAGS.HALF_ONI],
    hooks: [
      "You carry a written oath sealed in wax and ash.",
      "You have standing orders to deny the Guild access to relic cores.",
      "You have a rival retainer who wants you disgraced.",
    ],
    starterKitHints: ["jade_mantle_retainer", "hammer_retainer"],
  },

  {
    id: "cavalier_banner_lord",
    pf1Class: "Cavalier",
    name: "Cavalier",
    roleName: "Court Retainer / Banner Lord",
    group: "Nobles / Wuxia Knights",
    tags: [CLASS_TAGS.NOBLE],
    summary:
      "Mounted leaders, garrison captains, and banner-bearing champions—equal parts warrior and political instrument.",
    recommendedFactions: ["house_jinyu_jade_mantle"],
    suggestedFactionTags: [FACTION_TAGS.NOBLE_HOUSE],
    allowedFactionTags: [FACTION_TAGS.NOBLE_HOUSE, FACTION_TAGS.CHURCH, FACTION_TAGS.INDEPENDENT],
    suggestedRaceTags: [RACE_TAGS.NOBLE, RACE_TAGS.CELESTIAL],
    hooks: [
      "You command frightened soldiers who would rather run than descend.",
      "Your house expects a heroic story—no matter the cost.",
      "The Ledger Sect has demanded you hand over your prisoners.",
    ],
    starterKitHints: ["jade_mantle_officer"],
  },

  {
    id: "fighter_garrison_blade",
    pf1Class: "Fighter",
    name: "Fighter",
    roleName: "Garrison Blade",
    group: "Nobles / Wuxia Knights",
    tags: [CLASS_TAGS.NOBLE],
    summary:
      "Professional soldiers, shrine-guards, mercenaries, and bodyguards. In Shanmei, steel still wins arguments.",
    recommendedFactions: ["house_jinyu_jade_mantle", "church_hammer", "independent_wanderer"],
    suggestedFactionTags: [FACTION_TAGS.MILITARY],
    allowedFactionTags: [FACTION_TAGS.NOBLE_HOUSE, FACTION_TAGS.CHURCH, FACTION_TAGS.INDEPENDENT, FACTION_TAGS.GUILD],
    suggestedRaceTags: [RACE_TAGS.CELESTIAL, RACE_TAGS.NOBLE, RACE_TAGS.HALF_ONI, RACE_TAGS.KHAMEK],
    hooks: [
      "You’ve fought bandits. You’ve never fought the dead that learn.",
      "Your armor is patched with shrine talismans.",
      "You owe your life to a Palm Sect healer.",
    ],
    starterKitHints: ["frontline_soldier"],
  },

  {
    id: "monk_inner_iron",
    pf1Class: "Monk",
    name: "Monk",
    roleName: "Inner-Iron Disciple",
    group: "Nobles / Wuxia Knights",
    tags: [CLASS_TAGS.NOBLE],
    summary:
      "Disciples of disciplined body-craft—sometimes spiritual, sometimes biomechanical. Their fists are philosophy made violent.",
    recommendedFactions: ["church_stone", "church_palm", "independent_wanderer", "house_jinyu_jade_mantle"],
    suggestedFactionTags: [FACTION_TAGS.MYSTIC, FACTION_TAGS.HEALING],
    allowedFactionTags: [FACTION_TAGS.CHURCH, FACTION_TAGS.INDEPENDENT, FACTION_TAGS.NOBLE_HOUSE],
    suggestedRaceTags: [RACE_TAGS.CELESTIAL, RACE_TAGS.KHAMEK, RACE_TAGS.HENGE],
    hooks: [
      "You believe the Abhorrent is a failure of right practice—body and world out of relation.",
      "You can hear the shrine bell in your bones.",
      "You have sworn not to carry a blade (until the rift changes that).",
    ],
    starterKitHints: ["monastic_disciple"],
  },

  // ---------------------------
  // WANDERERS
  // ---------------------------
  {
    id: "rogue_ninja_shadowhand",
    pf1Class: "Rogue/Ninja",
    name: "Rogue / Ninja",
    roleName: "Shadowhand",
    group: "Wanderers",
    tags: [CLASS_TAGS.WANDERER],
    summary:
      "Thieves, scouts, spies, and knife-artists. In Shanmei, the shadows have new teeth—and the rift eats the careless.",
    recommendedFactions: ["church_temple", "guild_travellers", "independent_wanderer", "old_song_keepers"],
    suggestedFactionTags: [FACTION_TAGS.INQUISITION, FACTION_TAGS.TRAVELLERS],
    allowedFactionTags: [FACTION_TAGS.CHURCH, FACTION_TAGS.GUILD, FACTION_TAGS.INDEPENDENT, FACTION_TAGS.NOBLE_HOUSE],
    suggestedRaceTags: [RACE_TAGS.CELESTIAL, RACE_TAGS.HENGE, RACE_TAGS.ABHORRENT_SCARRED],
    hooks: [
      "You can move without leaving prints in snow.",
      "You know which doors in the manor are never watched.",
      "You’ve stolen something that now whispers at night.",
    ],
    starterKitHints: ["shadow_scout"],
  },

  {
    id: "ranger_roadwarden",
    pf1Class: "Ranger",
    name: "Ranger",
    roleName: "Roadwarden",
    group: "Wanderers",
    tags: [CLASS_TAGS.WANDERER],
    summary:
      "Hunters, trackers, and mountain wardens. They know the pine roads, the broken ruins, and what footprints look like when they’re metal.",
    recommendedFactions: ["house_jinyu_jade_mantle", "old_song_keepers", "independent_wanderer", "church_stone"],
    suggestedFactionTags: [FACTION_TAGS.SHANMEI],
    allowedFactionTags: [FACTION_TAGS.NOBLE_HOUSE, FACTION_TAGS.INDEPENDENT, FACTION_TAGS.CHURCH, FACTION_TAGS.GUILD],
    suggestedRaceTags: [RACE_TAGS.CELESTIAL, RACE_TAGS.KHAMEK, RACE_TAGS.HENGE],
    hooks: [
      "You followed the first corrupted deer tracks to the Winter Mouth.",
      "You’ve hunted bandits—and something worse has begun hunting them.",
      "You know a path around the broken road that no map shows.",
    ],
    starterKitHints: ["mountain_tracker"],
  },

  {
    id: "bard_storyknife",
    pf1Class: "Bard",
    name: "Bard",
    roleName: "Storyknife",
    group: "Wanderers",
    tags: [CLASS_TAGS.WANDERER],
    summary:
      "Court poets, traveling performers, rumor-weavers, and spirit-singers. In this world, songs can stabilize a room—or open it.",
    recommendedFactions: ["independent_wanderer", "house_jinyu_jade_mantle", "church_stone"],
    suggestedFactionTags: [FACTION_TAGS.MYSTIC],
    allowedFactionTags: [FACTION_TAGS.INDEPENDENT, FACTION_TAGS.NOBLE_HOUSE, FACTION_TAGS.CHURCH, FACTION_TAGS.GUILD],
    suggestedRaceTags: [RACE_TAGS.CELESTIAL, RACE_TAGS.HENGE, RACE_TAGS.KAMI_TOUCHED],
    hooks: [
      "Your songs calm spirits—until the Abhorrent disrupt the rhythm.",
      "You once performed for Lady Jinyu Ming and learned too much.",
      "You know an ‘old song’ the bandits claim as theirs.",
    ],
    starterKitHints: ["court_minstral", "wandering_performer"],
  },

  {
    id: "gunslinger_thunderhand",
    pf1Class: "Gunslinger",
    name: "Gunslinger",
    roleName: "Thunderhand",
    group: "Wanderers",
    tags: [CLASS_TAGS.WANDERER],
    summary:
      "Rare firearm specialists wielding relic guns, gauss weapons, or blackpowder equivalents. Heavily regulated; devastating when deployed.",
    recommendedFactions: ["house_jinyu_jade_mantle", "guild_magi", "guild_travellers"],
    suggestedFactionTags: [FACTION_TAGS.MILITARY, FACTION_TAGS.TECH_ACCESS],
    allowedFactionTags: [FACTION_TAGS.NOBLE_HOUSE, FACTION_TAGS.GUILD, FACTION_TAGS.INDEPENDENT],
    suggestedRaceTags: [RACE_TAGS.CELESTIAL, RACE_TAGS.NOBLE],
    hooks: [
      "Your weapon has a serial-mark older than the prefecture.",
      "The Ledger Sect has your license on file.",
      "You’ve shot something that should not have bled.",
    ],
    starterKitHints: ["licensed_marksman"],
    rulesHooks: ["firearms_regulated"],
  },
];

// Lookup helpers
export const CLASSES_BY_ID = Object.fromEntries(CLASSES.map((c) => [c.id, c]));

export function getClassDef(id) {
  return CLASSES_BY_ID[id] ?? null;
}

export function classAllowedByFactionTags(classId, factionTags = []) {
  const c = getClassDef(classId);
  if (!c) return true;
  if (!c.allowedFactionTags || c.allowedFactionTags.length === 0) return true;
  // Allowed if ANY allowed tag is present
  return c.allowedFactionTags.some((t) => factionTags.includes(t));
}