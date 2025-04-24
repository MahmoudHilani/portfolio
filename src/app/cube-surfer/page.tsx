import { CubeSurfer } from "@/components/spline/cube-surfer";
import { SurferParallax } from "@/components/surfer-parallax";

export default function SurferPage() {
  return (
    <div className="w-full h-full px-48">
      <div className="flex justify-center items-center text-8xl my-8">
        Cube Surfer Extreme
      </div>
      <div className="grid grid-cols-2">
        <div className="pr-8 text-2xl">
          This Unity game was made for a university project where we met some of
          Huawei's dev team where they taught us the basics of game development.{" "}
          <br />
          <br /> The original idea was to create a copy of the known game "Cube
          Surfer". But i wanted to add my own twist to it.
          <br />
          <br /> I made it so you can go outside of the platform which allows for
          more creative gameplay. I also added different verticality to the
          game, allowing for multiple routes to complete the same level.{" "}
        </div>
        <div className="w-lg aspect-square">
          <CubeSurfer />
        </div>
      </div>
      <div></div>
      <SurferParallax />
    </div>
  );
}
