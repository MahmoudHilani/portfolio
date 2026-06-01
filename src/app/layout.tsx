import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Suspense } from "react";
import Loading from "./loading";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mahmoud's Portfolio",
  description:
    "Here you can find Mahmoud Hilani's experience, projects, and plans.",
};

const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-Variable.woff2", style: "normal" },
    { path: "./fonts/Satoshi-VariableItalic.woff2", style: "italic" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${roboto.variable} ${geistMono.variable} ${satoshi.className}`}
    >
      <body className="scrollbar-none">
        <div>
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <Navbar />
          <Toaster />
        </div>
      </body>
    </html>
  );
}
