// All artwork is generated here at runtime: original block textures for the doors,
// rock layers for the page, and the night scene at the top.
import type { ChallengeType } from "./challenges";

type Random = () => number;
type Painter = (x: number, y: number, random: Random) => string;
export type Skin = ChallengeType | "locked";

function seeded(seed: number): Random {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pick = (random: Random, colors: string[]) => colors[Math.floor(random() * colors.length)];

function paintTile(painter: Painter, seed: number, width = 16, height = width): string {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const random = seeded(seed);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const color = painter(x, y, random);
      if (color === "") continue;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, 1, 1);
    }
  }
  return `url("${canvas.toDataURL()}")`;
}

const DIRT = ["#6b4529", "#7a5232", "#5d3b23", "#7a5232"];
const STONE = ["#74777d", "#686b71", "#7f8288", "#74777d"];

function snowCapped(seed: number): Painter {
  const random = seeded(seed);
  const depth = Array.from({ length: 16 }, () => 3 + Math.floor(random() * 3));
  return (x, y, r) => {
    if (y < depth[x]) return pick(r, ["#f4f8fb", "#e6eef4", "#f4f8fb"]);
    if (y === depth[x]) return "#b9cbdc";
    return pick(r, DIRT);
  };
}

const planks: Painter = (x, y, r) => {
  const row = Math.floor(y / 4);
  if (y % 4 === 3) return "#5b4021";
  if ((x + row * 5) % 8 === 7) return "#6a4c26";
  return pick(r, ["#9c7442", "#a67c48", "#8f6a3a", "#9c7442"]);
};

const stone: Painter = (x, y, r) => {
  const ore = (x - 11) ** 2 + (y - 4) ** 2 < 5 || (x - 4) ** 2 + (y - 11) ** 2 < 4;
  return ore && r() < 0.65 ? pick(r, ["#e0a84a", "#c98f35"]) : pick(r, STONE);
};

const ice: Painter = (x, y, r) => {
  const streak = (x + y) % 11;
  if (streak === 0 || streak === 1) return "#a9d6f2";
  return pick(r, ["#3f83ba", "#4a8fc6", "#3878ae"]);
};

const redstone: Painter = (x, y, r) => {
  const trace = y === 4 + (x >> 2) || x === 11 || y === 13;
  return trace ? pick(r, ["#f0443c", "#c8322e"]) : pick(r, ["#3a3234", "#332c2e", "#443a3c"]);
};

const nether: Painter = (x, y, r) => {
  const crack = (y + (x % 5 === 0 ? 1 : 0)) % 6 === 0;
  return crack ? "#2f0e12" : pick(r, ["#74262c", "#5a1d22", "#6a2329"]);
};

const gift: Painter = (x, y, r) => {
  if (x === 7 || x === 8 || y === 7 || y === 8) return x === 7 || y === 7 ? "#f2c14e" : "#d39f2f";
  return pick(r, ["#1f6b3a", "#278a49", "#1f6b3a"]);
};

const lockedRock: Painter = (x, y, r) =>
  (y + (x >> 3)) % 4 === 0 ? "#22252d" : pick(r, ["#2d3039", "#33363f", "#2a2d35"]);

const PAINTERS: Record<Exclude<Skin, "build">, Painter> = {
  survive: planks,
  explore: stone,
  ice,
  redstone,
  nether,
  festive: gift,
  locked: lockedRock,
};

const skinCache = new Map<string, string>();

// Three variations per skin, so neighbouring blocks of one type are not identical.
export function skinFor(skin: Skin, door = 0): string {
  const variant = skin === "locked" ? 0 : door % 3;
  const key = `${skin}${variant}`;
  let image = skinCache.get(key);
  if (!image) {
    const seed = 40 + variant * 97;
    image = paintTile(skin === "build" ? snowCapped(seed) : PAINTERS[skin], seed);
    skinCache.set(key, image);
  }
  return image;
}

const layer = (colors: string[]): Painter => (_x, _y, r) => pick(r, colors);

// A band of the upper rock that hangs over the top of the next layer down.
function jaggedEdge(colors: string[], seed: number): string {
  const random = seeded(seed);
  const depth = Array.from({ length: 32 }, () => 1 + Math.floor(random() * 5));
  for (let i = 1; i < 32; i += 2) depth[i] = depth[i - 1];
  return paintTile((x, y, r) => (y < depth[x] ? pick(r, colors) : ""), seed, 32, 6);
}

export function installRockLayers(root: HTMLElement): void {
  const dirt = ["#33241a", "#2d1f16", "#392919"];
  const rock = ["#2b2e36", "#262930", "#30333c"];
  const deep = ["#15171d", "#111318", "#191b22"];
  root.style.setProperty("--rock-dirt", paintTile(layer(dirt), 7, 32));
  root.style.setProperty("--rock-stone", paintTile(layer(rock), 8, 32));
  root.style.setProperty("--rock-deep", paintTile(layer(deep), 9, 32));
  root.style.setProperty("--edge-dirt", jaggedEdge(dirt, 11));
  root.style.setProperty("--edge-stone", jaggedEdge(rock, 12));
}

const SKY = ["#10163a", "#141c48", "#1a2558", "#213068", "#2b4078", "#355684", "#42708c"];

