import type { ProjectIcon } from "../data";

const frame = { fill: "var(--art-frame)", stroke: "var(--art-edge)", strokeWidth: 1.5 };

function TvArt() {
  return (
    <svg viewBox="0 0 320 220" aria-hidden="true">
      <rect x={30} y={24} width={260} height={156} rx={8} {...frame} />
      <rect x={40} y={34} width={240} height={136} rx={3} fill="var(--art-screen-deep)" />
      <rect x={54} y={50} width={52} height={7} rx={2} fill="var(--accent-2)" />
      <rect x={54} y={64} width={130} height={12} rx={2} fill="#fff" opacity={0.9} />
      <rect x={54} y={82} width={96} height={7} rx={2} fill="#fff" opacity={0.4} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={54 + i * 56} y={112} width={46} height={42} rx={4}
          fill={i === 1 ? "var(--accent-2)" : "rgba(255,255,255,0.16)"}
          className={i === 1 ? "art-focus" : undefined} stroke={i === 1 ? "#fff" : "none"} strokeWidth={2} />
      ))}
      <rect x={140} y={180} width={40} height={12} fill="var(--art-frame)" stroke="var(--art-edge)" strokeWidth={1.5} />
      <rect x={110} y={192} width={100} height={6} rx={3} fill="var(--art-edge)" />
    </svg>
  );
}

function TeamArt() {
  return (
    <svg viewBox="0 0 320 220" aria-hidden="true">
      <rect x={118} y={20} width={176} height={180} rx={8} {...frame} />
      <rect x={134} y={34} width={80} height={9} rx={2} fill="var(--art-ink)" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={134} y={58 + i * 46} width={144} height={34} rx={4} fill="var(--art-panel)" />
          <rect x={146} y={67 + i * 46} width={70} height={7} rx={2} fill="var(--art-muted)" />
          <rect x={146} y={79 + i * 46} width={44} height={5} rx={2} fill="var(--art-muted)" opacity={0.6} />
          <rect x={238} y={68 + i * 46} width={30} height={14} rx={3} fill={i === 2 ? "var(--art-muted)" : "var(--accent)"} />
        </g>
      ))}
      {[0, 1, 2].map((i) => (
        <g key={`p${i}`}>
          <path d={`M70 ${75 + i * 46} H134`} stroke="var(--accent)" strokeWidth={1.5} strokeDasharray="3 5" className="art-flow" />
          <circle cx={50} cy={75 + i * 46} r={18} {...frame} />
          <circle cx={50} cy={70 + i * 46} r={6} fill="var(--art-muted)" />
          <path d={`M39 ${87 + i * 46} q11 -12 22 0`} fill="var(--art-muted)" />
        </g>
      ))}
    </svg>
  );
}

function FoodArt() {
  return (
    <svg viewBox="0 0 320 220" aria-hidden="true">
      <rect x={104} y={10} width={112} height={200} rx={18} {...frame} />
      <rect x={114} y={24} width={92} height={172} rx={8} fill="var(--art-screen)" />
      <path d="M114 110 L206 70 M140 24 L176 196 M114 150 L206 130" stroke="var(--art-panel)" strokeWidth={8} />
      <g className="art-pin">
        <path d="M160 114 C142 94 142 72 160 66 C178 72 178 94 160 114z" fill="var(--accent)" />
        <circle cx={160} cy={84} r={6} fill="#fff" />
      </g>
      <rect x={20} y={52} width={66} height={90} rx={6} {...frame} />
      <rect x={30} y={64} width={40} height={6} rx={2} fill="var(--art-ink)" />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={30} y={80 + i * 13} width={46 - (i % 2) * 12} height={5} rx={2} fill="var(--art-muted)" />)}
      <rect x={236} y={120} width={66} height={50} rx={6} {...frame} />
      <circle cx={269} cy={145} r={12} fill="var(--art-panel)" stroke="var(--art-edge)" strokeWidth={1.5} />
      <g fill="var(--accent-2)">
        {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={236 + i * 14} y={72} width={10} height={10} rx={2} opacity={i < 4 ? 1 : 0.35} />)}
      </g>
    </svg>
  );
}

export default function ProjectArt({ icon }: { icon: ProjectIcon }) {
  if (icon === "tv") return <TvArt />;
  if (icon === "team") return <TeamArt />;
  return <FoodArt />;
}
