"use client";
import { useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

export const ParallaxScroll = ({
  images,
  className,
  imageClassName,
}: {
  images: string[];
  className?: string;
  imageClassName?: string;
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
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
        className={cn("flex items-start scrollbar ", className)}
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
                    imageClassName
                  )}
                  alt="thumbnail"
                  width={484}
                  height={850}
                />
              </motion.div>
            ))}
          </div>
          <div className={cn(`flex md:grid md:gap-6 lg:gap-10 justify-center`)}>
            {secondPart.map((el, idx) => (
              <motion.div style={{ y: translateSecond }} key={"grid-2" + idx}>
                <img
                  src={el}
                  className={cn(
                    "object-cover object-center rounded-lg gap-6 lg:gap-10 !m-0 !p-0 aspect-1/2",
                    imageClassName
                  )}
                  alt="thumbnail"
                  width={484}
                  height={850}
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
                    imageClassName
                  )}
                  alt="thumbnail"
                  width={484}
                  height={850}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex overflow-x-scroll snap-x px-12 py-10 scrollbar md:hidden">
        {images.map((el) => (
          <img
            key={el}
            src={el}
            height="850"
            width="484"
            alt="thumbnail"
            className=" rounded-xl object-cover mx-2 sm:mx-4 max-w-3xs sm:max-w-xs snap-center aspect-1/2 "
          ></img>
        ))}
      </div>
    </div>
  );
};

export const ParallaxScrollTwo = ({
  className,
  images,
}: {
  className?: string;
  images: string[];
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const portraitImages = images.filter((image) => image !== "/Game9.png");
  const firstPart = portraitImages.filter((_, index) => index % 2 === 0);
  const secondPart = portraitImages.filter((_, index) => index % 2 !== 0);

  return (
    <div ref={gridRef} className={cn(className, "h-full w-full mx-auto")}>
      <div className="grid grid-cols-2 gap-6">
        <div className="grid gap-6">
          {firstPart.map((el, idx) => (
            <div key={"grid-1" + idx} className="w-full overflow-hidden rounded-lg">
              <img
                src={el}
                height="850"
                width="484"
                alt={`Cube Surfer screenshot ${idx + 1}`}
                className="block w-full aspect-[1/2] object-cover object-center"
              />
            </div>
          ))}
        </div>
        <div className="grid gap-6">
          {secondPart.map((el, idx) => (
            <div key={"grid-2" + idx} className="w-full overflow-hidden rounded-lg">
              <img
                src={el}
                height="850"
                width="484"
                alt={`Cube Surfer screenshot ${idx + 1}`}
                className="block w-full aspect-[1/2] object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