export function drawScene(canvas: HTMLCanvasElement): void {
  const rect = canvas.getBoundingClientRect();
  const W = (canvas.width = Math.ceil(rect.width / 4));
  const H = (canvas.height = Math.ceil(rect.height / 4));
  const ctx = canvas.getContext("2d");
  if (!ctx || W === 0 || H === 0) return;
  const random = seeded(2026);
  const fill = (color: string, x: number, y: number, w: number, h: number) => {
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x), Math.round(y), w, h);
  };

  // Sky in flat bands, with dithered edges
  const skyHeight = H * 0.85;
  const band = skyHeight / SKY.length;
  SKY.forEach((color, i) => fill(color, 0, i * band, W, band + 1));
  SKY.forEach((color, i) => {
    if (i === 0) return;
    const y = Math.round(i * band);
    for (let x = 0; x < W; x += 2) fill(color, x + (y % 4 === 0 ? 1 : 0), y - 1, 1, 1);
    for (let x = 1; x < W; x += 4) fill(color, x, y - 2, 1, 1);
  });

  for (let i = 0; i < (W * H) / 180; i++) {
    fill(random() < 0.2 ? "#ffffff" : "#8fa6d8", random() * W, random() * H * 0.6, 1, 1);
  }

  // Aurora: stepped columns that fade downward
  const ribbons = [
    { color: "63,224,160", base: 0.16, wave: 11, length: 34 },
    { color: "47,183,201", base: 0.26, wave: 7, length: 26 },
    { color: "179,92,214", base: 0.1, wave: 8, length: 14 },
  ];
  for (const ribbon of ribbons) {
    for (let x = 0; x < W; x += 2) {
      const curve = Math.sin(x / 31 + ribbon.base * 20) + 0.6 * Math.sin(x / 13 + ribbon.wave);
      const top = Math.round((H * ribbon.base + curve * ribbon.wave) / 2) * 2;
      const ragged = Math.round(ribbon.length * (0.6 + 0.4 * Math.sin(x / 5 + ribbon.wave)));
      [0.34, 0.2, 0.09].forEach((alpha, tier) => {
        ctx.fillStyle = `rgba(${ribbon.color},${alpha})`;
        ctx.fillRect(x, top + Math.round((tier * ragged) / 3), 2, Math.ceil(ragged / 3));
      });
    }
  }

  // A square moon, placed clear of the left-aligned title
  const moonSize = 18;
  const moonX = Math.round(W * 0.84);
  fill("rgba(226,234,255,.12)", moonX - 3, 9, moonSize + 6, moonSize + 6);
  fill("#e8edf8", moonX, 12, moonSize, moonSize);
  fill("#c6d0e6", moonX + 3, 15, 4, 4);
  fill("#c6d0e6", moonX + 11, 19, 3, 3);
  fill("#c6d0e6", moonX + 6, 24, 3, 2);

  // Terraced hills, stepping one block (4px here, 16px on screen) at a time
  function hills(ground: number, swing: number, wide: number, rock: string, cap: string, phase: number) {
    const tops: number[] = [];
    for (let x = 0; x < W; x += 4) {
      const curve = Math.sin(x / wide + phase) + 0.5 * Math.sin(x / (wide * 0.37) + phase * 2);
      const top = Math.round((H - ground - curve * swing) / 4) * 4;
      fill(rock, x, top, 4, H - top);
      fill(cap, x, top, 4, 3);
      tops.push(top);
    }
    return tops;
  }

  function spruce(x: number, ground: number, height: number) {
    fill("#3a2616", x - 1, ground - 3, 2, 3);
    for (let step = 0; step < height; step++) {
      const y = ground - 3 - step * 2;
      const half = 1 + Math.floor(((height - step) * 3) / height) * 2;
      fill(step % 2 ? "#17403a" : "#0f2f2d", x - half, y - 2, half * 2, 2);
      fill("#dfeaf3", x - half, y - 2, half, 1);
    }
  }

  hills(H * 0.3, 11, 46, "#26365f", "#a8bbdc", 1.3);
  const middle = hills(H * 0.2, 7, 30, "#1d2a4e", "#c8d6e8", 4.1);
  for (let i = 3; i < middle.length; i += 5) {
    if ((i * 7) % 3 !== 0) spruce(i * 4 + 2, middle[i], 4 + (i % 4));
  }
  const front = hills(H * 0.09, 4, 62, "#dbe6ee", "#f6fafc", 0.4);
  for (let x = 0; x < W; x += 3) fill("#b9cbdc", x, H - 2 - ((x * 5) % 3), 2, 1);

  // Cabin with a lit window
  const cabinColumn = Math.floor((W * 0.62) / 4);
  const floor = front[cabinColumn] ?? H;
  const cx = cabinColumn * 4;
  fill("#4a3220", cx, floor - 14, 24, 14);
  for (let y = floor - 12; y < floor; y += 3) fill("#3a2616", cx, y, 24, 1);
  fill("#7c7f84", cx + 18, floor - 25, 4, 10);
  fill("#f6fafc", cx + 18, floor - 26, 4, 1);
  for (let step = 0; step < 7; step++) {
    fill(step === 6 ? "#f6fafc" : "#dbe6ee", cx - 3 + step * 2, floor - 14 - step, 30 - step * 4, 1);
  }
  fill("rgba(255,207,92,.16)", cx + 2, floor - 13, 14, 10);
  fill("#ffcf5c", cx + 5, floor - 11, 8, 6);
  fill("#4a3220", cx + 8, floor - 11, 2, 6);
  fill("#2a1b10", cx + 16, floor - 8, 5, 8);
  spruce(cx - 12, floor, 8);
  spruce(cx + 40, front[cabinColumn + 10] ?? floor, 10);
  spruce(Math.round(W * 0.12), front[Math.floor((W * 0.12) / 4)] ?? floor, 11);
  spruce(Math.round(W * 0.2), front[Math.floor((W * 0.2) / 4)] ?? floor, 7);
}
