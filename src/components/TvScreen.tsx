import { useMemo } from "react";
import { useTypewriter } from "../hooks/useTypewriter";
import Caret from "./Caret";

const HEADLINE = "OTT applications for smart TV devices.";
const TILES = [
  { t: "Live", c: "tile-a" },
  { t: "Free", c: "tile-b" },
  { t: "Rent", c: "tile-c" },
  { t: "Premium", c: "tile-d" },
  { t: "Recommended", c: "tile-e" },
];

export default function TvScreen({ on }: { on: boolean }) {
  const segs = useMemo(() => [HEADLINE], []);
  const { typed, done } = useTypewriter(segs, { enabled: on, speed: 45, startDelay: 700 });
  return (
    <div className={`tv-screen${on ? " is-on" : ""}`}>
      <div className="tv-ui" aria-hidden={!on}>
        <div className="tv-top">
          <span className="tv-live"><i />Now streaming</span>
          <span className="tv-brand">Featured experience</span>
        </div>
        <p className="tv-headline">
          {typed[0]}
          {on && <Caret hidden={done} />}
        </p>
        <p className={`tv-sub${done ? " is-in" : ""}`}>
          Live streaming, AVOD, TVOD and SVOD, built for large screens and remote-first navigation.
        </p>
        <div className={`tv-row${done ? " is-in" : ""}`}>
          {TILES.map((tile) => (
            <div key={tile.t} className={`tv-tile ${tile.c}`}>
              <span>{tile.t}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="tv-glass" aria-hidden="true" />
    </div>
  );
}
