"use client";
import GuideCard from "@/components/interpreter-guide";
import { AuroraBackground } from "@/components/ui/aurora-background";
import dynamic from "next/dynamic";

const Terminal = dynamic(
  async () => (await import("@/components/terminal")).APITerminal,
  { ssr: false }
);

export default function InterpreterPage() {
  return (
    <AuroraBackground className="p-16">
      <div className="flex justify-center items-center gap-8">
        <div className="w-[735px]">
          <Terminal />
        </div>
        <div className="flex w-xl justify-center">
          <GuideCard />
        </div>
      </div>
    </AuroraBackground>
  );
}
