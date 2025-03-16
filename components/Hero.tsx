"use client"
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ArrowRight, BrainCog, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";








export default function Hero() {
  
  useEffect(() => {
    gsap.fromTo(".floating", {y: 50, opacity: 0}, {y: 0, duration: 1,opacity: 1, stagger: 0.1, ease: "power4.out"})
    
  }, [])
  
  

  return (
    <main className="relative w-full min-h-screen bg-radial from-maroon-800/90 via-maroon-900 to-maroon-900 font-inter">
      <Navbar />
      <div className="absolute w-full min-h-screen hero-pattern"></div>
      
      <div className="w-full min-h-[calc(100vh-112px)] flex flex-col justify-center items-center font-medium gap-3 pt-28 px-4">
        <div className="floating flex items-center text-white/90 md:gap-3 gap-2 bg-white/5 p-2 rounded-3xl backdrop-blur-xl shadow-lg cursor-pointer select-none">
          <Sparkles className="h-4 w-4" />
          <p className="text-xs md:text-sm">Revolutionizing Course Success Prediction</p>
          <ChevronRight className="h-4 w-4" />
        </div>
            <h1 className="floating text-4xl md:text-6xl lg:text-7xl font-bold text-white/90 text-center ">Predict Your Course Success</h1>
            <p className="floating text-lg md:text-xl text-white/70 text-center px-8 md:w-3/4">Leverage AI-powered analytics to optimize enrollment strategies and maximize student engagement with our cutting-edge prediction platform</p>
        <div className="floating flex justify-center items-center gap-12 mt-4">
          <Button className="bg-white text-maroon-800 flex items-center hover:bg-white/80 cursor-pointer rounded-full scale-125 shadow-2xs "><Link href={"/predict"}>Get Started</Link> <ArrowRight/> </Button>
          <Button className="bg-white/10 text-white/90 hover:bg-white/20 flex items-center cursor-pointer rounded-full scale-125 backdrop-blur-xs shadow-2xs">
            <Link href={"/"}>Learn More</Link>
            <BrainCog/>
          </Button>

        </div>

        <div className="floating grid grid-cols-2 md:grid-cols-4 gap-4 pb-8 px-8 mt-12 select-none">
              <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-6 text-center transform hover:scale-105 transition-all shadow-md">
                <div className="text-3xl font-bold text-white mb-1">15K+</div>
                <div className="text-white/80">Active Students</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-6 text-center transform hover:scale-105 transition-all shadow-md">
                <div className="text-3xl font-bold text-white mb-1">95%</div>
                <div className="text-white/80">Prediction Accuracy</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-6 text-center transform hover:scale-105 transition-all shadow-md">
                <div className="text-3xl font-bold text-white mb-1">200+</div>
                <div className="text-white/80">Institutions</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-6 text-center transform hover:scale-105 transition-all shadow-md">
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-white/80">Real-time Analytics</div>
              </div>
          </div>
          
      </div>
      
    </main>
  );
}


