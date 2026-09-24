/** Hero illustration: one product delivered across a monitor, a TV and a phone. */
export default function DevicesIllustration() {
  const frame = { fill: "var(--art-frame)", stroke: "var(--art-edge)", strokeWidth: 1.5 };
  return (
    <svg className="devices" viewBox="0 0 520 440" role="img" aria-label="The same application running on a TV, a laptop and a phone">
      {/* connectors */}
      <g className="links" fill="none" stroke="var(--accent)" strokeWidth={1.5} strokeDasharray="4 6">
        <path d="M180 250 C 200 200, 240 190, 262 170" />
        <path d="M300 300 C 330 320, 350 320, 372 318" />
      </g>

      {/* TV */}
      <g className="float f1">
        <rect x={210} y={34} width={290} height={170} rx={10} {...frame} />
        <rect x={222} y={46} width={266} height={146} rx={4} fill="var(--art-screen-deep)" />
        <rect x={238} y={62} width={60} height={8} rx={2} fill="var(--accent-2)" />
        <rect x={238} y={80} width={150} height={14} rx={2} fill="#fff" opacity={0.92} />
        <rect x={238} y={100} width={110} height={8} rx={2} fill="#fff" opacity={0.45} />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={238 + i * 60} y={134} width={52} height={40} rx={4}
            fill={i === 1 ? "var(--accent-2)" : "rgba(255,255,255,0.18)"}
            stroke={i === 1 ? "#fff" : "none"} strokeWidth={2} />
        ))}
        <rect x={335} y={204} width={40} height={12} fill="var(--art-frame)" stroke="var(--art-edge)" strokeWidth={1.5} />
        <rect x={305} y={216} width={100} height={6} rx={3} fill="var(--art-edge)" />
      </g>

      {/* Laptop */}
      <g className="float f2">
        <rect x={30} y={196} width={260} height={166} rx={10} {...frame} />
        <rect x={42} y={208} width={236} height={142} rx={3} fill="var(--art-screen)" />
        <rect x={42} y={208} width={236} height={18} fill="var(--art-panel)" />
        <circle cx={52} cy={217} r={3} fill="var(--art-edge)" />
        <circle cx={62} cy={217} r={3} fill="var(--art-edge)" />
        <rect x={56} y={238} width={90} height={10} rx={2} fill="var(--art-ink)" />
        <rect x={56} y={254} width={140} height={6} rx={2} fill="var(--art-muted)" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={56 + i * 72} y={272} width={64} height={62} rx={4} fill="var(--art-panel)" />
        ))}
        <rect x={62} y={318} width={30} height={8} rx={2} fill="var(--accent)" />
        <path d="M14 362 H306 L318 380 H2z" fill="var(--art-frame)" stroke="var(--art-edge)" strokeWidth={1.5} strokeLinejoin="round" />
      </g>

      {/* Phone */}
      <g className="float f3">
        <rect x={372} y={236} width={110} height={196} rx={18} {...frame} />
        <rect x={382} y={250} width={90} height={168} rx={8} fill="var(--art-screen)" />
        <rect x={392} y={262} width={50} height={8} rx={2} fill="var(--art-ink)" />
        <rect x={392} y={278} width={70} height={46} rx={4} fill="var(--art-panel)" />
        <rect x={392} y={332} width={70} height={8} rx={2} fill="var(--art-muted)" />
        <rect x={392} y={346} width={50} height={8} rx={2} fill="var(--art-muted)" />
        <rect x={392} y={390} width={70} height={16} rx={4} fill="var(--accent)" />
      </g>
    </svg>
  );
}
