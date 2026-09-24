import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

// Calm backdrop: slow colour fields over a gradient, faint haze and a subtle grid.
const FRAG = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform float uScroll;
uniform vec3 uTop;
uniform vec3 uBottom;
uniform vec3 uCloud;
uniform vec3 uBlob;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = uv;
  p.x *= uRes.x / uRes.y;
  float t = uTime * 0.035;

  vec3 col = mix(uBottom, uTop, smoothstep(0.0, 1.0, uv.y));

  vec2 b1 = vec2(0.25 + 0.18 * sin(t * 2.1), 0.72 + 0.12 * cos(t * 1.7 + uScroll * 0.4));
  vec2 b2 = vec2(1.25 + 0.22 * cos(t * 1.4), 0.30 + 0.14 * sin(t * 2.3));
  vec2 b3 = vec2(0.85 + 0.30 * sin(t * 0.9 + 2.0), 0.95 + 0.10 * cos(t * 1.2));
  col = mix(col, uBlob, smoothstep(0.75, 0.0, length(p - b1)) * 0.35);
  col = mix(col, uBlob, smoothstep(0.80, 0.0, length(p - b2)) * 0.30);
  col = mix(col, uCloud, smoothstep(0.60, 0.0, length(p - b3)) * 0.20);

  vec2 q = p * 1.7 + vec2(t * 1.6, -uScroll * 0.25);
  float n = fbm(q + 0.8 * fbm(q + vec2(t, -t)));
  col = mix(col, uCloud, smoothstep(0.50, 0.90, n) * 0.22);

  // faint engineering grid that fades towards the bottom
  vec2 cell = abs(fract((gl_FragCoord.xy + vec2(0.0, uScroll * 40.0)) / 28.0) - 0.5);
  float grid = smoothstep(0.47, 0.5, max(cell.x, cell.y));
  col = mix(col, uBlob, grid * 0.18 * smoothstep(0.1, 0.9, uv.y));

  col += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) * 0.018;
  gl_FragColor = vec4(col, 1.0);
}
`;

function readColor(name: string): [number, number, number] {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const hex = raw.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(hex)) return [0.9, 0.95, 1];
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255) as [number, number, number];
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh) ?? "shader error");
  return sh;
}

export default function ShaderBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) {
      canvas.style.display = "none";
      return;
    }
    let program: WebGLProgram;
    try {
      program = gl.createProgram()!;
      gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
      gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error("link error");
    } catch {
      canvas.style.display = "none";
      return;
    }
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(program, n);
    const uRes = u("uRes"), uTime = u("uTime"), uScroll = u("uScroll");
    const uTop = u("uTop"), uBottom = u("uBottom"), uCloud = u("uCloud"), uBlob = u("uBlob");

    const setColors = () => {
      gl.uniform3fv(uTop, readColor("--gl-top"));
      gl.uniform3fv(uBottom, readColor("--gl-bottom"));
      gl.uniform3fv(uCloud, readColor("--gl-cloud"));
      gl.uniform3fv(uBlob, readColor("--gl-blob"));
    };
    setColors();

    // The sky is soft, so rendering at reduced resolution costs nothing visually.
    const RES = 0.5;
    const resize = () => {
      canvas.width = Math.max(1, Math.floor(window.innerWidth * RES));
      canvas.height = Math.max(1, Math.floor(window.innerHeight * RES));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();

    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const darkMq = window.matchMedia("(prefers-color-scheme: dark)");
    const start = performance.now();
    let raf = 0;

    const draw = () => {
      const time = reducedMq.matches ? 20 : (performance.now() - start) / 1000;
      gl.uniform1f(uTime, time);
      gl.uniform1f(uScroll, window.scrollY / window.innerHeight);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };
    const startLoop = () => {
      cancelAnimationFrame(raf);
      if (reducedMq.matches) draw();
      else raf = requestAnimationFrame(loop);
    };
    startLoop();

    const onResize = () => { resize(); draw(); };
    const onTheme = () => { setColors(); draw(); };
    const onVisibility = () => (document.hidden ? cancelAnimationFrame(raf) : startLoop());
    const onScroll = () => { if (reducedMq.matches) draw(); };

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    darkMq.addEventListener("change", onTheme);
    reducedMq.addEventListener("change", startLoop);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      darkMq.removeEventListener("change", onTheme);
      reducedMq.removeEventListener("change", startLoop);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="sky" aria-hidden="true" />;
}
