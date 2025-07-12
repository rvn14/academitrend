import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/Footer";
import Chatbot from "@/components/ChatBot";



export const metadata: Metadata = {
  title: "AcademiTrend",
  description: "Revelutionizing Course Success Prediction",
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body
        className={`antialiased bg-maroon-900`}
      >
        
        
          {children}
          <Chatbot />
          <Footer />
        
        <Toaster />
      </body>
    </html>
  );
}