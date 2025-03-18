import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";



export const metadata: Metadata = {
  title: "AcademiTrend",
  description: "Revelutionizing Course Success Prediction",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased text-gray-900 bg-white dark:bg-gray-900 dark:text-white`}
      >
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
