import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "motion/react";

const tags = ["Typescript", "React Native", "UI/UX", "API", "Database"];

export const FitnessCard = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        className,
        " group flex items-center justify-center w-full h-full relative bg-zinc-800"
      )}
    >
      <div className="group/card w-full relative overflow-hidden flex items-center justify-center h-full flex-col-reverse lg:flex-row">
        <div className="absolute w-full h-full bg-gradient-to-t lg:bg-gradient-to-r from-black from-45% md:from-35% lg:from-40% to-transparent to-60% md:to-50% z-10" />
        <div className="h-full flex lg:shrink-3 flex-col z-20 p-4 gap-4 justify-between">
          <div className="flex flex-col gap-4 ">
            <div className="flex justify-center lg:justify-normal text-3xl font-bold">
              Fitness App
            </div>
            <div className="text-center lg:text-start text-xl">
              A mobile application for calorie and workout tracking with a
              corresponding landing page.
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-end justify-center lg:justify-normal">
            {tags.map((tag) => (
              <p
                key={tag}
                className="text-sm w-fit border font-light bg-black dark:border-white/[0.2] border-black/[0.2] rounded-full px-2 py-0.5"
              >
                {tag}
              </p>
            ))}
          </div>
        </div>
        <div className=" relative  flex items-center object-right h-48 md:h-72 lg:h-full w-md md:w-xl ">
          <Image
            src="/fitness/lee priest.png"
            height={1522}
            width={1178}
            alt="lee priest"
            className="hidden md:flex absolute object-cover rounded-lg bottom-6 lg:bottom-8 left-1/3 h-48 w-48 z-20 shadow-lg "
          />
          <Image
            src="/fitness/cbum.jpg"
            height={386}
            width={686}
            alt="cbum"
            className="absolute right-1/5 top-7 rotate-6 lg:right-1/10 lg:top-8 object-cover rounded-lg h-36 w-36 md:h-48 md:w-48 z-10 shadow-lg transition-transform duration-300 group-hover:rotate-6"
          />
          <Image
            src="/fitness/tnf.jpg"
            alt="Showcase of the fitness website"
            height={703}
            width={623}
            className="absolute left-1/5 top-7 -rotate-6 lg:left-1/10 lg:top-10 object-cover rounded-lg h-36 w-36 md:h-48 md:w-48 z-10 shadow-lg transition-transform duration-300 group-hover:-rotate-6"
          />
        </div>
      </div>
    </div>
  );
};
