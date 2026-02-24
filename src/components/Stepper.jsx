export default function Stepper({ steps = [], active = 0, onSelect = () => {} }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {steps.map((label, i) => (
        <button
          key={label}
          onClick={() => onSelect(i)}
          style={{
            textAlign: "left",
            padding: "10px 10px",
            borderRadius: 10,
            border: "1px solid #e5e5e5",
            background: i === active ? "#f3f3f3" : "white",
            fontWeight: i === active ? 700 : 400,
            cursor: "pointer",
          }}
        >
          {i + 1}. {label}
        </button>
      ))}
    </div>
  );
}