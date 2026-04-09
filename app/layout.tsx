import type { Metadata } from "next";
import { Geom } from "next/font/google";
import Header from "./components/Header";
import Preloader from "./components/Preloader";
import "./globals.css";

const geom = Geom({
  subsets: ["latin", "greek"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el" className={`${geom.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Preloader />
        <Header />
        {children}
      </body>
    </html>
  );
}
