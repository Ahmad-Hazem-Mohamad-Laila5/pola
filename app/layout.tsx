import type { Metadata } from "next";
import { Geist, Geist_Mono, Luxurious_Roman } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar/Navbar";
import Providers from "./providers";
import Footer from "./Components/Footer.tsx/Footer";

const luxurious = Luxurious_Roman({
  weight: ["400"],
  variable: "--font-luxurious",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ploa",
  description: "Pola Fashion E-commerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${luxurious.variable}`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Navbar />
          {children}
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}
