// src/components/SummaryPanel.jsx
import { useMemo } from "react";
import { getRace } from "../data/races";
import { getFaction } from "../data/factions";
import { getClassDef } from "../data/classes";

export default function SummaryPanel({ character }) {
  const race = useMemo(() => getRace(character?.raceId), [character?.raceId]);
  const faction = useMemo(() => getFaction(character?.factionId), [character?.factionId]);
  const clazz = useMemo(() => getClassDef(character?.classId), [character?.classId]);

  if (!character) return null;

  return (
    <div>
      <h3 style={{ margin: "0 0 8px 0" }}>Summary</h3>

      <div style={{ fontSize: 14, lineHeight: 1.5 }}>
        <div><strong>Name:</strong> {character.name || "—"}</div>
        <div><strong>Concept:</strong> {character.concept || "—"}</div>
        <div><strong>Race:</strong> {race?.name ?? character.raceId ?? "—"}</div>
        <div><strong>Faction:</strong> {faction?.shortName ?? faction?.name ?? character.factionId ?? "—"}</div>
        <div><strong>Class:</strong> {clazz ? `${clazz.name} (${clazz.roleName})` : character.classId ?? "—"}</div>
        <div><strong>Traits:</strong> {character.traits?.length ? character.traits.join(", ") : "—"}</div>
      </div>
    </div>
  );
}