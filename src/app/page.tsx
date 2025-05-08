"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "motion/react";
import { IconArrowDown } from "@tabler/icons-react";
import { PlusCard } from "@/components/plus-card";
import { EvervaultCard } from "@/components/ui/evervault-card";
import { SurferCard } from "@/components/surfer-card";
import { FitnessCard } from "@/components/ui/fitness-card";

export default function Home() {
  return (
    <div className="w-full h-full">
      <AuroraBackground className="w-full h-screen">
        <div className="w-full h-full relative flex flex-col">
          <div className=" flex flex-col lg:flex-row text-[77px] text-7xl sm:text-[150px] sm:text-9xl absolute  lg:left-0 lg:-top-3 xl:text-[176px] tracking-tighter lg:gap-6">
            <motion.p
              initial={{ opacity: 0.0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              className="dark:text-white"
            >
              Mahmoud
            </motion.p>

            <motion.p
              initial={{ opacity: 0.0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              className="text-white mix-blend-soft-light"
            >
              Hilani
            </motion.p>
          </div>

          <div className="flex absolute right-0 xl:right-36 top-72 sm:top-96 lg:top-64 font-light text-3xl sm:text-4xl dark:text-neutral-200">
            <div className="w-3xs sm:w-xs md:w-md">
              {"Setting the standard for good development. Here to learn, here to improve."
                .split(" ")
                .map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, filter: "blur(2px)", y: 10 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: index * 0.1 + 0.4,
                      ease: "easeInOut",
                    }}
                    className="mr-2 inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
            </div>
          </div>
          <div className="flex absolute bottom-4 md:bottom-6 left-8 lg:bottom-8 xl:left-36 items-center text-xl md:text-4xl dark:text-neutral-200 gap-2">
            {"What I've been up to".split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(2px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.1 + 1.3,
                  ease: "easeInOut",
                }}
                className="hidden lg:flex"
              >
                {word}
              </motion.span>
            ))}
            <motion.div
              initial={{ opacity: 0, filter: "blur(2px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                delay: 2,
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              <IconArrowDown size={36} className="animate-bounce" />
            </motion.div>
          </div>
        </div>
      </AuroraBackground>
      <div className="flex flex-col w-full p-13 justify-center items-center">
        <div className="text-5xl sm:text-6xl pb-16">Projects</div>
        <div className="flex flex-col gap-8">
          <PlusCard href="/interpreter" card={<EvervaultCard />} />
          <PlusCard href="/cube-surfer" card={<SurferCard />} />
          <PlusCard href="/fitness" card={<FitnessCard />} />
        </div>
      </div>
      <div className="flex justify-center text-4xl md:text-6xl lg:text-7xl pb-24">
        and this website!
      </div>
      <div className="flex text-center justify-center text-4xl md:text-4xl lg:text-5xl pb-24 px-10 md:px-40 lg:px-80">
        Want to work with me? Contact me! <br /> (it's worth it)
      </div>
    </div>
  );
}
