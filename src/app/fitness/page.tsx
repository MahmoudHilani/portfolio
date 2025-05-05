import {
  ParallaxScroll,
  ParallaxScrollTwo,
} from "@/components/ui/parallax-scroll";
import Link from "next/link";
import { IconBrandGithub } from "@tabler/icons-react";

export default function FitnessApp() {
  const images = [
    "/fitness/1.png",
    "/fitness/2.png",
    "/fitness/3.png",
    "/fitness/4.png",
    "/fitness/5.png",
    "/fitness/6.png",
    "/fitness/7.png",
    "/fitness/8.png",
    "/fitness/9.png",
    "/fitness/10.png",
    "/fitness/11.png",
    "/fitness/12.png",
    "/fitness/13.png",
    "/fitness/14.png",
    "/fitness/15.png",
    // "/fitness/16.png",
  ];
  return (
    <div className="w-full h-full bg-zinc-900 ">
      <div className="flex w-full md:text-5xl lg:text-6xl justify-center p-8">Fitness App</div>
      <div className="text-2xl md:px-28 xl:px-48">
        An app built using React Native and deployed on Expo for testing. The
        app allows users to quickly and easily track their nutrition and
        exercise. The rings may or may not have been inspired by Apple's fitness
        rings. <br />
        <br /> This project was made as my graduation project, which took around
        a month, and development was done with my good friend{" "}
        <Link
          href={"https://github.com/XII-A"}
          className="inline-flex items-center text-blue-500 transition-all ease-in-out duration-150 hover:underline hover:text-blue-700 "
        >
          <IconBrandGithub />
          Abdulrazak.
        </Link>
        The focus of this project was practicality, allowing users to be able to
        easily and quickly log their fitness and nutrition to easily keep track
        of their needs for steady progress.
      </div>

      <ParallaxScroll images={images} className="hidden py-10 lg:flex md:px-28 xl:px-48" />
      <ParallaxScrollTwo
        images={images}
        className="hidden md:flex lg:hidden pt-10 pb-52 px-28"
      />
      <div className="text-2xl xl:py-10 md:px-28 xl:px-48">
        We also made a landing page as a form of marketing for the app. Although
        the design was a free template from figma. It was fully developed in
        Next.js with custom components and responsive design.
      </div>
      <img src="/fitness/dribbble.png" width={640} height={480} className="flex w-full justify-center pt-10 pb-24" />
    </div>
  );
}
