import { getRace } from "../data/races";
import { getFaction } from "../data/factions";
import { getClassDef } from "../data/classes";

export function buildRoll20Text(ch) {
  const race = getRace(ch.raceId);
  const faction = getFaction(ch.factionId);
  const clazz = getClassDef(ch.classId);

  return [
    `# ${ch.name || "Unnamed Character"}`,
    ``,
    `**Concept:** ${ch.concept || "—"}`,
    `**Race:** ${race?.name || "—"}`,
    `**Faction:** ${faction?.name || "—"}`,
    `**Class:** ${clazz?.name || "—"}`,
    `**Traits:** ${ch.traits?.length ? ch.traits.join(", ") : "—"}`,
    ``,
    `## Notes`,
    `${ch.notes || "—"}`,
  ].join("\n");
}