export const C = {
    bg:     "#F5F1E8",
    panel:  "#EDE8DC",
    border: "#D6D0C4",
    text:   "#3D3D3D",
    muted:  "#6B6B6B",
    value:  "#E8C874",
    alt:    "#9CAA87",
    marker: "#C4956A",
    single: "#D6D0C4",
    accent: "#e3b94d",
  };
  
  export const TOTAL_DAYS = 15;
  
  export function combinedValue(A, kD, kE, E, daysRemaining) {
    const gD = 1 / (1 + kD * Math.max(daysRemaining, 0.001));
    const gE = 1 / (1 + kE * E);
    return A * gD * gE;
  }
  
  export const Slider = ({ label, sub, val, set, min, max, step, color }) => (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <div>
          <span style={{ fontSize: 11, fontFamily: "DM Mono, monospace", color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em" }}>{label}</span>
          {sub && <span style={{ fontSize: 10, color: C.muted, marginLeft: 6 }}>{sub}</span>}
        </div>
        <span style={{ fontFamily: "DM Mono, monospace", fontSize: 12, color: color ?? C.accent, fontWeight: 500 }}>{val}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={val}
        onChange={e => set(+e.target.value)}
        style={{ width: "100%", WebkitAppearance: "none", appearance: "none", height: 3,
                 background: C.border, borderRadius: 2, outline: "none", cursor: "pointer" }}
      />
    </div>
  );
  
  export const TooltipStyle = {
    background: "#EDE8DC",
    border: "1px solid #D6D0C4",
    borderRadius: 8,
    padding: "10px 14px",
    fontSize: 12,
    fontFamily: "DM Mono, monospace",
    color: "#3D3D3D",
  };