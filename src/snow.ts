interface Flake {
  x: number;
  y: number;
  size: number;
  speed: number;
}

export function startSnow(canvas: HTMLCanvasElement): void {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let flakes: Flake[] = [];

  function resize() {
    width = canvas.width = innerWidth;
    height = canvas.height = innerHeight;
    flakes = Array.from({ length: Math.round((width * height) / 16000) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() < 0.3 ? 4 : 2,
      speed: 0.3 + Math.random() * 0.7,
    }));
  }

  function tick() {
    ctx!.clearRect(0, 0, width, height);
    ctx!.fillStyle = "rgba(238,243,247,.7)";
    for (const flake of flakes) {
      flake.y += flake.speed;
      flake.x += Math.sin(flake.y / 40) * 0.3;
      if (flake.y > height) {
        flake.y = -4;
        flake.x = Math.random() * width;
      }
      ctx!.fillRect(Math.round(flake.x), Math.round(flake.y), flake.size, flake.size);
    }
    requestAnimationFrame(tick);
  }

  addEventListener("resize", resize);
  resize();
  tick();
}
