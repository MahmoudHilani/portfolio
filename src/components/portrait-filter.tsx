"use client";

import { useEffect, useRef } from "react";

const CELL_SIZE = 3;
const MAX_SAMPLE_WIDTH = 720;
const CONTRAST = 1.12;
const EXPOSURE = 0.018;
const DITHER_FRAMES = 4;
const FRAME_DURATION = 150;

type DitherColor = readonly [number, number, number];

function drawDither(
  context: CanvasRenderingContext2D,
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  color: DitherColor,
  phase: number,
) {
  const luminance = new Float32Array(width * height);

  for (let index = 0; index < luminance.length; index += 1) {
    const pixel = index * 4;
    const sourceValue =
      (pixels[pixel] * 0.2126 +
        pixels[pixel + 1] * 0.7152 +
        pixels[pixel + 2] * 0.0722) /
      255;
    // Preserve true black while opening the low-mid tones where the hair lives.
    const value =
      sourceValue < 0.04 ? 0 : Math.pow(sourceValue, 0.68) * 0.94;
    const grain =
      (((index * 17 + phase * 31) % 23) / 22 - 0.5) * 0.045;

    luminance[index] = Math.min(
      1,
      Math.max(0, (value - 0.5) * CONTRAST + 0.5 + EXPOSURE + grain),
    );
  }

  const output = context.createImageData(width, height);

  for (let y = 0; y < height; y += 1) {
    const leftToRight = y % 2 === 0;
    const start = leftToRight ? 0 : width - 1;
    const end = leftToRight ? width : -1;
    const direction = leftToRight ? 1 : -1;

    for (let x = start; x !== end; x += direction) {
      const index = y * width + x;
      const oldValue = luminance[index];
      const newValue = oldValue >= 0.5 ? 1 : 0;
      const error = oldValue - newValue;

      if (newValue === 1) {
        const pixel = index * 4;
        output.data[pixel] = color[0];
        output.data[pixel + 1] = color[1];
        output.data[pixel + 2] = color[2];
        output.data[pixel + 3] = 255;
      }

      const spread = (offsetX: number, offsetY: number, amount: number) => {
        const targetX = x + offsetX * direction;
        const targetY = y + offsetY;
        if (targetX < 0 || targetX >= width || targetY >= height) return;
        luminance[targetY * width + targetX] += error * amount;
      };

      spread(1, 0, 7 / 16);
      spread(-1, 1, 3 / 16);
      spread(0, 1, 5 / 16);
      spread(1, 1, 1 / 16);
    }
  }

  context.putImageData(output, 0, 0);
  return output;
}

export function PortraitFilter() {
  const rootRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLCanvasElement>(null);
  const accentRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const base = baseRef.current;
    const accent = accentRef.current;
    if (!root || !base || !accent) return;

    const baseContext = base.getContext("2d");
    const accentContext = accent.getContext("2d");
    const sample = document.createElement("canvas");
    const sampleContext = sample.getContext("2d", { willReadFrequently: true });
    if (!baseContext || !accentContext || !sampleContext) return;

    const source = new Image();
    source.src = "/portrait-hero-wide.png";
    let resizeFrame = 0;
    let pointerFrame = 0;
    let animationFrame = 0;
    let ditherFrames: Array<{
      base: ImageData;
      accent: ImageData;
    }> = [];
    let activeFrame = 0;
    let previousFrameTime = 0;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const animate = (time: number) => {
      if (
        ditherFrames.length > 1 &&
        time - previousFrameTime >= FRAME_DURATION
      ) {
        activeFrame = (activeFrame + 1) % ditherFrames.length;
        baseContext.putImageData(ditherFrames[activeFrame].base, 0, 0);
        accentContext.putImageData(ditherFrames[activeFrame].accent, 0, 0);
        previousFrameTime = time;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    const render = () => {
      if (!source.naturalWidth) return;

      const bounds = root.getBoundingClientRect();
      const width = Math.min(
        MAX_SAMPLE_WIDTH,
        Math.max(1, Math.round(bounds.width / CELL_SIZE)),
      );
      const height = Math.max(1, Math.round(width / (bounds.width / bounds.height)));

      sample.width = width;
      sample.height = height;
      base.width = accent.width = width;
      base.height = accent.height = height;

      const sourceRatio = source.naturalWidth / source.naturalHeight;
      const targetRatio = width / height;
      let cropWidth = source.naturalWidth;
      let cropHeight = source.naturalHeight;

      if (sourceRatio > targetRatio) cropWidth = cropHeight * targetRatio;
      else cropHeight = cropWidth / targetRatio;

      const zoom = targetRatio > 1.15 ? 1.16 : 1.04;
      cropWidth /= zoom;
      cropHeight /= zoom;
      const cropX = (source.naturalWidth - cropWidth) / 2;
      const cropY = (source.naturalHeight - cropHeight) * 0.43;

      sampleContext.clearRect(0, 0, width, height);
      sampleContext.drawImage(
        source,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        width,
        height,
      );

      const pixels = sampleContext.getImageData(0, 0, width, height).data;
      ditherFrames = Array.from(
        { length: reducedMotion ? 1 : DITHER_FRAMES },
        (_, phase) => ({
          base: drawDither(
            baseContext,
            pixels,
            width,
            height,
            [222, 221, 212],
            phase,
          ),
          accent: drawDither(
            accentContext,
            pixels,
            width,
            height,
            [255, 91, 53],
            phase,
          ),
        }),
      );
      activeFrame = 0;
      baseContext.putImageData(ditherFrames[0].base, 0, 0);
      accentContext.putImageData(ditherFrames[0].accent, 0, 0);
      root.dataset.ready = "true";

      if (!reducedMotion && !animationFrame) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const queueRender = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(render);
    };

    const movePointer = (event: PointerEvent) => {
      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        const bounds = root.getBoundingClientRect();
        root.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
        root.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
      });
    };

    const resetPointer = () => {
      root.style.removeProperty("--pointer-x");
      root.style.removeProperty("--pointer-y");
    };

    const resizeObserver = new ResizeObserver(queueRender);
    resizeObserver.observe(root);
    source.addEventListener("load", render);
    window.addEventListener("pointermove", movePointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", resetPointer);
    if (source.complete) render();

    return () => {
      cancelAnimationFrame(resizeFrame);
      cancelAnimationFrame(pointerFrame);
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      source.removeEventListener("load", render);
      window.removeEventListener("pointermove", movePointer);
      document.documentElement.removeEventListener("pointerleave", resetPointer);
    };
  }, []);

  return (
    <div ref={rootRef} className="portrait-filter" aria-hidden="true">
      <canvas ref={baseRef} />
      <canvas ref={accentRef} className="portrait-filter__accent" />
    </div>
  );
}
