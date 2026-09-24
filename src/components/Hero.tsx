import { useMemo } from "react";
import { intro } from "../data";
import { useRotatingTyper, useTypewriter } from "../hooks/useTypewriter";
import Caret from "./Caret"
import HeroBackground from "./HeroBackground";
import CoderGirl from "./CoderGirl";

export default function Hero() {
  const segments = useMemo(() => [intro.greeting, intro.about], []);
  const { typed, active } = useTypewriter(segments, { speed: 18, startDelay: 450 });
  const headingDone = typed[0].length === segments[0].length;
  const platform = useRotatingTyper(intro.platforms, headingDone);

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <HeroBackground />

      <div className="hero-copy">
        <h1 id="hero-title" className="hero-title" aria-label={intro.greeting}>
          <span aria-hidden="true">
            {typed[0]}
            {active === 0 && <Caret />}
            <span className="ghost">{segments[0].slice(typed[0].length)}</span>
          </span>
        </h1>

        <p className={`hero-role${headingDone ? " is-in" : ""}`}>
          <span className="sr-only">Building software for web platforms, mobile apps, smart TV devices and Web TV.</span>
          <span aria-hidden="true">
            Building software for <span className="hero-platform">{platform}</span>
            <Caret hidden={!headingDone} />
          </span>
        </p>


        <div className={`hero-revealis-in"`}>
          <dl className="facts">
            {intro.facts.map((f) => (
              <div key={f.value}>
                <dt>{f.value}</dt>
                <dd>{f.label}</dd>
              </div>
            ))}
          </dl>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#journey">View my work</a>
            <a className="btn btn-ghost" href="#contact">Contact me</a>
          </div>
        </div>
      </div>

      <div className="hero-art">
           <CoderGirl />
      </div>

      <a className="scroll-cue" href="#journey" aria-label="Scroll to what I build">
        <span className="scroll-cue-line" aria-hidden="true" />
        Scroll
      </a>
    </section>
  );
}
