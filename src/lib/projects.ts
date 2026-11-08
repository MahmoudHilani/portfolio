export type Project = {
  title: string;
  year: number;
  href: string;
};

// Newest first. Each row links straight to the repo.
export const projects: Project[] = [
  {
    title: "RAG Assistant",
    year: 2026,
    href: "https://github.com/MahmoudHilani/agile-assignment",
  },
  {
    title: "Activities Club",
    year: 2026,
    href: "https://github.com/MahmoudHilani/activities-club",
  },
  {
    title: "Go Interpreter",
    year: 2024,
    href: "https://github.com/MahmoudHilani/GoInterpreter",
  },
  {
    title: "Cube Surfer",
    year: 2022,
    href: "https://github.com/MahmoudHilani/minimalistic-cube-surfer",
  },
];

export const papers: Project[] = [
  {
    title: "Agent Authorization Gateway",
    year: 2026,
    href: "/papers/erpnext-agent-authorization-gateway.pdf",
  },
  {
    title: "Chromosome Classification",
    year: 2026,
    href: "/papers/chromosome-classification.pdf",
  },
];
