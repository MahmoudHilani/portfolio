"use client";

import { useEffect, useRef } from "react";
import {
  DITHER_FRAMES,
  ditherCoverage,
  dotPixels,
  FRAME_DURATION,
  parseColor,
} from "@/lib/dither";

// The shaft fades from this at the tail to full ink at the tip.
const TAIL_TONE = 0.3;

// A tapered shaft into a swept-back harpoon head, pointing right along the
// x axis from the tail at 0 to the tip at 1. The barbs curve in like a serif
// bracket to sit with the italic Instrument Serif beside it.
function traceArrow(context: CanvasRenderingContext2D) {
  context.beginPath();
  context.moveTo(0, -0.028);
  context.lineTo(0.66, -0.058);
  context.quadraticCurveTo(0.6, -0.2, 0.48, -0.37);
  context.quadraticCurveTo(0.78, -0.15, 1, 0);
  context.quadraticCurveTo(0.78, 0.15, 0.48, 0.37);
  context.quadraticCurveTo(0.6, 0.2, 0.66, 0.058);
  context.lineTo(0, 0.028);
  context.closePath();
}

// An up-right arrow drawn through the same animated ordered dither as the
// hero name, in the canvas's CSS `color`.
export function DitherArrow({ className }: { className?: string }) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { willReadFrequently: true });
    if (!root || !canvas || !context) return;

    let frame = 0;
    let animationFrame = 0;
    let ditherFrames: ImageData[] = [];
    let activeFrame = 0;
    let previousFrameTime = 0;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const animate = (time: number) => {
      if (time - previousFrameTime >= FRAME_DURATION) {
        activeFrame = (activeFrame + 1) % ditherFrames.length;
        context.putImageData(ditherFrames[activeFrame], 0, 0);
        previousFrameTime = time;
      }
      animationFrame = requestAnimationFrame(animate);
    };

    const render = () => {
      const cssSize = root.getBoundingClientRect().width;
      if (!cssSize) return;
      const size = Math.max(
        1,
        Math.round((cssSize * window.devicePixelRatio) / dotPixels()),
      );
      canvas.width = canvas.height = size;

      // Rasterise the shape once, rotated to point up and right.
      const length = size * 1.08;
      context.clearRect(0, 0, size, size);
      context.save();
      context.translate(size / 2, size / 2);
      context.rotate(-Math.PI / 4);
      context.translate(-length / 2, 0);
      context.scale(length, length);
      const tone = context.createLinearGradient(0, 0, 1, 0);
      tone.addColorStop(0, `rgba(255, 255, 255, ${TAIL_TONE})`);
      tone.addColorStop(0.55, "rgba(255, 255, 255, 1)");
      context.fillStyle = tone;
      traceArrow(context);
      context.fill();
      context.restore();
      const coverage = context.getImageData(0, 0, size, size).data;

      const ink = parseColor(context, getComputedStyle(canvas).color);
      ditherFrames = Array.from(
        { length: reducedMotion ? 1 : DITHER_FRAMES },
        (_, phase) => {
          const output = context.createImageData(size, size);
          ditherCoverage(coverage, output, {
            ink,
            phase: reducedMotion ? undefined : phase,
          });
          return output;
        },
      );
      activeFrame = 0;
      context.putImageData(ditherFrames[0], 0, 0);

      if (!reducedMotion && !animationFrame) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const queueRender = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(render);
    };

    const resizeObserver = new ResizeObserver(queueRender);
    resizeObserver.observe(root);
    queueRender();

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <span ref={rootRef} className={className} aria-hidden="true">
      <canvas ref={canvasRef} />
    </span>
  );
}
