import { CubeSurfer } from "@/components/spline/cube-surfer";
import { SurferParallax } from "@/components/surfer-parallax";
import { Button } from "@/components/ui/button";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { IconBrandGithub } from "@tabler/icons-react";
import { InfoIcon } from "lucide-react";
import Link from "next/link";

const images = [
  "/Game1.png",
  "/Game2.png",
  "/Game3.png",
  "/Game4.png",
  "/Game9.png",
  "/Game5.png",
  "/Game6.png",
  "/Game7.png",
  "/Game8.png",
];

export default function SurferPage() {
  return (
    <div className="md:px-12 xl:px-48 bg-zinc-900 ">
      <div className="flex flex-col justify-center items-center text-4xl sm:text-5xl lg:text-6xl pt-8 mb-24 text-gray-500 relative font-roboto">
        <div className="font-extrabold">CUBE SURFER</div>
        <div className="font-extralight text-[53px] sm:text-7xl lg:text-[88px] absolute top-15 sm:top-17 lg:top-19">
          EXTREME
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 my-12 px-12">
        <div className="lg:pr-8  sm:text-xl md:text-2xl">
          This Unity game was made for a university project where we met some of
          Huawei's dev team where they taught us the basics of game development.{" "}
          <br />
          <br /> The original idea was to create a copy of the known game "Cube
          Surfer". But i wanted to add my own twist to it.
          <br />
          <br /> I made it so you can go outside of the platform which allows
          for more creative gameplay. I also added different verticality to the
          game, allowing for multiple routes to complete the same level. <br /> <br />
          Finally, for the curious, some easter eggs were added, such as a new
          character skin.
        </div>
        <div className="relative aspect-square lg:aspect-auto xl:aspect-square">
          <CubeSurfer />
          <div className="flex w-full justify-center md:absolute md:justify-start bottom-0 text-xs md:text-base md:bottom-7 md:left-2 lg:bottom-0 lg:right-8 xl:bottom-7 xl:left-2 items-center gap-2">
            <InfoIcon  className="w-4 md:w-6" />
            The initial model for the character!
          </div>
        </div>
      </div>

      <ParallaxScroll images={images} className="px-12"/>
      <div className="px-12 pb-10 sm:pb-28 lg:pt-28 sm:text-2xl">
        The game was built using Unity. With free ready assets ready for use
        (Thank you open-source). The logic for the game was made using C#, with
        ad intergration on the HUAWEI App Gallery. <br /> For sound design, I
        just used a bunch of copyrighted sound effects and songs and I hope I
        won't get sued. Thank you for reading. You can look into the code in
        details on my{" "}
        <Link
          href={"https://github.com/MahmoudHilani/minimalistic-cube-surfer"}
          className="inline-flex items-center  text-blue-500 transition-all ease-in-out duration-150 hover:underline hover:text-blue-700 "
        >
          Github
          <IconBrandGithub className="ml-1 " width={18} />.
        </Link>
      </div>
      <div className="px-12 pb-32 text-xs sm:text-lg">
        P. S. This game was made in a big hurry and has many mistakes. I
        consider this a terrible piece of work.
      </div>
    </div>
  );
}
