/** A modern living room in flat, muted tones (1600 x 900 stage units). Screens are HTML overlays. */
function Viewer({ x, hair, shirt, variant }: { x: number; hair: string; shirt: string; variant: "long" | "short" | "bun" }) {
  return (
    <g>
      <path d={`M${x - 66} 790 Q${x - 64} 700 ${x} 694 Q${x + 64} 700 ${x + 66} 790z`} fill={shirt} />
      {variant === "long" && <path d={`M${x - 40} 640 Q${x - 46} 712 ${x - 26} 730 H${x + 26} Q${x + 46} 712 ${x + 40} 640z`} fill={hair} />}
      {variant !== "long" && <rect x={x - 13} y={672} width={26} height={28} rx={8} fill="var(--skin)" />}
      <circle cx={x} cy={642} r={40} fill={hair} />
      {variant === "bun" && <circle cx={x} cy={594} r={16} fill={hair} />}
    </g>
  );
}

export default function RoomArt({ on }: { on: boolean }) {
  return (
    <svg className="room" viewBox="0 0 1600 900" width={1600} height={900} aria-hidden="true">
      <defs>
        <radialGradient id="tvGlow">
          <stop offset="0%" stopColor="var(--glow)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--glow)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="lampGlow">
          <stop offset="0%" stopColor="var(--lamp-light)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="var(--lamp-light)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lampBeam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--lamp-light)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--lamp-light)" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="lampPool">
          <stop offset="0%" stopColor="var(--lamp-light)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--lamp-light)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="floorShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--floor)" />
          <stop offset="100%" stopColor="var(--floor-2)" />
        </linearGradient>
        <clipPath id="windowClip"><rect x="1180" y="130" width="240" height="260" /></clipPath>
      </defs>

      {/* wall & floor, oversized so the frame never shows an edge */}
      <rect x={-2400} y={-2400} width={6400} height={3000} fill="var(--wall)" />
      <rect x={-2400} y={600} width={6400} height={3000} fill="url(#floorShade)" />
      <rect x={-2400} y={592} width={6400} height={10} fill="var(--base)" />

      {/* wall art: an abstract framed print */}
      <rect x={100} y={150} width={240} height={150} fill="var(--frame)" />
      <rect x={110} y={160} width={220} height={130} fill="var(--print-bg)" />
      <rect x={130} y={196} width={90} height={74} fill="var(--print-1)" />
      <circle cx={262} cy={214} r={32} fill="var(--print-2)" />
      <rect x={210} y={244} width={100} height={26} fill="var(--print-3)" />

      {/* window */}
      <rect x={1170} y={120} width={260} height={280} fill="var(--frame)" />
      <g clipPath="url(#windowClip)">
        <rect x={1180} y={130} width={240} height={260} fill="var(--sky)" />
        <g className="night-only">
          <circle cx={1370} cy={185} r={20} fill="var(--moon)" />
          {[[1220, 170], [1260, 230], [1320, 300], [1400, 262], [1236, 330]].map(([x, y]) => (
            <circle key={`${x}${y}`} cx={x} cy={y} r={1.8} fill="var(--moon)" />
          ))}
        </g>
        <rect x={1180} y={320} width={240} height={70} fill="var(--skyline)" />
        {[[1190, 280, 36], [1232, 250, 28], [1266, 296, 40], [1312, 236, 30], [1348, 270, 44], [1396, 300, 30]].map(([x, y, w]) => (
          <rect key={x} x={x} y={y} width={w} height={400 - y} fill="var(--skyline)" />
        ))}
      </g>
      <rect x={1297} y={130} width={6} height={260} fill="var(--frame)" />
      <rect x={1160} y={398} width={280} height={12} fill="var(--frame)" />
      <rect x={1120} y={100} width={360} height={6} rx={3} fill="var(--console-dark)" />
      <rect x={1134} y={106} width={40} height={330} fill="var(--curtain)" />
      <rect x={1426} y={106} width={40} height={330} fill="var(--curtain)" />

      {/* floor lamp, switched on: warm halo, a beam down to the floor and a lit shade */}
      <g className="lamp-on">
        <circle cx={1500} cy={300} r={190} fill="url(#lampGlow)" />
        <path d="M1458 324 H1542 L1640 704 H1360z" fill="url(#lampBeam)" />
        <ellipse cx={1500} cy={706} rx={150} ry={26} fill="url(#lampPool)" />
      </g>
      <rect x={1497} y={320} width={6} height={380} fill="var(--metal)" />
      <ellipse cx={1500} cy={702} rx={40} ry={8} fill="var(--metal)" />
      <path d="M1456 324 L1472 260 H1528 L1544 324z" fill="var(--lamp-light)" stroke="#e2b865" strokeWidth={1.5} strokeLinejoin="round" />
      <path d="M1456 324 L1472 260 H1480 L1466 324z" fill="var(--shade)" opacity={0.6} />
      <ellipse cx={1500} cy={324} rx={44} ry={5} fill="#fff8e6" />
      <circle cx={1500} cy={316} r={9} fill="#fffaf0" className="lamp-bulb" />

      {/* desk, laptop, accessories */}
      <rect x={86} y={538} width={12} height={194} fill="var(--metal)" />
      <rect x={442} y={538} width={12} height={194} fill="var(--metal)" />
      <rect x={60} y={520} width={420} height={18} rx={2} fill="var(--wood)" />
      <rect x={60} y={532} width={420} height={6} fill="var(--wood-dark)" />
      <rect x={146} y={364} width={228} height={148} rx={8} fill="var(--laptop)" />
      <rect x={154} y={372} width={212} height={132} rx={2} fill="#0f172a" />
      <path d="M126 512 H394 L406 526 H114z" fill="var(--laptop-base)" />
      <rect x={96} y={490} width={30} height={30} rx={3} fill="var(--mug)" />
      <path d="M126 498 q14 0 14 10 q0 10 -14 10" fill="none" stroke="var(--mug)" strokeWidth={4} />
      <rect x={410} y={480} width={40} height={40} rx={3} fill="var(--pot)" />
      <path d="M430 480 Q408 446 420 420 Q438 448 430 480z" fill="var(--leaf)" />
      <path d="M432 480 Q448 438 468 430 Q466 462 432 480z" fill="var(--leaf-2)" />

      {/* TV glow, console, TV */}
      <ellipse cx={800} cy={310} rx={420} ry={260} fill="url(#tvGlow)" className={`tv-glow${on ? " is-on" : ""}`} />
      <rect x={548} y={560} width={10} height={40} fill="var(--metal)" />
      <rect x={1042} y={560} width={10} height={40} fill="var(--metal)" />
      <rect x={520} y={474} width={560} height={90} rx={4} fill="var(--console)" />
      <rect x={520} y={474} width={560} height={6} fill="var(--console-dark)" />
      <line x1={707} y1={488} x2={707} y2={552} stroke="var(--console-dark)" strokeWidth={2} />
      <line x1={893} y1={488} x2={893} y2={552} stroke="var(--console-dark)" strokeWidth={2} />
      <rect x={1020} y={446} width={46} height={28} rx={2} fill="var(--book-1)" />
      <rect x={1026} y={434} width={36} height={12} rx={2} fill="var(--book-2)" />
      <rect x={560} y={164} width={480} height={280} rx={10} fill="var(--tv)" />
      <rect x={572} y={176} width={456} height={256.5} rx={2} fill="#0b1224" />
      <rect x={760} y={444} width={80} height={30} fill="var(--tv)" />
      <circle cx={1022} cy={438} r={2.5} fill={on ? "#22c55e" : "#94a3b8"} />

      {/* floor plant */}
      <path d="M1150 530 Q1100 470 1112 400 Q1152 452 1150 530z" fill="var(--leaf)" />
      <path d="M1150 530 Q1160 440 1210 404 Q1216 470 1150 530z" fill="var(--leaf-2)" />
      <path d="M1148 528 Q1130 470 1150 420 Q1170 470 1148 528z" fill="var(--leaf)" />
      <path d="M1112 526 H1188 L1178 616 H1122z" fill="var(--pot)" />

      {/* rug */}
      <rect x={220} y={720} width={1160} height={170} rx={6} fill="var(--rug)" />
      <rect x={250} y={740} width={1100} height={130} rx={4} fill="none" stroke="var(--rug-line)" strokeWidth={2} />

      {/* viewers */}
      <g className={`viewers${on ? " is-on" : ""}`}>
        <Viewer x={690} hair="var(--hair-1)" shirt="var(--shirt-1)" variant="long" />
        <Viewer x={810} hair="var(--hair-2)" shirt="var(--shirt-2)" variant="short" />
        <Viewer x={930} hair="var(--hair-3)" shirt="var(--shirt-3)" variant="bun" />
      </g>

      {/* sofa */}
      <rect x={540} y={700} width={520} height={240} rx={18} fill="var(--sofa)" />
      <rect x={540} y={700} width={520} height={14} rx={7} fill="var(--sofa-shine)" />
      <line x1={713} y1={730} x2={713} y2={920} stroke="var(--sofa-dark)" strokeWidth={2} />
      <line x1={887} y1={730} x2={887} y2={920} stroke="var(--sofa-dark)" strokeWidth={2} />
      <rect x={500} y={756} width={84} height={184} rx={14} fill="var(--sofa-dark)" />
      <rect x={1016} y={756} width={84} height={184} rx={14} fill="var(--sofa-dark)" />
    </svg>
  );
}
