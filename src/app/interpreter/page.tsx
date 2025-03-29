"use client";
import GoTerminal from "@/components/go-interpreter";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { IconMinus, IconSquare, IconTerminal, IconTerminal2, IconX } from "@tabler/icons-react";
import dynamic from "next/dynamic";

const Terminal = dynamic(
  async () => (await import("@/components/terminal")).APITerminal,
  { ssr: false }
);

export default function InterpreterPage() {
  return (
    <div>
      <AuroraBackground>
        <div className="drop-shadow-lg outline-1 outline-neutral-800">
          <div className="flex justify-between bg-black text-white text-sm pl-2 p-1 ">
            <div className="flex">
                <IconTerminal2 className="w-5 mr-1"/>
              <>cmd.exe</>
            </div>
            <div className="flex gap-3">

            <IconMinus className="w-7 px-1"/>
            <IconSquare className="w-6 px-1"/>
            <IconX className="w-7 px-1"/>
            </div>
          </div>
          <Terminal />
        </div>
      </AuroraBackground>
    </div>
  );
}
