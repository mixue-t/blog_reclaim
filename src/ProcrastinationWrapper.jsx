import { useState } from "react";
import DiscountingGraph from "./DiscountingGraph.js";
import MilestonesGraph  from "./MilestonesGraph.js";
import { C, Slider } from "./shared.js";

export default function ProcrastinationWrapper() {
  const [A,   setA]   = useState(10);
  const [kD,  setKD]  = useState(0.3);
  const [kE,  setKE]  = useState(1.8);
  const [E,   setE]   = useState(4);
  const [alt, setAlt] = useState(3.5);

  const shared = { A, kD, kE, E, alt };

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:14px; height:14px; border-radius:50%; background:#e3b94d; cursor:pointer; }
        input[type=range]::-moz-range-thumb { width:14px; height:14px; border-radius:50%; background:#e3b94d; cursor:pointer; border:none; }
      `}</style>

      {/* ── Shared controls ── */}
      <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px", marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontFamily: "DM Mono, monospace", color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>
          Parameters — shared across both graphs
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 28px", marginBottom: 16 }}>
          <Slider label="A"  sub="raw reward"       val={A}  set={setA}  min={2}    max={20}  step={1}    />
          <Slider label="E"  sub="effort cost"      val={E}  set={setE}  min={0.5}  max={10}  step={0.5}  />
          <Slider label="kD" sub="delay impatience" val={kD} set={setKD} min={0.05} max={2}   step={0.05} color={C.value} />
          <Slider label="kE" sub="effort aversion"  val={kE} set={setKE} min={0.05} max={4}   step={0.05} color={C.value} />
        </div>
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
          <Slider label="Alternative task value" sub="what you'd do instead" val={alt} set={setAlt} min={0} max={19} step={0.5} color={C.alt} />
        </div>
      </div>

      {/* ── Graph 1: Discounting ── */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4, color: C.text }}>Without milestones</div>
        <div style={{ fontSize: 13, color: C.muted, marginBottom: 16 }}>Subjective value of the task across the 15 days before the deadline.</div>
        <DiscountingGraph {...shared} />
      </div>

      {/* ── Graph 2: Milestones ── */}
      <div>
        <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4, color: C.text }}>With milestones</div>
        <div style={{ fontSize: 13, color: C.muted, marginBottom: 16 }}>Breaking the task into smaller deadlines resets t, keeping V(t) higher throughout.</div>
        <MilestonesGraph {...shared} />
      </div>
    </div>
  );
}