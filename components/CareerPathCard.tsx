import { ArrowRight, LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface CareerPathCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
  programCount: string;
  href: string; // The destination URL (e.g., `/career/engineering`)
}

export default function CareerPathCard({ 
  icon: Icon, 
  title, 
  description, 
  tags, 
  programCount, 
  href 
}: CareerPathCardProps) {
  return (
    <Link href={href} className="block h-full">
      <div 
        className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-maroon-200 transition-all duration-300 cursor-pointer h-full flex flex-col"
      >
        <div className="w-14 h-14 bg-maroon-100 rounded-xl flex items-center justify-center mb-5 group-hover:bg-maroon-200 transition-colors shadow-sm">
          <Icon className="h-7 w-7 text-maroon-700 group-hover:text-maroon-800 transition-colors" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">{title}</h3>
        <p className="text-gray-600 mb-5 text-sm leading-relaxed flex-grow">{description}</p>
        <div className="flex flex-wrap items-center gap-2 mb-5">
          {tags.map((tag, index) => (
            <span key={index} className="bg-maroon-50 text-maroon-700 px-3 py-1 rounded-full text-xs font-medium shadow-sm border border-maroon-100">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-2 mt-auto">
          <span className="text-sm text-gray-500 font-semibold">{programCount}</span>
          <ArrowRight className="h-5 w-5 text-maroon-600 group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
