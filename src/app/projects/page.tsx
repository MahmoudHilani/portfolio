import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
} from "@/components/ui/glowing-stars";
import Link from "next/link";

export default function ProjectsPage() {
  // Sample project data
  const projects = [
    {
      title: "Go Interpreter",
      description:
        "A Go interpreter built from scratch. Click here to try it out.",
        href: "/interpreter"
    },
    {
      title: "Cube Surfer",
      description:
        "A casual mobile game with integrated ads.",
      href: "https://github.com/MahmoudHilani/minimalistic-cube-surfer"
    },
    {
      title: "Fitness App",
      description:
        "An app made for easily tracking your nutrition and fitness goals.",
        href: "https://github.com/XII-A/Fitness-App"
    },
  ];

  return (
    <main className="container flex flex-col mx-auto justify-between h-screen px-4">
      <h1 className="text-4xl font-bold p-16 text-white text-center">My Projects</h1>

      {/* Custom implementation with project data */}
      <section className="flex justify-center pb-56">
        <div className="flex gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Link href={`${project.href}`} key={index} className="h-full">
            <GlowingStarsBackgroundCard key={index} className="h-full mx-auto">
              <GlowingStarsTitle>{project.title}</GlowingStarsTitle>
              <div className="flex justify-between items-end mt-4">
                <GlowingStarsDescription>
                  {project.description}
                </GlowingStarsDescription>
                <div className="h-8 w-8 rounded-full bg-[hsla(0,0%,100%,.1)] flex items-center justify-center">
                  <ArrowIcon />
                </div>
              </div>
            </GlowingStarsBackgroundCard>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

const ArrowIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-4 w-4 text-white stroke-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
      />
    </svg>
  );
};
