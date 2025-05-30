import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"
import AuthProvider from "../context/AuthProvider";

import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "Bubble Messenger",
  description: "Speak Freely - Emphasizes honest communication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>


      <div>
        <Analytics />
        <Navbar />
        {children}
        <Footer />

      </div>


    </>
  );
}
