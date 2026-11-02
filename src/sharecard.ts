// Draws today's challenge as a tall picture, sized for phone stories, so apps
// like Snapchat receive an image and not only text.

const WIDTH = 1080;
const HEIGHT = 1920;
const PANEL_X = 90;
const PANEL_WIDTH = WIDTH - PANEL_X * 2;
const PANEL_PADDING = 44;
const FOOTER_HEIGHT = 120;
const SCENE_TOP = 1180;

const DISPLAY = '"Press Start 2P", "Courier New", monospace';
const BODY = '"VT323", "Courier New", monospace';
const LEVEL_COLORS = { easy: "#2f6420", medium: "#8a5a00", hard: "#96241f" };

export interface ShareCard {
  day: number;
  date: string;
  title: string;
  challenge: string;
  type: string;
  level: keyof typeof LEVEL_COLORS;
  sleeps: number;
  site: string;
}

function wrap(ctx: CanvasRenderingContext2D, text: string, width: number): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    const next = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(next).width > width) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  lines.push(line);
  return lines;
}

function chip(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color: string): number {
  ctx.font = `44px ${BODY}`;
  const width = ctx.measureText(text).width + 36;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, 60);
  ctx.fillStyle = "#eef3f7";
  ctx.fillText(text, x + 18, y + 44);
  return width;
}

export async function drawShareCard(card: ShareCard, scene: HTMLCanvasElement): Promise<File> {
  await Promise.all([document.fonts.load(`40px ${DISPLAY}`), document.fonts.load(`40px ${BODY}`)]);

  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No canvas");
  ctx.imageSmoothingEnabled = false;

  ctx.fillStyle = "#10163a";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // The hero scene fills the bottom of the card, cropped to its snowy foreground.
  const sceneHeight = HEIGHT - SCENE_TOP - FOOTER_HEIGHT;
  const cropWidth = Math.min(scene.width, Math.round((scene.height * WIDTH) / sceneHeight));
  const cropHeight = Math.round((cropWidth * sceneHeight) / WIDTH);
  ctx.drawImage(
    scene,
    Math.round((scene.width - cropWidth) / 2),
    scene.height - cropHeight,
    cropWidth,
    cropHeight,
    0,
    SCENE_TOP,
    WIDTH,
    sceneHeight,
  );

  for (let i = 0; i < 90; i++) {
    ctx.fillStyle = i % 3 === 0 ? "#a9d6f2" : "#eef3f7";
    const size = i % 4 === 0 ? 8 : 4;
    ctx.fillRect((i * 389) % WIDTH, (i * 211) % (SCENE_TOP + 140), size, size);
  }

  ctx.textAlign = "center";
  ctx.font = `50px ${DISPLAY}`;
  ctx.fillStyle = "#c8322e";
  ctx.fillText("Blocky Advent 2026", WIDTH / 2 + 5, 165);
  ctx.fillStyle = "#eef3f7";
  ctx.fillText("Blocky Advent 2026", WIDTH / 2, 160);
  ctx.font = `62px ${BODY}`;
  ctx.fillStyle = "#f2c14e";
  ctx.fillText(`Day ${card.day} · ${card.date}`, WIDTH / 2, 262);
  ctx.textAlign = "left";

  const textWidth = PANEL_WIDTH - PANEL_PADDING * 2;
  ctx.font = `40px ${DISPLAY}`;
  const titleLines = wrap(ctx, card.title, textWidth);
  ctx.font = `58px ${BODY}`;
  const bodyLines = wrap(ctx, card.challenge, textWidth);

  const panelTop = 330;
  const panelHeight = 196 + titleLines.length * 62 + bodyLines.length * 62;
  ctx.fillStyle = "#0a0d12";
  ctx.fillRect(PANEL_X - 6, panelTop - 6, PANEL_WIDTH + 12, panelHeight + 12);
  ctx.fillStyle = "#c6c6c6";
  ctx.fillRect(PANEL_X, panelTop, PANEL_WIDTH, panelHeight);

  let y = panelTop + PANEL_PADDING;
  const levelWidth = chip(ctx, card.level[0].toUpperCase() + card.level.slice(1), PANEL_X + PANEL_PADDING, y, LEVEL_COLORS[card.level]);
  chip(ctx, card.type, PANEL_X + PANEL_PADDING + levelWidth + 16, y, "#4d4d4d");

  y += 128;
  ctx.fillStyle = "#0a0d12";
  ctx.font = `40px ${DISPLAY}`;
  for (const line of titleLines) {
    ctx.fillText(line, PANEL_X + PANEL_PADDING, y);
    y += 62;
  }
  y += 8;
  ctx.font = `58px ${BODY}`;
  for (const line of bodyLines) {
    ctx.fillText(line, PANEL_X + PANEL_PADDING, y);
    y += 62;
  }

  ctx.textAlign = "center";
  if (card.sleeps > 0) {
    ctx.font = `28px ${DISPLAY}`;
    ctx.fillStyle = "#0a0d12";
    ctx.fillText(`${card.sleeps} ${card.sleeps === 1 ? "sleep" : "sleeps"} until Christmas`, WIDTH / 2 + 3, panelTop + panelHeight + 93);
    ctx.fillStyle = "#f2c14e";
    ctx.fillText(`${card.sleeps} ${card.sleeps === 1 ? "sleep" : "sleeps"} until Christmas`, WIDTH / 2, panelTop + panelHeight + 90);
  }

  ctx.fillStyle = "#0a0d12";
  ctx.fillRect(0, HEIGHT - FOOTER_HEIGHT, WIDTH, FOOTER_HEIGHT);
  ctx.font = `50px ${BODY}`;
  ctx.fillStyle = "#eef3f7";
  ctx.fillText(card.site, WIDTH / 2, HEIGHT - 44);

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
  if (!blob) throw new Error("No image");
  return new File([blob], `blocky-advent-day-${card.day}.png`, { type: "image/png" });
}
