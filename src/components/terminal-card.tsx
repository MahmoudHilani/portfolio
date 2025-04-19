import React from "react";
import { EvervaultCard, Icon } from "./ui/evervault-card";

export function TerminalCard() {
  return (
    <div className="border border-black/[0.2] dark:border-white/[0.2] dark:text-white text-black flex items-start aspect-auto w-4xl h-96 mx-auto relative cursor-pointer">
      <Icon className="absolute z-20 h-6 w-6 -top-3 -left-3 " />
      <Icon className="absolute z-20 h-6 w-6 -bottom-3 -left-3" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3" />
      
      <EvervaultCard />
    </div>
  );
}
