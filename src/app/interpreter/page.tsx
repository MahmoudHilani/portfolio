"use client";
import GoTerminal from "@/components/go-interpreter";
import GuideCard from "@/components/interpreter-guide";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { IconMinus, IconSquare, IconTerminal, IconTerminal2, IconX } from "@tabler/icons-react";
import dynamic from "next/dynamic";

const Terminal = dynamic(
  async () => (await import("@/components/terminal")).APITerminal,
  { ssr: false }
);

export default function InterpreterPage() {
  return (
    
      <AuroraBackground className="grid grid-cols-2 p-16 gap-8">
        <div>
          <Terminal />
        </div>
        <div className="flex w-xl justify-center">
          <GuideCard />
        </div>
      </AuroraBackground>
   
  );
}
