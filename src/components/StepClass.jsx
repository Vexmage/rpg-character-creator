// src/components/StepClass.jsx
import { useMemo } from "react";
import { CLASSES, getClassDef, classAllowedByFactionTags } from "../data/classes";
import { getFaction } from "../data/factions";
import { getRace } from "../data/races";

function Card({ title, children }) {
  return (
    <div
      style={{
        border: "1px solid #e5e5e5",
        borderRadius: 10,
        padding: 12,
        background: "#fff",
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 8 }}>{title}</div>
      {children}
    </div>
  );
}

function Muted({ children }) {
  return <div style={{ opacity: 0.8, fontSize: 13 }}>{children}</div>;
}

function Pill({ children }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: 12,
        padding: "2px 8px",
        border: "1px solid #ddd",
        borderRadius: 999,
        marginRight: 6,
        marginBottom: 6,
        background: "#fafafa",
      }}
    >
      {children}
    </span>
  );
}

function ButtonRow({ children }) {
  return <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{children}</div>;
}

/**
 * Flip this if you want to HARD BLOCK picks
 * (right now we just warn, because early dev should be permissive)
 */
const ENFORCE_RESTRICTIONS = false;

export default function StepClass({ ch, setCh }) {
  const race = useMemo(() => getRace(ch.raceId), [ch.raceId]);
  const faction = useMemo(() => getFaction(ch.factionId), [ch.factionId]);
  const selected = useMemo(() => getClassDef(ch.classId), [ch.classId]);

  const factionTags = faction?.tags ?? [];

  const grouped = useMemo(() => {
    // group field already exists in your data
    const map = new Map();
    for (const c of CLASSES) {
      const key = c.group ?? "Other";
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(c);
    }
    // stable order feels nice
    const order = [
      "Theurges (Heaven + Spirits)",
      "Tech Mages",
      "Nobles / Wuxia Knights",
      "Wanderers",
      "Other",
    ];
    const out = [];
    for (const key of order) {
      if (map.has(key)) out.push([key, map.get(key)]);
    }
    // anything else not in order
    for (const [key, arr] of map.entries()) {
      if (!order.includes(key)) out.push([key, arr]);
    }
    return out;
  }, []);

  const allowedNow = useMemo(() => {
    if (!selected) return true;
    return classAllowedByFactionTags(selected.id, factionTags);
  }, [selected, factionTags]);

  function pickClass(classId) {
    const def = getClassDef(classId);
    if (!def) return;

    const ok = classAllowedByFactionTags(def.id, factionTags);

    if (ENFORCE_RESTRICTIONS && !ok) return;

    setCh((prev) => ({ ...prev, classId: def.id }));
  }

  const options = useMemo(() => {
    // flatten for dropdown
    return grouped.flatMap(([groupName, arr]) =>
      arr.map((c) => ({ groupName, id: c.id, label: `${c.name} — ${c.roleName}` }))
    );
  }, [grouped]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "420px 1fr", gap: 16 }}>
      {/* LEFT: chooser */}
      <div style={{ display: "grid", gap: 12 }}>
        <Card title="Class Selection">
          <Muted>
            You’re choosing the PF1 chassis, but the setting-facing role name and faction
            context are shown here.
          </Muted>

          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
              Quick pick (dropdown)
            </div>

            <select
              value={ch.classId}
              onChange={(e) => pickClass(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #ddd",
                fontSize: 14,
              }}
            >
              {grouped.map(([groupName, arr]) => (
                <optgroup key={groupName} label={groupName}>
                  {arr.map((c) => {
                    const ok = classAllowedByFactionTags(c.id, factionTags);
                    const disabled = ENFORCE_RESTRICTIONS && !ok;
                    const label = `${c.name} — ${c.roleName}${ok ? "" : " (mismatch)"}`;
                    return (
                      <option key={c.id} value={c.id} disabled={disabled}>
                        {label}
                      </option>
                    );
                  })}
                </optgroup>
              ))}
            </select>
          </div>
        </Card>

        <Card title="Browse by Group">
          <div style={{ display: "grid", gap: 12 }}>
            {grouped.map(([groupName, arr]) => (
              <div key={groupName}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>{groupName}</div>
                <ButtonRow>
                  {arr.map((c) => {
                    const ok = classAllowedByFactionTags(c.id, factionTags);
                    const isSelected = ch.classId === c.id;
                    const disabled = ENFORCE_RESTRICTIONS && !ok;

                    return (
                      <button
                        key={c.id}
                        onClick={() => pickClass(c.id)}
                        disabled={disabled}
                        style={{
                          textAlign: "left",
                          padding: "10px 12px",
                          borderRadius: 10,
                          border: "1px solid #ddd",
                          background: isSelected ? "#f2f7ff" : "#fff",
                          cursor: disabled ? "not-allowed" : "pointer",
                          opacity: disabled ? 0.5 : 1,
                          minWidth: 190,
                        }}
                        title={
                          ok
                            ? `${c.name} (${c.pf1Class})`
                            : "Faction tags don’t match this class’s allowedFactionTags."
                        }
                      >
                        <div style={{ fontWeight: 700 }}>{c.name}</div>
                        <div style={{ fontSize: 12, opacity: 0.85 }}>{c.roleName}</div>
                        <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
                          PF1: {c.pf1Class}
                        </div>
                      </button>
                    );
                  })}
                </ButtonRow>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* RIGHT: details */}
      <div style={{ display: "grid", gap: 12 }}>
        <Card title="Current Identity (for context)">
          <div style={{ fontSize: 14, lineHeight: 1.6 }}>
            <div>
              <strong>Race:</strong> {race?.name ?? "—"}
            </div>
            <div>
              <strong>Faction:</strong> {faction?.name ?? "—"}
            </div>
          </div>

          {factionTags.length ? (
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Faction Tags</div>
              <div style={{ marginTop: 6 }}>
                {factionTags.map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>
            </div>
          ) : null}
        </Card>

        <Card title="Selected Class Details">
          {!selected ? (
            <Muted>No class selected.</Muted>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 18 }}>{selected.name}</div>
                  <Muted>
                    <strong>{selected.roleName}</strong> • PF1 chassis: {selected.pf1Class}
                  </Muted>
                </div>
                <div style={{ textAlign: "right" }}>
                  <Muted>Group</Muted>
                  <div style={{ fontWeight: 700 }}>{selected.group}</div>
                </div>
              </div>

              <div style={{ marginTop: 10, fontSize: 14, lineHeight: 1.5 }}>
                {selected.summary}
              </div>

              {/* restriction warning */}
              {!allowedNow ? (
                <div
                  style={{
                    marginTop: 12,
                    padding: 10,
                    borderRadius: 10,
                    border: "1px solid #f2c9c9",
                    background: "#fff5f5",
                  }}
                >
                  <div style={{ fontWeight: 800, marginBottom: 4 }}>
                    ⚠ Faction mismatch
                  </div>
                  <Muted>
                    This class is intended for factions tagged:
                    <div style={{ marginTop: 6 }}>
                      {(selected.allowedFactionTags ?? []).map((t) => (
                        <Pill key={t}>{t}</Pill>
                      ))}
                    </div>
                    Your current faction tags are shown above. You can still use it (for
                    now) unless you enable enforcement.
                  </Muted>
                </div>
              ) : null}

              {selected.allowedFactionTags?.length ? (
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Allowed faction tags</div>
                  <div style={{ marginTop: 6 }}>
                    {selected.allowedFactionTags.map((t) => (
                      <Pill key={t}>{t}</Pill>
                    ))}
                  </div>
                </div>
              ) : null}

              {selected.suggestedRaceTags?.length ? (
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Suggested race tags</div>
                  <div style={{ marginTop: 6 }}>
                    {selected.suggestedRaceTags.map((t) => (
                      <Pill key={t}>{t}</Pill>
                    ))}
                  </div>
                </div>
              ) : null}

              {selected.hooks?.length ? (
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Hooks (click to add to Notes)</div>
                  <div style={{ display: "grid", gap: 8, marginTop: 8 }}>
                    {selected.hooks.map((h) => (
                      <button
                        key={h}
                        onClick={() =>
                          setCh((prev) => ({
                            ...prev,
                            notes: prev.notes ? `${prev.notes}\n\n${h}` : h,
                          }))
                        }
                        style={{
                          textAlign: "left",
                          padding: "10px 12px",
                          borderRadius: 10,
                          border: "1px solid #ddd",
                          background: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {selected.starterKitHints?.length ? (
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Starter kit hints</div>
                  <div style={{ marginTop: 6 }}>
                    {selected.starterKitHints.map((k) => (
                      <Pill key={k}>{k}</Pill>
                    ))}
                  </div>
                </div>
              ) : null}
            </>
          )}
        </Card>

        <Card title="Dev Note">
          <Muted>
            Next we can make this *smarter*:
            <ul style={{ margin: "8px 0 0 18px" }}>
              <li>filter class list based on faction tags (instead of warning)</li>
              <li>auto-suggest classes based on race tags</li>
              <li>show “Legality/License required” for Gunslinger + tech gear</li>
            </ul>
          </Muted>
        </Card>
      </div>
    </div>
  );
}