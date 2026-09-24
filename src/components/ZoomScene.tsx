import { useEffect, useRef, useState } from "react";
import LaptopScreen, { SITES } from "./LaptopScreen";
import RoomArt from "./RoomArt";
import TvScreen from "./TvScreen";

const LAPTOP = { x: 154, y: 372, w: 212, h: 132 };
const TV = { x: 572, y: 176, w: 456, h: 256.5 };

// Scroll timeline (0..1 across the pinned section). The zoom-out starts straight after the
// last laptop slide, and the TV switches on once the camera has settled on the full room.
const SLIDES_END = 0.18;
const ZOOM_START = 0.2;
const ZOOM_END = 0.7;
const TV_ON = 0.4;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const smooth = (t: number) => t * t * (3 - 2 * t);

export default function ZoomScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [size, setSize] = useState({ w: 1280, h: 800 });

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section || !sticky) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const span = rect.height - sticky.clientHeight;
      setP(span > 0 ? clamp01(-rect.top / span) : 0);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure); };
    const ro = new ResizeObserver(() => {
      setSize({ w: sticky.clientWidth, h: sticky.clientHeight });
      measure();
    });
    ro.observe(sticky);
    window.addEventListener("scroll", onScroll, { passive: true });
    measure();
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const { w, h } = size;
  const portrait = w / h < 1.05;
  const sideCaption = !portrait && (w >= 1000 || h < 560);
  const side = Math.min(380, w * 0.4);

  // Camera: start filling the view with the laptop screen, end on the whole room.
  const s0 = sideCaption
    ? Math.min(((w - side) * 0.92) / LAPTOP.w, (h * 0.8) / LAPTOP.h)
    : portrait
      ? Math.min((w * 0.92) / LAPTOP.w, (h * 0.55) / LAPTOP.h)
      : Math.min((w * 0.9) / LAPTOP.w, (h * 0.62) / LAPTOP.h);
  const s1 = portrait ? Math.min((w * 0.98) / 520, h / 860) : Math.max(w / 1600, h / 900);
  const a0 = sideCaption ? { x: side + (w - side) / 2, y: h / 2 + (h < 560 ? 18 : 0) } : { x: w / 2, y: portrait ? h * 0.6 : h * 0.58 };
  const a1 = { x: w / 2, y: h / 2 };
  const c0 = { x: LAPTOP.x + LAPTOP.w / 2, y: LAPTOP.y + LAPTOP.h / 2 };
  const c1 = portrait ? { x: 800, y: 520 } : { x: 800, y: h < 560 ? 410 : 470 };

  const z = easeInOut(clamp01((p - ZOOM_START) / (ZOOM_END - ZOOM_START)));
  const s = Math.exp(lerp(Math.log(s0), Math.log(s1), z));
  const k = Math.abs(1 / s1 - 1 / s0) < 1e-6 ? z : clamp01((1 / s - 1 / s0) / (1 / s1 - 1 / s0));
  const cx = lerp(c0.x, c1.x, k), cy = lerp(c0.y, c1.y, k);
  const ax = lerp(a0.x, a1.x, k), ay = lerp(a0.y, a1.y, k);
  const stageTransform = `translate3d(${ax - cx * s}px, ${ay - cy * s}px, 0) scale(${s})`;

  // Laptop slides: hold each site, then glide to the next.
  const t = clamp01(p / SLIDES_END) * (SITES.length - 1) * 1.0001;
  const i = 2

  const pos = i >= SITES.length - 1 ? SITES.length - 1 : i + smooth(clamp01((t - i - 0.5) / 0.5));
  const activeSite = Math.round(pos);

  const compact = w < 640;
  const inner = compact ? 440 : 1024;
  const tvOn = p >= TV_ON;

  const webCaption = 1 - clamp01((p - (ZOOM_START - 0.03)) / 0.06);
  const tvCaption = clamp01((p - (TV_ON + 0.02)) / 0.05);
  // "Keep scrolling" cue: visible throughout the pinned section, fading out as the user reaches its end.
  const scrollCue = 1 - clamp01((p - 0.95) / 0.05);

  return (
    <section className="journey" id="journey" ref={sectionRef} aria-label="Expertise">
      <div className="journey-sticky" ref={stickyRef}>
        <div className="stage" style={{ transform: stageTransform }}>
          <RoomArt on={tvOn} />
          <div className="stage-screen laptop-screen" style={{ left: LAPTOP.x, top: LAPTOP.y, width: LAPTOP.w, height: LAPTOP.h }}>
            <div style={{ width: inner, height: inner / (LAPTOP.w / LAPTOP.h), transform: `scale(${LAPTOP.w / inner})`, transformOrigin: "0 0" }}>
              <LaptopScreen  compact={compact} />
            </div>

          </div>

          <div className="stage-screen" style={{ left: TV.x, top: TV.y, width: TV.w, height: TV.h }}>
            <div style={{ width: 960, height: 540, transform: `scale(${TV.w / 960})`, transformOrigin: "0 0" }}>
              <TvScreen on={tvOn} />
            </div>
          </div>
        </div>

        <div className={`caption caption-web${sideCaption ? " is-side" : ""}`} style={{ opacity: webCaption, visibility: webCaption > 0.01 ? "visible" : "hidden", ...(sideCaption ? { width: side - 48 } : {}) }}>
          <h2>Web applications delivered for</h2>
          <ul className="site-list">
            {SITES.map((site, idx) => (
              <li key={site.key}  aria-current={idx === activeSite ? "true" : undefined}>
                {site.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="caption caption-tv" style={{ opacity: tvCaption, visibility: tvCaption > 0.01 ? "visible" : "hidden" }}>
          <h2>OTT applications for smart TV devices</h2>
          <p>Streaming experiences designed for the living room.</p>
        </div>

        <div className="scroll-cue journey-cue" aria-hidden="true" style={{ opacity: scrollCue, visibility: scrollCue > 0.01 ? "visible" : "hidden" }}>
          Keep scrolling
        </div>

        <div className="journey-progress" aria-hidden="true"><i style={{ transform: `scaleX(${p})` }} /></div>
        <p className="sr-only">
          I have built websites for e-commerce stores, event managers and employee management, and OTT apps for smart TV devices.
        </p>
      </div>
    </section>
  );
}
