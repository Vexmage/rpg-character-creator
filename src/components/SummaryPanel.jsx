import { getRace } from "../data/races";
import { getFaction } from "../data/factions";
import { getClassDef } from "../data/classes";

export default function SummaryPanel({ character }) {
  if (!character) return null;

  const race = getRace(character.raceId);
  const faction = getFaction(character.factionId);
  const clazz = getClassDef(character.classId);

  return (
    <div>
      <h3 style={{ margin: "0 0 8px 0" }}>Summary</h3>
      <div style={{ fontSize: 14, lineHeight: 1.5 }}>
        <div><strong>Name:</strong> {character.name || "—"}</div>
        <div><strong>Concept:</strong> {character.concept || "—"}</div>
        <div><strong>Race:</strong> {race?.name || "—"}</div>
        <div><strong>Faction:</strong> {faction?.name || "—"}</div>
        <div><strong>Class:</strong> {clazz?.name || "—"}</div>
        <div><strong>Traits:</strong> {character.traits?.length ? character.traits.join(", ") : "—"}</div>
      </div>
    </div>
  );
}