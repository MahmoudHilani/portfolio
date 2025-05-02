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
        <div
          className="flex h-full w-full overflow-x-scroll md:grid md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-5xl mx-auto md:gap-6 lg:gap-10 pt-10  lg:pb-40 xl:px-10"
          ref={gridRef}
        >
          <div className="flex h-full w-full overflow-x-scroll md:grid md:gap-6 lg:gap-10">
            {firstPart.map((el, idx) => (
              <motion.div style={{ y: translateFirst }} key={"grid-1" + idx}>
                <img
                  src={el}
                  className="h-full w-full object-cover object-left-top rounded-lg gap-6 lg:gap-10 !m-0 !p-0"
                  height="850"
                  width="484"
                  alt="thumbnail"
                />
              </motion.div>
            ))}
          </div>
          <div className="flex h-full w-full overflow-x-scroll md:grid md:gap-6 lg:gap-10">
            {secondPart.map((el, idx) => (
              <motion.div style={{ y: translateSecond }} key={"grid-2" + idx}>
                <img
                  src={el}
                  className="h-full w-full object-cover object-left-top rounded-lg gap-6 lg:gap-10 !m-0 !p-0"
                  height="850"
                  width="484"
                  alt="thumbnail"
                />
              </motion.div>
            ))}
          </div>
          <div className="flex h-full w-full overflow-x-scroll md:grid md:gap-6 lg:gap-10">
            {thirdPart.map((el, idx) => (
              <motion.div style={{ y: translateThird }} key={"grid-3" + idx}>
                <img
                  src={el}
                  className="h-full w-full object-cover object-left-top rounded-lg gap-6 lg:gap-10 !m-0 !p-0"
                  height="850"
                  width="484"
                  alt="thumbnail"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex overflow-x-scroll snap-x px-12 scrollbar md:hidden">
        {images.map((image, idx) => (
          <img key={image} src={image} height={850} width={484} alt="thumbnail" className="rounded-xl mx-4 max-w-xs shadow-lg snap-center"></img>
        ))}
      </div>
    </div>
  );
};
