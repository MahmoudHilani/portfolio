"use client";
import GuideCard from "@/components/interpreter-guide";
import { ProjectBackButton } from "@/components/project-back-button";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const Terminal = dynamic(
  async () => (await import("@/components/terminal")).APITerminal,
  { ssr: false }
);

export default function InterpreterPage() {
  return (
    <div className="h-dvh md:p-16 bg-background">
      <ProjectBackButton className="border-black/15 bg-white/80 text-black hover:bg-white dark:border-white/15 dark:bg-black/50 dark:text-white dark:hover:bg-black/70" />
      <div className="flex flex-col xl:flex-row justify-center items-center xl:gap-8">
        <div className={cn("w-full md:block md:w-[600px] lg:w-[735px]")}>
          <Terminal />
        </div>
        <div className="flex md:w-xl justify-center pt-12 xl:pt-0 pb-16 md:pb-32 xl:pb-0">
          <GuideCard />
        </div>
      </div>
    </div>
  );
}
