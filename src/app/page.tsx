"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "motion/react";
import Image from "next/image";
import { IconArrowDown } from "@tabler/icons-react";

export default function Home() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 w-full h-full px-13"
      >
        <div className="flex text-3xl absolute -top-7 left-9 lg:text-[120px] xl:text-[176px] tracking-tighter gap-6">
          <p className="dark:text-white ">Mahmoud</p>
          <p className="text-white mix-blend-exclusion">Hilani</p>
        </div>

        <div className="flex justify-end font-light text-xl md:text-4xl dark:text-neutral-200 mr-40 mt-52">
          <p className="w-md">Setting the standard for good development. Here to learn, here to improve.</p>
        </div>
        <div className="flex items-center text-xl md:text-4xl dark:text-neutral-200 ml-40 mt-86 gap-2">
          <p className="">What I've been up to</p>
            <IconArrowDown size={36} className="animate-bounce"/>
        </div>
      </motion.div>
    </AuroraBackground>
    
  );
}
