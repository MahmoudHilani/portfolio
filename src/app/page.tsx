"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "motion/react";
import Image from "next/image";
import { IconArrowDown } from "@tabler/icons-react";
import { Card } from "@/components/ui/card";
import { TerminalCard } from "@/components/terminal-card";
import { EvervaultCard } from "@/components/ui/evervault-card";

export default function Home() {
  return (
    <div className="w-full h-full">
      <AuroraBackground className="w-full h-screen px-13">
        <div className="w-full h-full relative flex flex-col">
          <div className=" flex text-3xl absolute -top-7 lg:text-[120px] xl:text-[176px] tracking-tighter gap-6">
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

          <div className="flex justify-end font-light text-xl md:text-4xl dark:text-neutral-200 mr-40 mt-52">
            <div className="w-md">
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
          <div className="flex items-center text-xl md:text-4xl dark:text-neutral-200 ml-40 mt-86 gap-2">
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
      <div className="flex flex-col h-full w-full p-13 justify-center items-center">
        <div className="text-6xl pb-16">Projects</div>
        <TerminalCard href="/interpreter" card={<EvervaultCard />} />
      </div>
    </div>
  );
}
