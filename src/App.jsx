// App.jsx
import { useEffect, useMemo, useState } from "react";
import Stepper from "./components/Stepper";
import SummaryPanel from "./components/SummaryPanel";
import Roll20Preview from "./components/Roll20Preview";
import StepConcept from "./components/StepConcept";
import StepIdentity from "./components/StepIdentity";
import StepClass from "./components/StepClass";
import { loadSlot, saveSlot } from "./lib/storage";
import { buildRoll20Text } from "./lib/exportRoll20";

const DEFAULT_CHAR = {
  slot: "A",
  name: "",
  concept: "",
  raceId: "celestial_human",
  factionId: "church_stone",
  classId: "fighter_garrison_blade",
  traits: [],
  gearKit: null,
  notes: "",
};

function normalizeCharacter(raw, slotFallback = "A") {
  const ch = raw ?? {};
  return {
    ...DEFAULT_CHAR,
    ...ch,
    slot: ch.slot ?? slotFallback,

    raceId:
      ch.raceId ??
      (ch.race === "Celestial (Human)" ? "celestial_human" : DEFAULT_CHAR.raceId),

    factionId:
      ch.factionId ??
      (typeof ch.faction === "string" && ch.faction.includes("Stone Sect")
        ? "church_stone"
        : DEFAULT_CHAR.factionId),

    classId:
      ch.classId ??
      (ch.clazz === "Fighter" ? "fighter_garrison_blade" : DEFAULT_CHAR.classId),
  };
}

export default function App() {
  const [ch, setCh] = useState(() => normalizeCharacter(loadSlot("A"), "A"));
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    saveSlot(ch.slot, ch);
  }, [ch]);

  const roll20Text = useMemo(() => buildRoll20Text(ch), [ch]);

  const steps = [
    { title: "Concept", component: <StepConcept ch={ch} setCh={setCh} /> },
    { title: "Race & Faction", component: <StepIdentity ch={ch} setCh={setCh} /> },
    { title: "Class", component: <StepClass ch={ch} setCh={setCh} /> },
    { title: "Traits", component: <div>TODO: StepTraits</div> },
    { title: "Gear", component: <div>TODO: StepGear</div> },
    { title: "Export", component: <div>TODO: StepExport</div> },
  ];

  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        gridTemplateRows: "56px 1fr",
        fontFamily: "system-ui",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          borderBottom: "1px solid #e5e5e5",
        }}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <strong>Shanmei Character Creator</strong>

          <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13 }}>
            Slot
            <select
              value={ch.slot}
              onChange={(e) => {
                const slot = e.target.value;
                const loaded = loadSlot(slot);
                setCh(normalizeCharacter(loaded, slot));
              }}
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </label>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => navigator.clipboard.writeText(roll20Text)}>
            Copy Roll20
          </button>
          <button onClick={() => navigator.clipboard.writeText(JSON.stringify(ch, null, 2))}>
            Copy JSON
          </button>
        </div>
      </div>

      {/* Main */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "240px 1fr 380px",
          height: "100%",
        }}
      >
        {/* Stepper */}
        <div style={{ borderRight: "1px solid #e5e5e5", padding: 12 }}>
          <Stepper
            steps={steps.map((s) => s.title)}
            active={activeStep}
            onSelect={setActiveStep}
          />
        </div>

        {/* Step content */}
        <div style={{ padding: 16, overflow: "auto" }}>
          <h2 style={{ marginTop: 0 }}>{steps[activeStep].title}</h2>
          {steps[activeStep].component}
        </div>

        {/* Sticky summary */}
        <div
          style={{
            borderLeft: "1px solid #e5e5e5",
            padding: 12,
            overflow: "auto",
          }}
        >
          <SummaryPanel character={ch} />
          <div style={{ marginTop: 12 }}>
            <Roll20Preview text={roll20Text} />
          </div>
        </div>
      </div>
    </div>
  );
}