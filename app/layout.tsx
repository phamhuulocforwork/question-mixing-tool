import type { Metadata } from "next";

import { Inter } from "next/font/google";

import "@/style/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Question Mixing Tool",
  description: "A tool for mixing questions from a pre-existing question bank",
  keywords: [
    "Question Mixing Tool",
    "Quiz Generator",
    "Education Technology",
    "Learning Platform",
    "Assessment Tool",
    "Question Bank",
  ],
  openGraph: {
    type: "website",
    siteName: "Question Mixing Tool",
    locale: "en_US",
    url: "https://phamhuulocforwork.vercel.app",
    title: "Question Mixing Tool",
    description:
      "A tool for mixing questions from a pre-existing question bank",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Question Mixing Tool Preview",
      },
    ],
  },
  authors: [
    {
      name: "Pham Huu Loc",
      url: "https://github.com/phamhuulocforwork",
    },
  ],
  creator: "Pham Huu Loc",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/favicon-32x32.png",
      sizes: "32x32",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/favicon-16x16.png",
      sizes: "16x16",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/android-chrome-192x192.png",
      sizes: "192x192",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/android-chrome-512x512.png",
      sizes: "512x512",
    },
  ],
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
