export type Project = {
  title: string;
  stack: string;
  year: number;
  href: string;
};

// Newest first. Each row links straight to the repo.
export const projects: Project[] = [
  {
    title: "RAG Assistant",
    stack: "Python · FastAPI",
    year: 2026,
    href: "https://github.com/MahmoudHilani/agile-assignment",
  },
  {
    title: "Activities Club",
    stack: "Spring Boot · Vue",
    year: 2026,
    href: "https://github.com/MahmoudHilani/activities-club",
  },
  {
    title: "Go Interpreter",
    stack: "Go",
    year: 2024,
    href: "https://github.com/MahmoudHilani/GoInterpreter",
  },
  {
    title: "Cube Surfer",
    stack: "C# · Unity",
    year: 2022,
    href: "https://github.com/MahmoudHilani/minimalistic-cube-surfer",
  },
];
