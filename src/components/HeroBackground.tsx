import { useEffect, useRef } from "react";

// Animated hero backdrop. The glows lean towards the pointer, a spotlight lights up the dot grid
// under it, and a tap/click sends out a ripple. Works for mouse hover and touch drags alike.
export default function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let idle = 0;
    let last: { x: number; y: number } | null = null;

    const apply = () => {
      raf = 0;
      if (!last) return;
      const r = el.getBoundingClientRect();
      const x = last.x - r.left;
      const y = last.y - r.top;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
      el.style.setProperty("--px", ((x / r.width) * 2 - 1).toFixed(3));
      el.style.setProperty("--py", ((y / r.height) * 2 - 1).toFixed(3));
    };

    const inside = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      return e.clientY >= r.top && e.clientY <= r.bottom;
    };

    const activate = (e: PointerEvent) => {
      last = { x: e.clientX, y: e.clientY };
      el.classList.add("is-active");
      window.clearTimeout(idle);
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const deactivate = (delay = 0) => {
      window.clearTimeout(idle);
      idle = window.setTimeout(() => el.classList.remove("is-active"), delay);
    };

    const onMove = (e: PointerEvent) => {
      if (inside(e)) activate(e);
      else if (e.pointerType === "mouse") deactivate();
    };

    const onDown = (e: PointerEvent) => {
      if (!inside(e)) return;
      activate(e);
      const r = el.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "hero-ripple";
      ripple.style.left = `${e.clientX - r.left}px`;
      ripple.style.top = `${e.clientY - r.top}px`;
      ripple.addEventListener("animationend", () => ripple.remove());
      el.appendChild(ripple);
    };

    // Touch has no hover, so let the spotlight linger briefly after the finger lifts.
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") deactivate(900);
    };
    const onLeave = () => deactivate();

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(idle);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className="hero-bg" aria-hidden="true">
      <span className="hero-glow hero-glow-1" />
      <span className="hero-glow hero-glow-2" />
      <span className="hero-glow hero-glow-3" />
      <span className="hero-dots" />
      <span className="hero-dots hero-dots-lit" />
      <span className="hero-spot" />
   
    </div>
  );
}
