import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface Options {
  speed?: number;
  startDelay?: number;
  enabled?: boolean;
}

/** Types a list of segments one after another, character by character. */
export function useTypewriter(segments: string[], { speed = 28, startDelay = 350, enabled = true }: Options = {}) {
  const reduced = useReducedMotion();
  const all = useMemo(() => segments.join(""), [segments]);
  const boundaries = useMemo(() => {
    const set = new Set<number>();
    let acc = 0;
    segments.forEach((s) => {
      acc += s.length;
      set.add(acc);
    });
    return set;
  }, [segments]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setCount(0);
      return;
    }
    if (reduced) {
      setCount(all.length);
      return;
    }
    setCount(0);
    let n = 0;
    let timer = 0;
    const tick = () => {
      n += 1;
      setCount(n);
      if (n >= all.length) return;
      const ch = all[n - 1];
      let delay = speed + Math.random() * speed * 0.7;
      if (boundaries.has(n)) delay = 650;
      else if (/[.!?]/.test(ch)) delay = speed * 9;
      else if (/[,;]/.test(ch)) delay = speed * 5;
      timer = window.setTimeout(tick, delay);
    };
    timer = window.setTimeout(tick, startDelay);
    return () => window.clearTimeout(timer);
  }, [enabled, reduced, all, boundaries, speed, startDelay]);

  let remaining = count;
  const typed = segments.map((s) => {
    const t = s.slice(0, Math.max(0, Math.min(s.length, remaining)));
    remaining -= s.length;
    return t;
  });
  const active = typed.findIndex((t, i) => t.length < segments[i].length);
  return { typed, done: count >= all.length, active: active === -1 ? segments.length - 1 : active };
}

/** Types a word, pauses, erases it, and moves to the next one. */
export function useRotatingTyper(words: string[], enabled: boolean) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    if (reduced) {
      setText(words[index]);
      const t = window.setTimeout(() => setIndex((i) => (i + 1) % words.length), 2600);
      return () => window.clearTimeout(t);
    }
    const word = words[index];
    let delay = deleting ? 45 : 85;
    if (!deleting && text === word) delay = 1700;
    if (deleting && text === "") delay = 300;
    const t = window.setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, delay);
    return () => window.clearTimeout(t);
  }, [enabled, reduced, words, index, text, deleting]);

  return text;
}
