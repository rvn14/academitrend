"use client"
import { BrainCircuit } from 'lucide-react';
import { useEffect, useState } from "react";

const Preloader = () => {
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the document is already loaded
    if (document.readyState === "complete") {
      setLoading(false);
      return;
    }
    // Otherwise, wait for the window load event
    const handleLoad = () => setLoading(false);
    window.addEventListener("load", handleLoad);

    // Cleanup the event listener when the component unmounts
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  if (!loading){
    return null;
  }else{

      return (
        <div className="fixed w-full h-screen inset-0 hero-gradient preloader z-50">
          <div className="absolute inset-0 hero-pattern"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Expanding circles */}
              
              
              {/* Logo */}
              <div className="relative flex items-center gap-4 preloader-logo opacity-0">
                <BrainCircuit className="h-16 w-16 text-white" />
                <div>
                  <h1 className="text-3xl font-bold text-white">AcademiTrends</h1>
                  <p className="text-white/80">AI-Powered Learning</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }

};

export default Preloader;