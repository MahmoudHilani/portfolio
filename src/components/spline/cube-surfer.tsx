"use client"
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline/next"), {
  ssr: false,
});

export const CubeSurfer = () => {
  return (
    <Spline scene="https://prod.spline.design/3vdg4c5ucf8QksCX/scene.splinecode" />
  );
};
