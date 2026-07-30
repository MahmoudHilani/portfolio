import type { Metadata } from "next";
import { Geist_Mono, Roboto } from "next/font/google";
import localFont from "next/font/local";
import "@fontsource/instrument-serif";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Suspense } from "react";
import Loading from "./loading";
import { Toaster } from "sonner";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mahmoudhilani.com"),
  title: {
    default: "Mahmoud Hilani — Software Engineer",
    template: "%s | Mahmoud Hilani",
  },
  description:
    "Portfolio of Mahmoud Hilani, a Dublin-based software engineer building web products, developer tools, mobile apps, and games.",
  keywords: [
    "Mahmoud Hilani",
    "software engineer",
    "web developer",
    "Dublin",
    "Next.js developer",
    "React developer",
    "portfolio",
  ],
  authors: [{ name: "Mahmoud Hilani", url: "/" }],
  creator: "Mahmoud Hilani",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "/",
    siteName: "Mahmoud Hilani",
    title: "Mahmoud Hilani — Software Engineer",
    description:
      "Dublin-based software engineer building web products, developer tools, mobile apps, and games.",
    images: [
      {
        url: "/portrait-hero-wide.png",
        alt: "Mahmoud Hilani",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahmoud Hilani — Software Engineer",
    description:
      "Dublin-based software engineer building web products, developer tools, mobile apps, and games.",
    images: ["/portrait-hero-wide.png"],
    creator: "@MahmoodHilani",
  },
  icons: {
    icon: "/icon.svg",
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mahmoud Hilani",
              url: "https://mahmoudhilani.com",
              image: "https://mahmoudhilani.com/portrait-hero-wide.png",
              jobTitle: "Software Engineer",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Dublin",
                addressCountry: "IE",
              },
              sameAs: [
                "https://github.com/MahmoudHilani",
                "https://www.linkedin.com/in/mahmoud-hilani/",
                "https://x.com/MahmoodHilani",
              ],
            }).replace(/</g, "\\u003c"),
          }}
        />
        <div>
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <Navbar />
          <Toaster />
        </div>
      </body>
    </html>
  );
}
