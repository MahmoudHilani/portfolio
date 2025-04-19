"use client";
import GuideCard from "@/components/interpreter-guide";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const Terminal = dynamic(
  async () => (await import("@/components/terminal")).APITerminal,
  { ssr: false }
);

export default function InterpreterPage() {
  return (
    <div className="h-screen p-16 bg-background">
      <div className="flex justify-center items-center gap-8">
        <div className={cn("w-[200px] lg:w-[735px]")}>
          <Terminal />
        </div>
        <div className="flex w-xl justify-center">
          <GuideCard />
        </div>
      </div>
    </div>
  );
}
