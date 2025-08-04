// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "./components/LayoutWrapper";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title:       "TechSphere | Modern Electronics Store",
  description: "Your premier destination for cutting-edge electronics and gadgets",
  keywords:    "electronics, gadgets, tech, smartphones, laptops",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable}
          antialiased flex flex-col min-h-screen
          bg-white dark:bg-gray-900
        `}
      >
        {/* This wrapper will hide header/footer on /admin */}
        <LayoutWrapper>
          <main className="flex-grow container mx-auto px-4 py-8 md:px-6 md:py-12">
            {children}
          </main>
        </LayoutWrapper>
      </body>
    </html>
  );
}
