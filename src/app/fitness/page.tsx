import { ParallaxScroll } from "@/components/ui/parallax-scroll";

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
    ]
  return (
    <div className="w-full h-full bg-zinc-900">
      <div className="flex w-full text-6xl justify-center p-8">Fitness App</div>
      <div className="text-2xl px-48">
        An app built using React Native and deployed on Expo for testing. The
        app allows users to quickly and easily track their nutrition and
        exercise. The rings may or may not have been inspired by Apple's fitness
        rings.
      </div>

      <ParallaxScroll images={images} width={500} height={400} imageClassName="md:hidden lg:flex scale-110 "/>

    </div>
  );
}
