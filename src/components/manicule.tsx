"use client";

import { useEffect, useRef } from "react";
import { ditherCoverage, dotPixels, parseColor } from "@/lib/dither";

// Public-domain typographic engraving; source and adaptation notes are in the SVG.
const SOURCE = "/manicule.svg";
const ASPECT = 3860 / 2150;
// Thickens the fine hatching so it survives being cut down to a few dots.
const INK_GAMMA = 0.55;

// Drawn through the same ordered dither as the hero portrait: the engraving's
// ink coverage is cut to a few tones between paper and ink.
export function Manicule({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { willReadFrequently: true });
    if (!canvas || !context) return;

    const source = new Image();
    source.src = SOURCE;
    let frame = 0;

    const render = () => {
      if (!source.complete || !source.naturalWidth) return;

      const cssWidth = canvas.getBoundingClientRect().width;
      if (!cssWidth) return;
      const width = Math.max(
        1,
        Math.round((cssWidth * window.devicePixelRatio) / dotPixels()),
      );
      const height = Math.max(1, Math.round(width / ASPECT));
      canvas.width = width;
      canvas.height = height;

      const style = getComputedStyle(canvas);
      const ink = parseColor(context, style.color);
      const paper = parseColor(
        context,
        style.getPropertyValue("--paper").trim() || "#f0efe9",
      );

      context.clearRect(0, 0, width, height);
      context.drawImage(source, 0, 0, width, height);
      const coverage = context.getImageData(0, 0, width, height).data;
      const output = context.createImageData(width, height);

      ditherCoverage(coverage, output, { ink, paper, gamma: INK_GAMMA });

      context.putImageData(output, 0, 0);
    };

    const queueRender = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(render);
    };

    const resizeObserver = new ResizeObserver(queueRender);
    resizeObserver.observe(canvas);
    source.addEventListener("load", queueRender);
    queueRender();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      source.removeEventListener("load", queueRender);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
