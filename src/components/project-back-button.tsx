import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function ProjectBackButton({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Back to projects"
      className={cn(
        "fixed left-4 top-4 z-50 inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white shadow-lg backdrop-blur transition hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:left-6 md:top-6",
        className
      )}
    >
      <ArrowLeft className="size-5" />
    </Link>
  );
}
