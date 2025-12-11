import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"
import Navbar from "@/components/Navbar";
import { Providers } from "./provider";
import { Toaster } from "react-hot-toast";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'One-GO | Effortless Content Management for Your Projects',
  description: 'A modern CMS that gives you instant APIs to power your websites, portfolios, and apps — without writing any backend.',
  keywords: ['CMS', 'Content Management', 'API', 'Portfolio', 'Next.js', 'Backend as a Service'],
  openGraph: {
    title: 'One-GO | Effortless Content Management',
    description: 'A modern CMS that gives you instant APIs to power your websites, portfolios, and apps — without writing any backend.',
    url: 'https://one-go-private.vercel.app',
    siteName: 'One-GO',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'One-GO | Effortless Content Management',
    description: 'A modern CMS that gives you instant APIs to power your websites, portfolios, and apps — without writing any backend.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white dark:bg-white dark:text-black`}
      >  <Providers>
          <Navbar />

          {children}
        </Providers>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
