"use client";
import { useScroll, useTransform, useSpring, useInView } from "motion/react";
import { useRef } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const gridRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    
  });
  const isInView = useInView(gridRef, {margin: "100px"})
  const offset = 0.42
  const translateFirst = useTransform(scrollYProgress, [offset, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [offset, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [offset, 1], [0, -200]);

  const third = Math.ceil(images.length / 3);

  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);
  

  return (
    <div
      className={cn("items-start w-full scrollbar", className)}
      ref={gridRef}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start  max-w-5xl mx-auto gap-10 py-40 px-10"
        ref={gridRef}
      >
        <div className="grid gap-10">
          {firstPart.map((el, idx) => (
            <motion.div
              style={{ y: translateFirst}} // Apply the translateY motion value here
              key={"grid-1" + idx}
            >
              <img
                src={el}
                className="h-full w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                height="850"
                width="484"
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {secondPart.map((el, idx) => (
            <motion.div style={{ y: translateSecond }} key={"grid-2" + idx}>
              <img
                src={el}
                className="h-full w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                height="850"
                width="484"
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {thirdPart.map((el, idx) => (
            <motion.div style={{ y: translateThird }} key={"grid-3" + idx}>
              <img
                src={el}
                className="h-full w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                height="850"
                width="484"
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
