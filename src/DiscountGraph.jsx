import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from "recharts";
import { C, TOTAL_DAYS, combinedValue, TooltipStyle } from "./shared.js";

function crossoverDay(data, alt) {
  for (const d of data) {
    if (d["V(t)"] >= alt) return d.day;
  }
  return null;
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={TooltipStyle}>
      <div style={{ marginBottom: 5, color: C.muted }}>Day {label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ color: p.color }}>
          {p.name}: <strong>{p.value}</strong>
        </div>
      ))}
    </div>
  );
};

export default function DiscountingGraph({ A, kD, kE, E, alt }) {
  const data = Array.from({ length: TOTAL_DAYS }, (_, i) => {
    const day = i + 1;
    const daysRemaining = TOTAL_DAYS - day;
    return {
      day,
      "V(t)": +combinedValue(A, kD, kE, E, daysRemaining).toFixed(2),
    };
  });

  const startDay = crossoverDay(data, alt);

  return (
    <div>
      {/* Formula strip */}
      <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 16px", marginBottom: 16, fontFamily: "DM Mono, monospace", fontSize: 12, color: C.muted, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <span style={{ color: C.marker, fontWeight: 600 }}>V(t)</span>
        <span>=</span>
        <span style={{ color: C.text }}>A</span>
        <span>×</span>
        <span>1 / (1 + <span style={{ color: C.value }}>k<sub>D</sub></span> · t)</span>
        <span>×</span>
        <span>1 / (1 + <span style={{ color: C.value }}>k<sub>E</sub></span> · E)</span>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 20, marginBottom: 10, paddingLeft: 44, flexWrap: "wrap" }}>
        {[["V(t) — combined value", C.value, "none"], ["Alternative", C.alt, "5 3"]].map(([name, color, dash]) => (
          <div key={name} style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <svg width="22" height="10">
              <line x1="0" y1="5" x2="22" y2="5" stroke={color} strokeWidth="2.5" strokeDasharray={dash} />
            </svg>
            <span style={{ fontSize: 11, color: C.muted, fontFamily: "DM Mono, monospace" }}>{name}</span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 16px 12px 0" }}>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={data} margin={{ top: 10, right: 24, bottom: 38, left: 8 }}>
            <CartesianGrid stroke={C.border} strokeDasharray="4 4" />
            <XAxis
              dataKey="day" stroke={C.border}
              tick={{ fill: C.muted, fontSize: 11, fontFamily: "DM Mono, monospace" }}
              ticks={[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]}
              label={{ value: "Days from now  →  deadline at day 15", fill: C.muted, fontSize: 11, fontFamily: "DM Mono, monospace", position: "insideBottom", offset: -26 }}
            />
            <YAxis stroke={C.border} tick={{ fill: C.muted, fontSize: 11, fontFamily: "DM Mono, monospace" }} domain={[0, 20]} width={36} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={alt} stroke={C.alt} strokeWidth={1.5} strokeDasharray="6 3"
              label={{ value: `alt = ${alt}`, position: "right", fill: C.alt, fontSize: 10, fontFamily: "DM Mono, monospace" }} />
            {startDay && (
              <ReferenceLine x={startDay} stroke={C.marker} strokeWidth={1.5} strokeDasharray="4 3"
                label={{ value: `start: day ${startDay}`, position: "insideTopRight", fill: C.marker, fontSize: 10, fontFamily: "DM Mono, monospace" }} />
            )}
            <Line type="monotone" dataKey="V(t)" stroke={C.value} strokeWidth={2.5}
              dot={{ r: 3.5, fill: C.value, strokeWidth: 0 }} activeDot={{ r: 5 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Summary */}
      <div style={{ marginTop: 10, background: C.panel, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 16px", fontFamily: "DM Mono, monospace", fontSize: 11, color: C.muted }}>
        {startDay
          ? <>Task beats alternative on <span style={{ color: C.marker, fontWeight: 600 }}>day {startDay}</span> — <span>{startDay <= 4 ? "starts early" : startDay <= 9 ? "moderate procrastination" : startDay <= 13 ? "severe procrastination" : "near-deadline panic"}</span></>
          : <span style={{ color: "#b97a7a" }}>V(t) never exceeds alternative — task won't be started voluntarily</span>
        }
      </div>
    </div>
  );
}