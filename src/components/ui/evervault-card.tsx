"use client";
import { useMotionValue } from "motion/react";
import React, { useState, useEffect } from "react";
import { useMotionTemplate, motion } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const EvervaultCard = ({ className }: { className?: string }) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  const [randomString, setRandomString] = useState("");

  useEffect(() => {
    let str = generateRandomString(2500);
    setRandomString(str);
  }, []);

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);

    const str = generateRandomString(2500);
    setRandomString(str);
  }

  return (
    <div
      className={cn(
        " flex items-center justify-center w-full h-full relative",
        className
      )}
    >
      <div className="absolute w-full h-full bg-gradient-to-r from-black from-28% to-transparent to-45% z-10"></div>
      <div
        onMouseMove={onMouseMove}
        className="group/card w-full relative overflow-hidden flex items-center justify-center h-full"
      >
        <div className="h-full flex flex-col z-20 p-4 gap-4 max-w-sm">
          <div className="text-3xl font-bold">Go Interpreter</div>
          <div className="dark:text-white text-black text-xl">
            An interpreted language that uses Go as its foundation built from
            scratch. Works in the browser!
          </div>
          <p className="text-sm w-fit border font-light dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5">
            Watch me hover
          </p>
        </div>

        <CardPattern
          mouseX={mouseX}
          mouseY={mouseY}
          randomString={randomString}
        />
        <div className="relative z-10 flex items-center justify-center p-8">
          {/* 5:8 ratio */}
          <Image
            src="/Terminal.png"
            alt="Showcase of the terminal window"
            height={575}
            width={920}
            className=""
          />
        </div>
      </div>
    </div>
  );
};

export function CardPattern({ mouseX, mouseY, randomString }: any) {
  let maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
  let style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0  [mask-image:linear-gradient(white,transparent)] "></div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-700 opacity-0  group-hover/card:opacity-100 backdrop-blur-xl transition duration-500"
        style={style}
      />
      <motion.div
        className="absolute inset-0 opacity-0 mix-blend-overlay  group-hover/card:opacity-100"
        style={style}
      >
        <p className="absolute ml-64 inset-x-0 text-xs h-full break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500">
          {randomString}
        </p>
      </motion.div>
    </div>
  );
}

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
export const generateRandomString = (length: number) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
