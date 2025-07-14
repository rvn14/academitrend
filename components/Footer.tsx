import { BrainCircuit } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white font-inter">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-maroon-700 rounded-lg flex items-center justify-center">
            <BrainCircuit className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">ACADEMITREND</span>
        </div>
        
        <nav className="hidden md:flex flex-wrap gap-6 text-sm">
          <Link href="/" className="text-maroon-700 hover:text-maroon-800 font-medium">Home</Link>
          <Link href="/universities" className="text-gray-600 hover:text-maroon-700">Universities</Link>
          <Link href="/programs" className="text-gray-600 hover:text-maroon-700">Programs</Link>
          <Link href="/trends" className="text-gray-600 hover:text-maroon-700">Trends</Link>
          <Link href="/about" className="text-gray-600 hover:text-maroon-700">About</Link>
        </nav>
        
        <div className="text-xs text-gray-400 text-center md:text-right">
          &copy; {new Date().getFullYear()} Academitrend. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
