import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Suspense } from "react";
import Loading from "./loading";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://mahmoudhilani.com"),
  title: {
    default: "Mahmoud's portfolio",
    template: "%s | Mahmoud Hilani",
  },
  description:
    "I dithered my own face instead of writing a bio.",
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
    title: "Mahmoud's portfolio",
    description:
      "I dithered my own face instead of writing a bio.",
    images: [
      {
        url: "/portrait-hero-wide.png",
        alt: "Mahmoud Hilani",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahmoud's portfolio",
    description:
      "I dithered my own face instead of writing a bio.",
    images: ["/portrait-hero-wide.png"],
    creator: "@MahmoodHilani",
  },
  icons: {
    icon: "/icon.svg",
  },
};

// Tint the browser chrome (the status bar around the notch) to match the hero,
// and let the page draw beneath Safari's floating toolbar.
export const viewport: Viewport = {
  themeColor: "#11110f",
  viewportFit: "cover",
};

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-bricolage",
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
      className={`dark scrollbar-none ${bricolage.variable} ${bricolage.className}`}
    >
      <body>
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
