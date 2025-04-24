import React from "react";
import { EvervaultCard } from "./ui/evervault-card";
import { motion } from "motion/react";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { SurferCard } from "./surfer-card";

export function PlusCard({ href, card }: { href: string; card: React.JSX.Element }) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -10 }}
        className="border border-black/[0.2] dark:border-white/[0.2] dark:text-white text-black flex items-start aspect-auto w-4xl h-96 mx-auto relative cursor-pointer"
      >
        <PlusIcon className="absolute z-20 h-6 w-6 -top-3 -left-3 " />
        <PlusIcon className="absolute z-20 h-6 w-6 -bottom-3 -left-3" />
        <PlusIcon className="absolute z-20 h-6 w-6 -top-3 -right-3" />
        <PlusIcon className="absolute z-20 h-6 w-6 -bottom-3 -right-3" />

        {card}
      </motion.div>
    </Link>
  );
}
