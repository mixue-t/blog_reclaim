import { useState } from "react";
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from "recharts";
import { C, TOTAL_DAYS, combinedValue, TooltipStyle } from "./shared.js";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={TooltipStyle}>
      <div style={{ marginBottom: 5, color: C.muted }}>Day {label}</div>
      {payload.map(p => p.value !== null && (
        <div key={p.name} style={{ color: p.color, marginBottom: 2 }}>
          {p.name}: <strong>{(+p.value).toFixed(2)}</strong>
        </div>
      ))}
    </div>
  );
};

export default function MilestonesGraph({ A, kD, kE, E, alt }) {
  const [n, setN] = useState(3);

  const milestoneInterval = TOTAL_DAYS / n;
  const milestoneKey = `${n} milestone${n > 1 ? "s" : ""}`;

  const data = Array.from({ length: TOTAL_DAYS }, (_, i) => {
    const day = i + 1;

    // Single deadline
    const vSingle = combinedValue(A, kD, kE, E, TOTAL_DAYS - day);

    // Milestone: days remaining to next milestone
    const nextMilestone = Math.ceil(day / milestoneInterval) * milestoneInterval;
    const tMilestone = Math.max(nextMilestone - day, 0);
    const vMilestone = combinedValue(A, kD, kE, E, tMilestone);

    return {
      day,
      "No milestones": +vSingle.toFixed(2),
      [milestoneKey]:  +vMilestone.toFixed(2),
    };
  });

  const milestoneDays = Array.from({ length: n }, (_, i) => Math.round((i + 1) * milestoneInterval));
  const daysAboveAlt  = data.filter(d => d[milestoneKey]      >= alt).length;
  const singleAbove   = data.filter(d => d["No milestones"]   >= alt).length;

  return (
    <div>
      {/* Milestone count control */}
      <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px", marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 2 }}>Number of milestones</div>
            <div style={{ fontSize: 11, color: C.muted, fontFamily: "DM Mono, monospace" }}>
              1 every {milestoneInterval % 1 === 0 ? milestoneInterval : milestoneInterval.toFixed(1)} days
            </div>
          </div>
          <div style={{ fontFamily: "DM Mono, monospace", fontSize: 28, fontWeight: 700, color: C.accent }}>{n}</div>
        </div>
        <input
          type="range" min={1} max={15} step={1} value={n}
          onChange={e => setN(+e.target.value)}
          style={{ width: "100%", WebkitAppearance: "none", appearance: "none", height: 3,
                   background: C.border, borderRadius: 2, outline: "none", cursor: "pointer" }}
        />
        <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
          {milestoneDays.map(d => (
            <span key={d} style={{ fontFamily: "DM Mono, monospace", fontSize: 10, background: `${C.marker}33`, border: `1px solid ${C.marker}66`, borderRadius: 4, padding: "2px 8px", color: C.marker }}>
              day {d}
            </span>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 20, marginBottom: 10, paddingLeft: 44, flexWrap: "wrap" }}>
        {[["No milestones", C.single, "6 3"], [milestoneKey, C.value, "none"], ["Alternative", C.alt, "5 3"]].map(([name, color, dash]) => (
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
          <ComposedChart data={data} margin={{ top: 10, right: 28, bottom: 38, left: 8 }}>
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
            {milestoneDays.slice(0, -1).map(d => (
              <ReferenceLine key={d} x={d} stroke={`${C.marker}55`} strokeWidth={1} strokeDasharray="3 3" />
            ))}
            <Line type="monotone" dataKey="No milestones" stroke={C.single} strokeWidth={2} strokeDasharray="6 3" dot={false} activeDot={{ r: 4 }} />
            <Line type="monotone" dataKey={milestoneKey}  stroke={C.value}  strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Summary */}
      <div style={{ marginTop: 10, background: C.panel, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 16px", fontFamily: "DM Mono, monospace", fontSize: 11, color: C.muted, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div>
          <div style={{ color: C.single, marginBottom: 3 }}>no milestones</div>
          beats alternative on <strong style={{ color: C.text }}>{singleAbove} / 15</strong> days
        </div>
        <div>
          <div style={{ color: C.value, marginBottom: 3 }}>{milestoneKey}</div>
          beats alternative on <strong style={{ color: C.text }}>{daysAboveAlt} / 15</strong> days
        </div>
      </div>
    </div>
  );
}