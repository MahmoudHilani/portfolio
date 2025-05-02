import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "motion/react";

const tags = ["Typescript", "React Native", "UI/UX", "API", "Database"];

export const FitnessCard = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        className,
        "flex items-center justify-center w-full h-full relative"
      )}
    >
      <div className="absolute w-full h-full bg-gradient-to-r from-black from-40% to-transparent to-55% z-10"></div>
      <div className="group/card w-full relative overflow-hidden flex items-center justify-center h-full">
        <div className="h-full flex flex-col z-20 p-4 gap-4 w-sm">
          <div className="text-3xl font-bold">Extreme Cube Surfer</div>
          <div className=" text-xl">
            A casual mobile game built in Unity with integrated ads.
          </div>
          <div className="flex gap-2 flex-wrap max-w-sm">
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
        <div className="relative flex items-center object-right h-full w-xl bg-zinc-800">
          <Image
            src="/fitness/lee priest.png"
            height={1522}
            width={1178}
            alt="lee priest"
            className="absolute object-cover rounded-lg bottom-8 left-1/3 h-48 w-48 z-20 shadow-lg"
          />
          <motion.img
          
            src="/fitness/cbum.jpg"
            height={386}
            width={686}
            alt="cbum"
            className="absolute right-1/8 top-8 object-cover rounded-lg h-48 w-48 z-10 shadow-lg"
          />
          <motion.img
            src="/fitness/tnf.jpg"
            alt="Showcase of the fitness website"
            height={703}
            width={623}
            className="absolute left-1/8 top-10 object-cover rounded-lg h-48 w-48 z-10 shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};
