import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LinkedIn Summary Generator",
  description: "Generate a professional LinkedIn summary with AI",
  openGraph: {
    title: "LinkedIn Summary Generator",
    description: "Create your standout LinkedIn profile with AI-powered summaries - instantly and free.",
    url: "https://www.linkedinsummary.com/",
    siteName: "LinkedIn Summary Generator",
    images: [
      {
        url: "/og-image.png", // Path relativo all'immagine nella cartella public
        width: 1200,
        height: 630,
        alt: "LinkedIn Summary Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkedIn Summary Generator",
    description: "Create your standout LinkedIn profile with AI-powered summaries - instantly and free.",
    images: ["/og-image.png"], // Path relativo all'immagine nella cartella public
  },
  authors: [{ name: "Guido Frascadore", url: "https://www.guidofrascadore.it" }],
  publisher: "Guido Frascadore",
  creator: "Guido Frascadore",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
