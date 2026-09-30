"use client";

import { useEffect, useRef } from "react";
import { ditherCoverage, dotPixels, parseColor } from "@/lib/dither";

// The glyphs fade from full ink at the cap line to this at the baseline, so
// the dither shows as a crosshatch rather than solid dots.
const BASE_TONE = 0.42;
// A soft glow around the glyphs that dithers into a speckled halo.
const GLOW = 0.04; // of the font size
const GLOW_ALPHA = 0.55;

// Draws one line of text through the same ordered dither as the portrait.
// Mount it inside the element that holds the text: the real text stays in
// the DOM for layout, selection and screen readers, and is painted over by
// a canvas that moves with the element's transforms.
export function DitherText({ text }: { text: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const context = canvas?.getContext("2d", { willReadFrequently: true });
    if (!canvas || !host || !context) return;

    let frame = 0;
    let cancelled = false;

    const render = async () => {
      const style = getComputedStyle(host);
      const fontSize = parseFloat(style.fontSize);
      const font = `${style.fontStyle} ${style.fontWeight} ${fontSize}px ${style.fontFamily}`;
      // A missing local fallback face rejects the whole load even when the
      // web font itself arrived, so draw with whatever did load.
      await document.fonts.load(font, text).catch(() => undefined);
      if (cancelled) return;

      const width = host.offsetWidth;
      const height = host.offsetHeight;
      const lineHeight = parseFloat(style.lineHeight) || height;
      const pad = Math.ceil(fontSize * GLOW * 2);
      const scale = window.devicePixelRatio / dotPixels();

      canvas.style.left = canvas.style.top = `${-pad}px`;
      canvas.style.width = `${width + pad * 2}px`;
      canvas.style.height = `${height + pad * 2}px`;
      canvas.width = Math.max(1, Math.round((width + pad * 2) * scale));
      canvas.height = Math.max(1, Math.round((height + pad * 2) * scale));

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.font = `${style.fontStyle} ${style.fontWeight} ${fontSize * scale}px ${style.fontFamily}`;
      context.letterSpacing = `${(parseFloat(style.letterSpacing) || 0) * scale}px`;
      context.textBaseline = "alphabetic";

      // Place the baseline where the browser puts it: the font's content box
      // is centred in the line box, whatever the line height.
      const metrics = context.measureText(text);
      const ascent = metrics.fontBoundingBoxAscent;
      const descent = metrics.fontBoundingBoxDescent;
      const baseline =
        pad * scale + (lineHeight * scale - (ascent + descent)) / 2 + ascent;

      const tone = context.createLinearGradient(
        0,
        baseline - metrics.actualBoundingBoxAscent,
        0,
        baseline,
      );
      tone.addColorStop(0, "rgba(255, 255, 255, 1)");
      tone.addColorStop(1, `rgba(255, 255, 255, ${BASE_TONE})`);
      context.fillStyle = tone;
      context.shadowColor = `rgba(255, 255, 255, ${GLOW_ALPHA})`;
      context.shadowBlur = fontSize * GLOW * scale;
      context.fillText(text, pad * scale, baseline);
      context.shadowBlur = 0;

      const coverage = context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height,
      ).data;
      const ink = parseColor(context, style.color);
      const output = context.createImageData(canvas.width, canvas.height);
      ditherCoverage(coverage, output, { ink });
      context.putImageData(output, 0, 0);
      canvas.dataset.ready = "true";
    };

    const queueRender = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => void render());
    };

    const resizeObserver = new ResizeObserver(queueRender);
    resizeObserver.observe(host);
    document.fonts.addEventListener("loadingdone", queueRender);
    queueRender();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      document.fonts.removeEventListener("loadingdone", queueRender);
    };
  }, [text]);

  return (
    <>
      {text}
      <canvas ref={canvasRef} className="dither-text" aria-hidden="true" />
    </>
  );
}
