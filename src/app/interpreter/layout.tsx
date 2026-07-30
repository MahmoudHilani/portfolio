import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Go Interpreter",
  description:
    "An interactive tree-walk interpreter built from scratch, with a browser guide to lexing, parsing, environments, and evaluation.",
  alternates: { canonical: "/interpreter" },
  openGraph: {
    url: "/interpreter",
    title: "Go Interpreter | Mahmoud Hilani",
    description:
      "Explore a tree-walk interpreter and learn how lexing, parsing, environments, and evaluation work.",
    images: [{ url: "/Terminal.png", alt: "Interactive Go interpreter terminal" }],
  },
};

export default function InterpreterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
