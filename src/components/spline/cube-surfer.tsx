"use client";

import dynamic from "next/dynamic";

const CubeSurferScene = dynamic(
  () =>
    import("./cube-surfer-scene").then((module) => module.CubeSurferScene),
  {
    loading: () => (
      <div className="flex h-full min-h-80 w-full items-center justify-center rounded-lg bg-zinc-800 text-sm text-zinc-400">
        Loading model...
      </div>
    ),
    ssr: false,
  }
);

export const CubeSurfer = () => {
  return <CubeSurferScene />;
};
