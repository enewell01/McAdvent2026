// Draws the app icons and the social preview image. Run with `npm run images`.
// Output is committed, so this only needs running when the artwork changes.
import { mkdirSync, writeFileSync } from "node:fs";
import { crc32, deflateSync } from "node:zlib";

class Picture {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.pixels = Buffer.alloc(width * height * 3);
    this.rect(0, 0, width, height, color);
  }

  rect(x, y, w, h, [r, g, b]) {
    const left = Math.max(0, Math.round(x));
    const top = Math.max(0, Math.round(y));
    const right = Math.min(this.width, Math.round(x + w));
    const bottom = Math.min(this.height, Math.round(y + h));
    for (let py = top; py < bottom; py++) {
      for (let px = left; px < right; px++) {
        const at = (py * this.width + px) * 3;
        this.pixels[at] = r;
        this.pixels[at + 1] = g;
        this.pixels[at + 2] = b;
      }
    }
  }

  save(path) {
    const chunk = (type, data) => {
      const length = Buffer.alloc(4);
      length.writeUInt32BE(data.length);
      const body = Buffer.concat([Buffer.from(type), data]);
      const crc = Buffer.alloc(4);
      crc.writeUInt32BE(crc32(body));
      return Buffer.concat([length, body, crc]);
    };
    const header = Buffer.alloc(13);
    header.writeUInt32BE(this.width, 0);
    header.writeUInt32BE(this.height, 4);
    header[8] = 8; // bit depth
    header[9] = 2; // RGB
    const stride = this.width * 3;
    const rows = Buffer.alloc((stride + 1) * this.height);
    for (let y = 0; y < this.height; y++) {
      this.pixels.copy(rows, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
    }
    writeFileSync(path, Buffer.concat([
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
      chunk("IHDR", header),
      chunk("IDAT", deflateSync(rows, { level: 9 })),
      chunk("IEND", Buffer.alloc(0)),
    ]));
  }
}

const color = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const NIGHT = color("#10163a");
const SNOW = color("#eef3f7");
const ICE = color("#8fc7ee");
const GOLD = color("#f2c14e");
const HOLLY = color("#c8322e");
const INK = color("#0a0d12");

function snowflake(picture, cx, cy, scale) {
  const dot = (dx, dy, tint) => picture.rect(cx + (dx - 0.5) * scale, cy + (dy - 0.5) * scale, scale, scale, tint);
  const mirrored = (dx, dy, tint) => {
    for (const [a, b] of [[dx, dy], [dy, dx]]) {
      for (const sx of [-1, 1]) for (const sy of [-1, 1]) dot(a * sx, b * sy, tint);
    }
  };
  for (let t = 1; t <= 8; t++) mirrored(0, t, SNOW);
  for (let t = 1; t <= 5; t++) mirrored(t, t, ICE);
  for (let t = 1; t <= 2; t++) mirrored(t, 8 - t, SNOW);
  dot(0, 0, GOLD);
}

function icon(size) {
  const picture = new Picture(size, size, NIGHT);
  const edge = Math.round(size / 32);
  picture.rect(0, size - edge * 3, size, edge * 3, ICE);
  snowflake(picture, size / 2, size / 2 - edge, Math.floor((size * 0.75) / 17));
  picture.save(`public/icons/icon-${size}.png`);
}

const GLYPHS = {
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
  C: ["01111", "10000", "10000", "10000", "10000", "10000", "01111"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  N: ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  V: ["10001", "10001", "10001", "10001", "10001", "01010", "00100"],
  Y: ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
  0: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  2: ["01110", "10001", "00001", "00110", "01000", "10000", "11111"],
  6: ["00110", "01000", "10000", "11110", "10001", "10001", "01110"],
};

function text(picture, line, x, y, scale, tint) {
  [...line].forEach((letter, index) => {
    (GLYPHS[letter] ?? []).forEach((row, gy) => {
      [...row].forEach((bit, gx) => {
        if (bit === "1") picture.rect(x + (index * 6 + gx) * scale, y + gy * scale, scale, scale, tint);
      });
    });
  });
}

function preview() {
  const W = 1200;
  const H = 630;
  const block = 30;
  const picture = new Picture(W, H, NIGHT);

  ["#10163a", "#141c48", "#1a2558", "#213068", "#2b4078", "#355684"].forEach((hex, i) => {
    picture.rect(0, i * 105, W, 105, color(hex));
  });

  let seed = 2026;
  const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 150; i++) {
    const size = random() < 0.25 ? 6 : 3;
    picture.rect(random() * W, random() * 430, size, size, random() < 0.3 ? SNOW : color("#8fa6d8"));
  }

  picture.rect(990, 60, 120, 120, color("#e8edf8"));
  picture.rect(1010, 80, 28, 28, color("#c6d0e6"));
  picture.rect(1064, 124, 20, 20, color("#c6d0e6"));

  // Snowy ground in terraces, with dirt beneath
  const steps = [4, 4, 3, 3, 2, 2, 2, 3, 3, 4, 4, 4, 3, 3, 3, 2, 2, 3, 3, 4, 4, 5, 5, 4, 4, 3, 3, 4, 4, 5, 5, 4, 4, 3, 3, 2, 2, 3, 3, 4];
  steps.forEach((height, i) => {
    const top = H - height * block;
    picture.rect(i * block, top, block, block * 2, SNOW);
    picture.rect(i * block, top + block * 2 - 8, block, 8, color("#b9cbdc"));
    for (let y = top + block * 2; y < H; y += 15) {
      for (let x = i * block; x < (i + 1) * block; x += 15) {
        picture.rect(x, y, 15, 15, color(random() < 0.5 ? "#6b4529" : "#7a5232"));
      }
    }
  });

  const tree = (x, ground, tiers) => {
    picture.rect(x - 8, ground - 24, 16, 24, color("#3a2616"));
    for (let i = 0; i < tiers; i++) {
      const half = 16 + (tiers - i) * 14;
      const y = ground - 44 - i * 36;
      picture.rect(x - half, y, half * 2, 24, color(i % 2 ? "#17403a" : "#0f2f2d"));
      picture.rect(x - half, y - 8, half, 8, SNOW);
    }
  };
  tree(830, H - 4 * block, 3);
  tree(1050, H - 3 * block, 5);

  const lines = [["BLOCKY", 64], ["ADVENT", 196], ["2026", 328]];
  lines.forEach(([line, y], i) => {
    const scale = 16;
    const x = 80;
    text(picture, line, x + 16, y + 16, scale, INK);
    text(picture, line, x + 8, y + 8, scale, HOLLY);
    text(picture, line, x, y, scale, i === 2 ? GOLD : SNOW);
  });

  picture.save("public/og-image.png");
}

mkdirSync("public/icons", { recursive: true });
icon(192);
icon(512);
preview();
