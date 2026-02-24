// src/components/StepIdentity.jsx
import { useMemo } from "react";
import { RACES, getRace } from "../data/races";
import { FACTIONS, getFaction } from "../data/factions";

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

export default function StepIdentity({ ch, setCh }) {
  const race = useMemo(() => getRace(ch.raceId), [ch.raceId]);
  const faction = useMemo(() => getFaction(ch.factionId), [ch.factionId]);

  const groupedFactions = useMemo(() => {
    // Desktop-friendly grouping in the dropdown
    const church = [];
    const guilds = [];
    const nobles = [];
    const independent = [];

    for (const f of FACTIONS) {
      if (f.id.startsWith("church_")) church.push(f);
      else if (f.id.startsWith("guild_")) guilds.push(f);
      else if (f.id.startsWith("house_")) nobles.push(f);
      else independent.push(f);
    }

    return { church, guilds, nobles, independent };
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      {/* LEFT: Race */}
      <div style={{ display: "grid", gap: 12 }}>
        <Card title="Race">
          <label style={{ display: "grid", gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Choose a race</span>
            <select
              value={ch.raceId}
              onChange={(e) =>
                setCh((prev) => ({ ...prev, raceId: e.target.value }))
              }
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #ddd",
                fontSize: 14,
              }}
            >
              {RACES.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </label>

          <div style={{ marginTop: 10 }}>
            <div style={{ fontWeight: 700 }}>{race?.name ?? "—"}</div>
            <Muted>{race?.summary ?? "—"}</Muted>
          </div>

          {race?.appearance ? (
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Appearance</div>
              <Muted>{race.appearance}</Muted>
            </div>
          ) : null}

          {race?.social?.commonView ? (
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>How people see you</div>
              <Muted>{race.social.commonView}</Muted>
            </div>
          ) : null}

          {race?.tags?.length ? (
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Tags</div>
              <div style={{ marginTop: 6 }}>
                {race.tags.map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>
            </div>
          ) : null}
        </Card>

        <Card title="(Optional) Quick Flavor Prompt">
          <Muted>
            Pick one line that explains why you’re here when the Winter Mouth opens.
          </Muted>
          <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
            {[
              "I saw something climb out at dawn and nobody believed me.",
              "I’m here because the shrine bell rang in my dreams.",
              "I’m hunting a rumor about planetfall relics.",
              "I owe someone in Héshì my life (and a debt).",
            ].map((line) => (
              <button
                key={line}
                onClick={() =>
                  setCh((prev) => ({
                    ...prev,
                    notes: prev.notes ? `${prev.notes}\n\n${line}` : line,
                  }))
                }
                style={{
                  textAlign: "left",
                  padding: "10px 12px",
                  border: "1px solid #ddd",
                  borderRadius: 10,
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                {line}
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* RIGHT: Faction */}
      <div style={{ display: "grid", gap: 12 }}>
        <Card title="Faction">
          <label style={{ display: "grid", gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Choose a faction</span>
            <select
              value={ch.factionId}
              onChange={(e) =>
                setCh((prev) => ({ ...prev, factionId: e.target.value }))
              }
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #ddd",
                fontSize: 14,
              }}
            >
              <optgroup label="United Church of Tian">
                {groupedFactions.church.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.shortName ? f.shortName : f.name}
                  </option>
                ))}
              </optgroup>

              <optgroup label="The Five Guilds (Tech Mages)">
                {groupedFactions.guilds.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.shortName ? f.shortName : f.name}
                  </option>
                ))}
              </optgroup>

              <optgroup label="Noble Houses">
                {groupedFactions.nobles.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.shortName ? f.shortName : f.name}
                  </option>
                ))}
              </optgroup>

              <optgroup label="Independent / Local">
                {groupedFactions.independent.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.shortName ? f.shortName : f.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </label>

          <div style={{ marginTop: 10 }}>
            <div style={{ fontWeight: 700 }}>{faction?.name ?? "—"}</div>
            <Muted>{faction?.summary ?? "—"}</Muted>
          </div>

          {faction?.commonerView ? (
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>How commoners see you</div>
              <Muted>{faction.commonerView}</Muted>
            </div>
          ) : null}

          {faction?.authority?.legalityProfile ? (
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Authority</div>
              <Muted>{faction.authority.legalityProfile}</Muted>
            </div>
          ) : null}

          {faction?.authority?.techStance ? (
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Tech stance</div>
              <Muted>{faction.authority.techStance}</Muted>
            </div>
          ) : null}

          {faction?.tags?.length ? (
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Tags</div>
              <div style={{ marginTop: 6 }}>
                {faction.tags.map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>
            </div>
          ) : null}
        </Card>

        <Card title="Faction Hooks (Pick 1, optional)">
          <Muted>
            These are “why you’re involved” seeds. Clicking adds it to Notes.
          </Muted>
          <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
            {(faction?.startingHooks ?? []).length ? (
              faction.startingHooks.map((hook) => (
                <button
                  key={hook}
                  onClick={() =>
                    setCh((prev) => ({
                      ...prev,
                      notes: prev.notes ? `${prev.notes}\n\n${hook}` : hook,
                    }))
                  }
                  style={{
                    textAlign: "left",
                    padding: "10px 12px",
                    border: "1px solid #ddd",
                    borderRadius: 10,
                    background: "#fff",
                    cursor: "pointer",
                  }}
                >
                  {hook}
                </button>
              ))
            ) : (
              <Muted>—</Muted>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}