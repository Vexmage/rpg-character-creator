export default function Roll20Preview({ text = "" }) {
  return (
    <div>
      <h3 style={{ margin: "0 0 8px 0" }}>Roll20 Handout</h3>
      <pre
        style={{
          whiteSpace: "pre-wrap",
          fontSize: 12,
          lineHeight: 1.4,
          padding: 10,
          borderRadius: 10,
          border: "1px solid #e5e5e5",
          background: "#fafafa",
          margin: 0,
        }}
      >
        {text}
      </pre>
    </div>
  );
}