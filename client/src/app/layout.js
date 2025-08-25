// client/src/app/layout.js

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { AuthProvider } from "@/context/AuthContext";
import TransitionProvider from "@/components/TransitionProvider"; // 1. Import the new provider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Wellness Spa",
  description: "Your personal retreat for wellness and relaxation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Navbar />
          <TransitionProvider>{children}</TransitionProvider> {/* 2. Wrap children with the provider */}
        </AuthProvider>
      </body>
    </html>
  );
}
