"use client";
import { useScroll, useTransform, useSpring, useInView } from "motion/react";
import { useRef } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { Images } from "lucide-react";
import Image from "next/image";

export const ParallaxScroll = ({
  images,
  className,
  imageClassName,
  height,
  width,
}: {
  images: string[];
  className?: string;
  imageClassName?: string;
  width?: number;
  height?: number;
}) => {
  const gridRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start start", "end start"],
  });
  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const third = Math.ceil(images.length / 3);

  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  return (
    <div>
      {/* md and above */}
      <div
        className={cn("hidden md:flex md:items-start  scrollbar", className)}
        ref={gridRef}
      >
        <div className="flex h-full w-full md:grid md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-5xl  mx-auto md:gap-6 lg:gap-10 pt-10 lg:pb-40">
          <div className="flex h-full w-full md:grid md:gap-6 lg:gap-10">
            {firstPart.map((el, idx) => (
              <motion.div style={{ y: translateFirst }} key={"grid-1" + idx}>
                <img
                  src={el}
                  className={cn(
                    " object-cover object-center rounded-lg gap-6 lg:gap-10 !m-0 !p-0 aspect-1/2",
                    imageClassName,
                    `w-[${width}px] h-[${height}px]`
                  )}
                  
                  alt="thumbnail"
                />
              </motion.div>
            ))}
          </div>
          <div className={cn(`flex md:grid md:gap-6 lg:gap-10 justify-center`)}>
            {secondPart.map((el, idx) => (
              <motion.div style={{ y: translateSecond }} key={"grid-2" + idx} >
                <img
                  src={el}
                  className={cn(
                    "object-cover object-center rounded-lg gap-6 lg:gap-10 !m-0 !p-0 aspect-1/2",
                    imageClassName,
                  )}
                  alt="thumbnail"
                  width={width}
                  height={height}
                />
              </motion.div>
            ))}
          </div>
          <div className="flex h-full w-full md:grid md:gap-6 lg:gap-10">
            {thirdPart.map((el, idx) => (
              <motion.div style={{ y: translateThird }} key={"grid-3" + idx}>
                <img
                  src={el}
                  className={cn(
                    "object-cover object-center rounded-lg gap-6 lg:gap-10 !m-0 !p-0 aspect-1/2",
                    imageClassName,
                  )}
                  alt="thumbnail"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex overflow-x-scroll snap-x px-12 pb-16 scrollbar md:hidden">
        {images.map((el) => (
          <img
            key={el}
            src={el}
            height={height ?? "850"}
                  width={width ?? "484"}
            alt="thumbnail"
            className=" rounded-xl object-cover mx-2 sm:mx-4 max-w-3xs sm:max-w-xs shadow-lg snap-center"
          ></img>
        ))}
      </div>
    </div>
  );
};

export const ParallaxScrollTwo = ({
  className,
  images,
  height,
  width,
}: {
  className?: string;
  images: string[];
  height?: string;
  width?: string;
}) => {
  const gridRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start start", "end start"],
  });

  const half = Math.ceil(images.length / 2);
  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const firstPart = images.slice(0, half);
  const secondPart = images.slice(half, -1);

  return (
    <div className={cn(className, "h-full w-full mx-auto ")}>
      <div className="grid grid-cols-2 gap-6">
        {firstPart.map((el, idx) => (
          <motion.div style={{ y: translateFirst }} key={"grid-1" + idx}>
            <img
              src={el}
              height={height ?? "850"}
              width={width ?? "484"}
              alt={`Fitness App ${idx}`}
              className="h-full w-full object-cover object-center"
            />
          </motion.div>
        ))}
        {secondPart.map((el, idx) => (
          <motion.div style={{ y: translateSecond }} key={"grid-2" + idx}>
            <img
              src={el}
              height={height ?? "850"}
              width={width ?? "484"}
              alt={`Fitness App ${idx}`}
              className="h-full w-full object-cover object-center"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
