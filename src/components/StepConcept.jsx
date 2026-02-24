// src/components/StepConcept.jsx
export default function StepConcept({ ch, setCh }) {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 760 }}>
      <Field label="Character Name">
        <input
          value={ch.name}
          onChange={(e) => setCh({ ...ch, name: e.target.value })}
          placeholder="e.g., Kōu of Héshì / Captain Jinyu Ren / Sister Yáo..."
          style={inputStyle}
        />
      </Field>

      <Field label="Concept (one sentence)">
        <input
          value={ch.concept}
          onChange={(e) => setCh({ ...ch, concept: e.target.value })}
          placeholder="e.g., ‘Shrine courier who saw something climb from the Winter Mouth.’"
          style={inputStyle}
        />
      </Field>

      <Field label="Notes (freeform)">
        <textarea
          value={ch.notes}
          onChange={(e) => setCh({ ...ch, notes: e.target.value })}
          placeholder="Hooks, secrets, vibes, gear wishes, NPC ties..."
          style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
        />
      </Field>

      <div style={{ fontSize: 13, color: "#444", lineHeight: 1.5 }}>
        <strong>Why this step exists:</strong> it gives you a stable “identity core”
        before we start constraining you with race/faction/class rules. The campaign’s
        central question is basically: <em>what happens when your everyday social role
        gets forced into cosmic-scale consequences?</em> This is you defining that starting role.
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <div style={{ fontSize: 13, fontWeight: 650 }}>{label}</div>
      {children}
    </label>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #e5e5e5",
  fontSize: 14,
};