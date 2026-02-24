// src/lib/exportRoll20.js
import { getRace } from "../data/races";
import { getFaction } from "../data/factions";
import { getClassDef } from "../data/classes";

export function buildRoll20Text(ch) {
  const race = getRace(ch.raceId);
  const faction = getFaction(ch.factionId);
  const clazz = getClassDef(ch.classId);

  const raceName = race?.name ?? ch.raceId ?? "—";
  const factionName = faction?.name ?? ch.factionId ?? "—";
  const classLine = clazz ? `${clazz.name} — ${clazz.roleName}` : (ch.classId ?? "—");

  // Nice extras for Roll20 handout text
  const factionTags = faction?.tags?.length ? faction.tags.join(", ") : "—";
  const raceTags = race?.tags?.length ? race.tags.join(", ") : "—";

  return [
    `# ${ch.name || "Unnamed Character"}`,
    ``,
    `**Concept:** ${ch.concept || "—"}`,
    `**Race:** ${raceName}`,
    `**Faction:** ${factionName}`,
    `**Class:** ${classLine}`,
    `**Traits:** ${ch.traits?.length ? ch.traits.join(", ") : "—"}`,
    ``,
    `---`,
    `**Race Tags:** ${raceTags}`,
    `**Faction Tags:** ${factionTags}`,
    ``,
    `## Notes`,
    `${ch.notes || "—"}`,
  ].join("\n");
}