"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "motion/react";
import Image from "next/image";

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
        className="relative flex flex-col gap-4 w-full h-full "
      >
        <div className="text-3xl md:text-[172px] tracking-tighter dark:text-white">
          Mahmoud Hilani
        </div>
        <div className="font-extralight text-xl md:text-4xl dark:text-neutral-200 px-3">
          Software Engineer
        </div>
        
      </motion.div>
    </AuroraBackground>
  );
}
