// Shared ordered-dither settings, matched to playgrnd's defaults.

// Dot size in CSS pixels. playgrnd's full-bleed view lands at ~1.9px.
export const DOT_SIZE = 2;
export const DITHER_LEVELS = 3;
// A slight warm/cool offset per channel, so tone edges pick up faint specks.
export const CHANNEL_SHIFT = [0.035, 0, -0.035] as const;

function bayerMatrix(size: number) {
  let matrix = [
    [0, 2],
    [3, 1],
  ];

  while (matrix.length < size) {
    const half = matrix.length;
    const next = Array.from({ length: half * 2 }, () =>
      new Array<number>(half * 2),
    );

    for (let y = 0; y < half; y += 1) {
      for (let x = 0; x < half; x += 1) {
        const value = matrix[y][x] * 4;
        next[y][x] = value;
        next[y][x + half] = value + 2;
        next[y + half][x] = value + 3;
        next[y + half][x + half] = value + 1;
      }
    }

    matrix = next;
  }

  return matrix;
}

const BAYER = bayerMatrix(8);
const BAYER_CELLS = BAYER.length * BAYER.length;

// Whole device pixels per dot keeps every dot the same size on screen.
export function dotPixels() {
  return Math.max(1, Math.round(DOT_SIZE * window.devicePixelRatio));
}

export function bayerThreshold(x: number, y: number) {
  return (BAYER[y % BAYER.length][x % BAYER.length] + 0.5) / BAYER_CELLS;
}

// Cuts a 0-1 tone to one of DITHER_LEVELS, letting the matrix decide which
// way it rounds so the missing tones read as a crosshatch.
export function ditherLevel(tone: number, threshold: number) {
  const steps = DITHER_LEVELS - 1;
  const scaled = Math.min(1, Math.max(0, tone)) * steps;
  const floor = Math.floor(scaled);
  return Math.min(steps, floor + (scaled - floor > threshold ? 1 : 0)) / steps;
}

type Rgb = readonly [number, number, number];

// Dithers a shape by its alpha coverage. With a paper color the dots mix
// from paper to ink, for dark ink on a light page; without one, lit dots
// are the ink scaled by tone over transparency, for light ink on dark.
export function ditherCoverage(
  source: Uint8ClampedArray,
  output: ImageData,
  {
    ink,
    paper,
    gamma = 1,
    shiftScale = 1,
  }: { ink: Rgb; paper?: Rgb; gamma?: number; shiftScale?: number },
) {
  const { width, height, data } = output;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const pixel = (y * width + x) * 4;
      const alpha = source[pixel + 3];
      if (alpha === 0) continue;
      const tone = Math.pow(alpha / 255, gamma);
      const threshold = bayerThreshold(x, y);
      let lit = Boolean(paper);

      for (let channel = 0; channel < 3; channel += 1) {
        const level = ditherLevel(
          tone + CHANNEL_SHIFT[channel] * shiftScale,
          threshold,
        );
        data[pixel + channel] = paper
          ? paper[channel] + (ink[channel] - paper[channel]) * level
          : ink[channel] * level;
        if (level > 0) lit = true;
      }

      if (lit) data[pixel + 3] = 255;
    }
  }
}

// Reads any CSS color as RGB through a scratch canvas context.
export function parseColor(context: CanvasRenderingContext2D, color: string) {
  context.clearRect(0, 0, 1, 1);
  context.fillStyle = color;
  context.fillRect(0, 0, 1, 1);
  const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
  return [r, g, b] as const;
}
