import React from "react"
import { cn } from "@/lib/utils"
import Image from "next/image";

const tags = ["Go", "Go Testing", "Web Socket", "API"];

export const SurferCard = ({className} : {className?: string}) => {
    return (
        <div
              className={cn(
                " flex items-center justify-center w-full h-full relative",
                className
              )}
            >
              <div className="absolute w-full h-full bg-gradient-to-r from-black from-40% to-transparent to-55% z-10"></div>
              <div
                className="group/card w-full relative overflow-hidden flex items-center justify-center h-full"
              >
                <div className="h-full flex flex-col z-20 p-4 gap-4 max-w-sm">
                  <div className="text-3xl font-bold">Go Interpreter</div>
                  <div className=" text-xl">
                    An interpreted language that uses Go as its foundation built from
                    scratch. Works in the browser!
                  </div>
                  <div className="flex gap-2 flex-wrap max-w-sm">
                    {tags.map((tag) => (
                      <p key={tag} className="text-sm w-fit border font-light bg-black dark:border-white/[0.2] border-black/[0.2] rounded-full px-2 py-0.5">
                        {tag}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="relative  flex items-center justify-center h-full">
                  
                  <Image
                    src="/Game9.png"
                    alt="Showcase of the terminal window"
                    height={703}
                    width={1523}
                    className="object-cover h-full"
                  />
                </div>
              </div>
            </div>
    )
}