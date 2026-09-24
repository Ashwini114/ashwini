import { useEffect, useId, useRef } from "react";

const EYES = [
  { cx: 178, cy: 174 },
  { cx: 222, cy: 174 },
];
const FACE = { x: 200, y: 180 };
const MAX = { x: 5, y: 4 };
const IDLE_MS = 2500;

/**
 * Anime-style South Indian girl coding on a laptop: open hair with jasmine, bindi and jhumkas.
 * Her eyes (and slightly her head) follow the mouse or finger; when idle she looks back at her code.
 */
export default function CoderGirl() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pupils = useRef<(SVGGElement | null)[]>([]);
  const head = useRef<SVGGElement>(null);
  const uid = useId().replace(/:/g, "");

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    let raf = 0;
    let idle = 0;
    let target = { x: 0, y: 0.8 };
    const cur = { x: 0, y: 0.8 };

    const render = () => {
      cur.x += (target.x - cur.x) * 0.18;
      cur.y += (target.y - cur.y) * 0.18;
      const dx = cur.x * MAX.x;
      const dy = cur.y * MAX.y;
      pupils.current.forEach((p) => p?.setAttribute("transform", `translate(${dx.toFixed(2)} ${dy.toFixed(2)})`));
      head.current?.setAttribute("transform", `rotate(${(cur.x * 4).toFixed(2)} 200 240) translate(${(cur.x * 2).toFixed(2)} ${(cur.y * 1.5).toFixed(2)})`);
      raf = Math.abs(target.x - cur.x) + Math.abs(target.y - cur.y) > 0.002 ? requestAnimationFrame(render) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(render); };

    const lookAtCode = () => { target = { x: 0, y: 0.8 }; kick(); };

    const onPointer = (e: PointerEvent) => {
      // The drawing is letterboxed inside the svg box, so map the face through the screen matrix.
      const ctm = svg.getScreenCTM();
      if (!ctm) return;
      const face = new DOMPoint(FACE.x, FACE.y).matrixTransform(ctm);
      const vx = e.clientX - face.x;
      const vy = e.clientY - face.y;
      const dist = Math.hypot(vx, vy) || 1;
      const reach = Math.min(1, dist / 260);
      target = { x: (vx / dist) * reach, y: (vy / dist) * reach };
      kick();
      window.clearTimeout(idle);
      idle = window.setTimeout(lookAtCode, IDLE_MS);
    };

    render();
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerdown", onPointer, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(idle);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  const skin = "#b9825f";
  const skinShade = "#9c6a4b";
  const hair = "#1b1418";
  const hairShine = "#3a2c36";

  return (
    <svg ref={svgRef} className="coder-girl" viewBox="12 60 384 352" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <defs>
        {EYES.map((e, i) => (
          <clipPath key={i} id={`${uid}-eye${i}`}>
            <ellipse cx={e.cx} cy={e.cy} rx={13} ry={15} />
          </clipPath>
        ))}
        <radialGradient id={`${uid}-screen`} cx="0.5" cy="1" r="0.8">
          <stop offset="0" stopColor="var(--glow)" stopOpacity={0.45} />
          <stop offset="1" stopColor="var(--glow)" stopOpacity={0} />
        </radialGradient>
      </defs>

      {/* floating code bubble */}
      <g className="cg-bubble">
        <rect x={276} y={70} width={112} height={78} rx={12} fill="var(--art-screen-deep)" />
        <path d="M296 148 L288 162 L308 148z" fill="var(--art-screen-deep)" />
        <text x={290} y={94} fill="var(--accent-2)" fontFamily="ui-monospace, Menlo, monospace" fontSize={15} fontWeight={700}>{"</>"}</text>
        <rect className="cg-line cg-l1" x={290} y={104} width={70} height={6} rx={3} fill="#fff" opacity={0.85} />
        <rect className="cg-line cg-l2" x={300} y={116} width={52} height={6} rx={3} fill="var(--accent-2)" />
        <rect className="cg-line cg-l3" x={300} y={128} width={78} height={6} rx={3} fill="#fff" opacity={0.5} />
      </g>

      <g className="cg-body">
        {/* hair behind */}
        <path d="M140 150 Q126 74 200 70 Q274 74 262 150 Q268 232 284 334 Q242 346 200 338 Q158 346 116 334 Q132 232 140 150Z" fill={hair} />

        {/* body in kurta */}
        <rect x={188} y={222} width={24} height={40} fill={skinShade} />
        <path d="M108 400 Q112 276 200 256 Q288 276 292 400Z" fill="var(--accent)" />
        <path d="M184 258 L200 290 L216 258" fill="none" stroke="#d9a441" strokeWidth={3} strokeLinejoin="round" />
        <path d="M184 258 L200 290 L216 258z" fill={skinShade} />

        <g ref={head}>
          {/* open hair: locks falling over both shoulders */}
          <path d="M152 128 Q134 190 140 252 Q136 304 124 346 Q148 336 158 300 Q164 256 162 206 Q162 164 160 134Z" fill={hair} />
          <path d="M248 128 Q266 190 260 252 Q264 304 276 346 Q252 336 242 300 Q236 256 238 206 Q238 164 240 134Z" fill={hair} />
          <path d="M146 236 Q144 290 134 330" fill="none" stroke={hairShine} strokeWidth={3} strokeLinecap="round" />
          <path d="M254 236 Q256 290 266 330" fill="none" stroke={hairShine} strokeWidth={3} strokeLinecap="round" />

          {/* round face */}
          <ellipse cx={200} cy={166} rx={54} ry={56} fill={skin} />
          <ellipse cx={167} cy={198} rx={9} ry={5} fill="#e0707a" opacity={0.35} />
          <ellipse cx={233} cy={198} rx={9} ry={5} fill="#e0707a" opacity={0.35} />

          {/* eyes */}
          {EYES.map((e, i) => (
            <g key={i} className="cg-eye" style={{ transformOrigin: `${e.cx}px ${e.cy}px` }}>
              <ellipse cx={e.cx} cy={e.cy} rx={13} ry={15} fill="#fff" />
              <g clipPath={`url(#${uid}-eye${i})`}>
                <g ref={(el) => { pupils.current[i] = el; }}>
                  <ellipse cx={e.cx} cy={e.cy + 1} rx={9.5} ry={11.5} fill="#4a2a1a" />
                  <ellipse cx={e.cx} cy={e.cy + 3} rx={7} ry={8} fill="#6b3d22" />
                  <ellipse cx={e.cx} cy={e.cy + 1} rx={4.5} ry={5.5} fill="#120a08" />
                  <circle cx={e.cx - 3.5} cy={e.cy - 4} r={3.2} fill="#fff" />
                  <circle cx={e.cx + 3.5} cy={e.cy + 5} r={1.5} fill="#fff" opacity={0.8} />
                </g>
              </g>
              <path d={`M${e.cx - 15} ${e.cy - 8} Q${e.cx} ${e.cy - 20} ${e.cx + 15} ${e.cy - 7}`} fill="none" stroke={hair} strokeWidth={3.6} strokeLinecap="round" />
              <path d={i === 0 ? `M${e.cx - 15} ${e.cy - 8} l-4 -3` : `M${e.cx + 15} ${e.cy - 7} l4 -3`} stroke={hair} strokeWidth={2.4} strokeLinecap="round" />
            </g>
          ))}

          {/* brows, bindi, nose, smile */}
          <path d="M166 150 Q176 145 188 149" fill="none" stroke={hair} strokeWidth={2.2} strokeLinecap="round" />
          <path d="M212 149 Q224 145 234 150" fill="none" stroke={hair} strokeWidth={2.2} strokeLinecap="round" />
          <circle cx={200} cy={153} r={2.8} fill="#a3122a" />
          <path d="M200 191 l-2 5 h3" fill="none" stroke={skinShade} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M192 208 Q200 214 208 208" fill="none" stroke="#7a3b30" strokeWidth={2} strokeLinecap="round" />

          {/* jhumka earrings */}
          {[151, 249].map((x) => (
            <g key={x} className="cg-jhumka" style={{ transformOrigin: `${x}px 188px` }}>
              <circle cx={x} cy={190} r={3} fill="#d9a441" />
              <path d={`M${x - 6} 204 Q${x} 192 ${x + 6} 204z`} fill="#d9a441" />
              <circle cx={x} cy={207} r={1.6} fill="#d9a441" />
            </g>
          ))}

          {/* bangs */}
          <path
            d="M146 162 Q144 94 200 90 Q256 94 254 162 Q246 132 228 120 Q224 138 206 144 Q210 126 198 116 Q186 136 168 140 Q172 126 170 120 Q154 136 146 162Z"
            fill={hair}
          />
          <path d="M176 104 Q196 96 218 102" fill="none" stroke={hairShine} strokeWidth={4} strokeLinecap="round" />
          {/* a few jasmine flowers tucked above the ear */}
          {[[154, 108], [147, 117], [143, 128]].map(([x, y]) => (
            <circle key={y} cx={x} cy={y} r={4} fill="#fffdf5" stroke="#e8e2c8" strokeWidth={0.8} />
          ))}
        </g>

        {/* screen light on her */}
        <path d="M108 400 Q112 276 200 256 Q288 276 292 400Z" fill={`url(#${uid}-screen)`} />
      </g>

      {/* laptop (seen from behind) and desk */}
      <path d="M116 300 H284 L290 392 H110Z" fill="var(--art-frame)" stroke="var(--art-edge)" strokeWidth={1.5} strokeLinejoin="round" />
      <circle cx={200} cy={346} r={9} fill="var(--accent)" opacity={0.85} />
      <rect x={20} y={392} width={360} height={14} rx={4} fill="var(--wood)" />
    </svg>
  );
}
