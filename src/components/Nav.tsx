import { useEffect, useState } from "react";
import { profile } from "../data";

type NavLink = { id: string; label: string; className?: string; cta?: boolean };

const LINKS: NavLink[] = [
  { id: "journey", label: "Expertise" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About", className: "nav-about" },
  { id: "contact", label: "Contact"},
];

// A section counts as current once its top passes this fraction of the viewport height.
const PROBE = 0.4;

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const probe = window.innerHeight * PROBE;
      // The last section can be shorter than the viewport, so treat the page bottom as reaching it.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= probe) current = id;
      }
      setActive(atBottom ? ids[ids.length - 1] : current);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure); };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  return active;
}

const IDS = LINKS.map((l) => l.id);

export default function Nav() {
  const active = useActiveSection(IDS);

  return (
    <header className="nav">
      <nav className="nav-bar" aria-label="Main">
        <a className="nav-logo" href="#top" aria-label={`${profile.name}, back to top`}>
          <span className="nav-mark" aria-hidden="true">{profile.initials}</span>
          <span className="nav-name">{profile.name}</span>
        </a>
        <ul>
          {LINKS.map((l) => {
            const isActive = active === l.id;
            const cls = [l.cta && "nav-cta", isActive && "is-active"].filter(Boolean).join(" ");
            return (
              <li key={l.id} className={l.className}>
                <a href={`#${l.id}`} className={cls || undefined} aria-current={isActive ? "location" : undefined}>
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
