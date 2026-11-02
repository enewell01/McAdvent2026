import { motionOff } from "./festive";

interface Flake {
  x: number;
  y: number;
  depth: number; // 0 is far away, 2 is close to the viewer
  speed: number;
  sway: number;
}

const COLUMN = 4; // Width of one column of settled snow, in pixels
const MAX_DRIFT = 10;
const FLAKE_AREA = 12000; // Screen area per flake

// Snow falls in three depths on a slowly shifting wind, and close flakes settle
// on top of the element passed as `ledge`, the XP bar. Christmas Day snows harder.
export function startSnow(canvas: HTMLCanvasElement, ledge: HTMLElement | null, heavy: boolean): void {
  if (motionOff()) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let flakes: Flake[] = [];
  let ledgeLeft = 0;
  let ledgeTop = 0;
  let drift: number[] = [];
  let frameCount = 0;

  function spawn(y: number): Flake {
    const depth = Math.floor(Math.random() * 3);
    return {
      x: Math.random() * width,
      y,
      depth,
      speed: 0.35 + depth * 0.4 + Math.random() * 0.3,
      sway: Math.random() * 100,
    };
  }

  function resize() {
    width = canvas.width = innerWidth;
    height = canvas.height = innerHeight;
    const count = Math.round(((width * height) / FLAKE_AREA) * (heavy ? 2 : 1));
    flakes = Array.from({ length: count }, () => spawn(Math.random() * height));
    if (!ledge) return;
    const rect = ledge.getBoundingClientRect();
    ledgeLeft = rect.left;
    ledgeTop = rect.top;
    drift = new Array(Math.floor(rect.width / COLUMN)).fill(0);
  }

  // Settled snow slumps sideways, so it forms soft mounds and not single towers.
  function settle(column: number) {
    let spot = column;
    for (const side of [spot - 1, spot + 1]) {
      if (side >= 0 && side < drift.length && drift[side] < drift[spot] - 1) spot = side;
    }
    if (drift[spot] < MAX_DRIFT) drift[spot] += 2;
  }

  function tick() {
    frameCount++;
    const wind = Math.sin(frameCount / 500) * 0.7 + Math.sin(frameCount / 170) * 0.3;
    ctx!.clearRect(0, 0, width, height);

    for (const flake of flakes) {
      flake.y += flake.speed;
      flake.x += wind * (0.4 + flake.depth * 0.35) + Math.sin((flake.y + flake.sway) / 40) * 0.3;
      if (flake.x < -6) flake.x = width + 4;
      if (flake.x > width + 6) flake.x = -4;

      const column = Math.floor((flake.x - ledgeLeft) / COLUMN);
      const landed = flake.depth === 2 && column >= 0 && column < drift.length && flake.y >= ledgeTop - drift[column];
      if (landed) settle(column);
      if (landed || flake.y > height) {
        Object.assign(flake, spawn(-6));
        continue;
      }

      const x = Math.round(flake.x);
      const y = Math.round(flake.y);
      ctx!.fillStyle = `rgba(238,243,247,${0.35 + flake.depth * 0.25})`;
      if (flake.depth === 2) {
        ctx!.fillRect(x, y - 2, 2, 6);
        ctx!.fillRect(x - 2, y, 6, 2);
      } else {
        const size = flake.depth === 1 ? 3 : 2;
        ctx!.fillRect(x, y, size, size);
      }
    }

    // A slow thaw keeps the drift from ever filling up for good.
    if (frameCount % 90 === 0) {
      const column = Math.floor(Math.random() * drift.length);
      if (drift[column] > 0) drift[column] -= 2;
    }
    ctx!.fillStyle = "#f4f8fb";
    drift.forEach((snow, column) => {
      if (snow > 0) ctx!.fillRect(ledgeLeft + column * COLUMN, ledgeTop - snow, COLUMN, snow);
    });

    requestAnimationFrame(tick);
  }

  addEventListener("resize", resize);
  resize();
  tick();
}
