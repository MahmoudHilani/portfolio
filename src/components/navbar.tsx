"use client";

import { FloatingDock } from "@/components/ui/floating-dock";
import { IconBrandGithub, IconBrandX, IconHome } from "@tabler/icons-react";
import { Linkedin } from "lucide-react";

const iconClassName = "h-full w-full text-neutral-500 dark:text-neutral-300";

const links = [
  {
    title: "Home",
    icon: <IconHome className={iconClassName} />,
    href: "/",
  },
  {
    title: "Twitter",
    icon: <IconBrandX className={iconClassName} />,
    href: "https://x.com/MahmoodHilani",
  },
  {
    title: "LinkedIn",
    icon: <Linkedin className={iconClassName} />,
    href: "https://www.linkedin.com/in/mahmoud-hilani/",
  },
  {
    title: "GitHub",
    icon: <IconBrandGithub className={iconClassName} />,
    href: "https://github.com/MahmoudHilani",
  },
];

export function Navbar() {
  return (
    <div className="flex z-50 justify-center items-center fixed bottom-4 inset-x-0">
      <FloatingDock items={links} />
    </div>
  );
}
