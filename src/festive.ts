// Animated touches: the living hero scene and the bursts inside the door dialog.
import type { SceneAnchors } from "./pixels";
import { loadMotionChoice } from "./storage";

export const systemReducesMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

// Animations follow the device's reduced-motion setting unless the viewer has
// chosen to turn them on with the button in the hero.
export const motionOff = () => systemReducesMotion() && !loadMotionChoice();

const FRAME_MS = 125; // The hero steps at 8fps to stay in keeping with the pixel art.
const SLEIGH_EVERY = 280; // Frames between flights, about 35 seconds.
const FIRST_SLEIGH = 24;

interface Puff {
  x: number;
  y: number;
  age: number;
}

let anchors: SceneAnchors | null = null;
let draw: (() => void) | null = null;

export function updateSceneFx(canvas: HTMLCanvasElement, width: number, height: number, next: SceneAnchors): void {
  canvas.width = width;
  canvas.height = height;
  anchors = next;
  draw?.();
}

function drawSleigh(ctx: CanvasRenderingContext2D, x: number, y: number, tick: number) {
  const fill = (color: string, px: number, py: number, w: number, h: number) => {
    ctx.fillStyle = color;
    ctx.fillRect(x + px, y + py, w, h);
  };
  const gallop = tick % 2;

  fill("#c8322e", 0, 3, 13, 5);
  fill("#c8322e", 12, 1, 2, 4);
  fill("#f2c14e", 0, 8, 15, 1);
  fill("#f2c14e", 14, 6, 2, 2);
  fill("#7a5232", 0, 0, 4, 3);
  fill("#c8322e", 6, -1, 4, 4);
  fill("#eef3f7", 8, 0, 2, 2);
  fill("#eef3f7", 6, -2, 4, 1);
  fill("#c8322e", 7, -4, 2, 2);

  for (const [lead, deerX] of [[false, 21], [true, 33]] as const) {
    fill("#f2c14e", deerX - 5 - (lead ? 7 : 0), 3, lead ? 12 : 5, 1);
    fill("#7a5232", deerX, 2, 8, 3);
    fill("#7a5232", deerX + 7, 0, 2, 3);
    fill("#7a5232", deerX + 8, -1, 3, 2);
    fill("#d9c29a", deerX + 7, -3, 1, 2);
    fill("#d9c29a", deerX + 9, -3, 1, 2);
    fill(lead ? "#ff4b3e" : "#3a2616", deerX + 11, -1, 1, 1);
    fill("#5d3b23", deerX + (gallop ? 0 : 1), 5, 1, 2);
    fill("#5d3b23", deerX + (gallop ? 6 : 5), 5, 1, 2);
  }
}

export function startSceneFx(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let tick = 0;
  let sleighX: number | null = null;
  let nextSleigh = FIRST_SLEIGH;
  const smoke: Puff[] = [];
  let sparkles: Puff[] = [];

  draw = () => {
    if (!anchors) return;
    const { lights, stars, smoke: chimney, moon } = anchors;
    const still = motionOff();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach((star, i) => {
      if ((Math.floor(tick / 5) + i * 7) % 11 !== 0) return;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(star.x - 1, star.y, 3, 1);
      ctx.fillRect(star.x, star.y - 1, 1, 3);
    });

    lights.forEach((light, i) => {
      const lit = still || (Math.floor(tick / 6) + i) % 3 !== 0;
      ctx.fillStyle = lit ? light.color : "#22303a";
      ctx.fillRect(light.x, light.y, 1, 1);
      if (lit) {
        ctx.fillStyle = `${light.color}38`;
        ctx.fillRect(light.x - 1, light.y - 1, 3, 3);
      }
    });

    if (still) return;

    if (tick % 3 === 0) smoke.push({ x: chimney.x, y: chimney.y, age: 0 });
    for (let i = smoke.length - 1; i >= 0; i--) {
      const puff = smoke[i];
      puff.age++;
      if (puff.age > 40) {
        smoke.splice(i, 1);
        continue;
      }
      if (puff.age % 2 === 0) puff.y--;
      if (puff.age % 4 === 0) puff.x += 1;
      const size = 2 + Math.floor(puff.age / 16);
      ctx.fillStyle = `rgba(214,224,236,${0.5 * (1 - puff.age / 40)})`;
      ctx.fillRect(puff.x, puff.y, size, size);
    }

    if (sleighX === null && tick >= nextSleigh) sleighX = -48;
    if (sleighX !== null) {
      sleighX += 2;
      const y = moon.y + 7 + Math.round(Math.sin(sleighX / 28) * 6);
      if (tick % 2 === 0) sparkles.push({ x: sleighX - 1, y: y + 5, age: 0 });
      drawSleigh(ctx, sleighX, y, tick);
      if (sleighX > canvas.width + 48) {
        sleighX = null;
        nextSleigh = tick + SLEIGH_EVERY;
      }
    }
    sparkles = sparkles.filter((spark) => spark.age++ < 18);
    for (const spark of sparkles) {
      if ((spark.age + spark.x) % 3 === 0) continue;
      ctx.fillStyle = spark.age < 9 ? "#f2c14e" : "#eef3f7";
      ctx.fillRect(spark.x, spark.y + (spark.age >> 2), 1, 1);
    }
  };

  draw();
  if (motionOff()) return;

  let visible = true;
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  }).observe(canvas);

  setInterval(() => {
    if (!visible || document.hidden) return;
    tick++;
    draw?.();
  }, FRAME_MS);
}

const PALETTES = {
  snow: ["#ffffff", "#e6eef4", "#a9d6f2"],
  confetti: ["#c8322e", "#2fa05a", "#f2c14e", "#ffffff", "#5bb8ff"],
};

// Pixels drift down the dialog: a light dusting of snow when a door first opens,
// a burst of confetti from the bottom when a challenge is completed.
export function celebrate(canvas: HTMLCanvasElement, kind: keyof typeof PALETTES): void {
  const ctx = canvas.getContext("2d");
  if (!ctx || motionOff()) return;
  const width = (canvas.width = canvas.clientWidth);
  const height = (canvas.height = canvas.clientHeight);
  const colors = PALETTES[kind];
  const confetti = kind === "confetti";

  const bits = Array.from({ length: confetti ? 90 : 40 }, () => ({
    x: confetti ? width / 2 + (Math.random() - 0.5) * 80 : Math.random() * width,
    y: confetti ? height - 40 : -Math.random() * height * 0.7,
    vx: confetti ? (Math.random() - 0.5) * 9 : (Math.random() - 0.5) * 0.6,
    vy: confetti ? -6 - Math.random() * 9 : 1.4 + Math.random() * 1.4,
    size: Math.random() < 0.4 ? 6 : 4,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

  function frame() {
    ctx!.clearRect(0, 0, width, height);
    let alive = false;
    for (const bit of bits) {
      bit.x += bit.vx;
      bit.y += bit.vy;
      if (confetti) bit.vy += 0.32;
      if (bit.y > height) continue;
      alive = true;
      ctx!.fillStyle = bit.color;
      ctx!.fillRect(Math.round(bit.x), Math.round(bit.y), bit.size, bit.size);
    }
    if (alive) requestAnimationFrame(frame);
  }
  frame();
}
