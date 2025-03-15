import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, BrainCog, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";


export default function Home() {
  return (
    <main className="relative w-full h-screen bg-radial from-maroon-700/50 via-maroon-900 to-maroon-900 font-inter">
      <Navbar />
      <div className="absolute w-full h-full hero-pattern"></div>
      
      <div className="absolute w-full min-h-[calc(100vh-80px)] flex flex-col justify-center items-center font-medium gap-3 mt-28 p-4">
        <div className="flex items-center text-white/90 md:gap-3 gap-2 bg-white/5 p-2 rounded-3xl backdrop-blur-xl shadow-lg">
          <Sparkles className="h-4 w-4" />
          <p className="text-xs md:text-sm">Revolutionizing Course Success Prediction</p>
          <ChevronRight className="h-4 w-4" />
        </div>
            <h1 className=" text-4xl md:text-6xl lg:text-7xl font-bold text-white/90 text-center ">Predict Your Course Success</h1>
            <p className="text-lg md:text-xl text-white/70 text-center px-8 md:w-3/4">Leverage AI-powered analytics to optimize enrollment strategies and maximize student engagement with our cutting-edge prediction platform</p>
        <div className="flex justify-center items-center gap-12 mt-4">
          <Button className="bg-white text-maroon-800 flex items-center hover:bg-white/80 cursor-pointer rounded-full scale-125 shadow-2xs "><Link href={"/"}>Get Started</Link> <ArrowRight/> </Button>
          <Button className="bg-white/10 text-white/90 hover:bg-white/20 flex items-center cursor-pointer rounded-full scale-125 backdrop-blur-xs shadow-2xs">
            <Link href={"/"}>Learn More</Link>
            <BrainCog/>
          </Button>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-16 px-8 mt-12 select-none">
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
