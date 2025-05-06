import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const tags = ["C#", "Unity", "Design", "API"];

export const SurferCard = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        " flex items-center justify-center w-full h-full relative",
        className
      )}
    >
      <div className="group/card w-full relative overflow-hidden flex items-center justify-center h-full flex-col-reverse lg:flex-row">
        <div className="flex flex-col h-full">
          <div className="hidden lg:flex absolute w-full h-full bg-gradient-to-r from-black from-45% to-transparent to-50% z-10"></div>
          <div className="h-full w-full flex flex-col z-20 p-4 gap-4 justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex justify-center lg:justify-normal text-3xl font-bold">
                Extreme Cube Surfer
              </div>
              <div className="flex text-center lg:text-start text-xl">
                A casual mobile game built in Unity with integrated ads.
              </div>
            </div>
            <div className="flex justify-center lg:justify-normal gap-2 flex-wrap ">
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
        </div>
        <div className="relative flex items-center object-right h-full">
          <Image
            src="/Game9.png"
            alt="Showcase of the terminal window"
            height={703}
            width={623}
            className="object-cover h-full"
          />
        </div>
      </div>
    </div>
  );
};
