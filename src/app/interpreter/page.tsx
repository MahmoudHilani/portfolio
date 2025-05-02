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
    <div className="h-screen md:p-16 bg-background">
      <div className="flex flex-col xl:flex-row justify-center items-center xl:gap-8">
        <div className={cn("w-full md:block md:w-[600px] lg:w-[735px]")}>
          <Terminal />
        </div>
        <div className="flex md:w-xl justify-center pt-12 pb-16 md:pb-32 xl:pb-0">
          <GuideCard />
        </div>
      </div>
    </div>
  );
}
