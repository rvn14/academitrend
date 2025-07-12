import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-maroon-100 to-maroon-200 font-inter">
      <div className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center max-w-md w-full">
        {/* Illustration */}
        <div className="mb-6">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="40" fill="#80000022" />
            <path d="M25 55L55 25" stroke="#800000" strokeWidth="4" strokeLinecap="round"/>
            <path d="M55 55L25 25" stroke="#800000" strokeWidth="4" strokeLinecap="round"/>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-4 text-center">
          🚧 This page is still under construction.<br />
          
        </p>
        <Link href="/" className="bg-maroon-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-maroon-800 transition-colors">
          Go to Homepage
        </Link>
      </div>
    </main>
  );
}
