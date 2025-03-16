"use client"
import { BrainCircuit } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'


const Navbar = () => {

  return (
    <div className='fixed bg-white/80 backdrop-blur-sm w-full h-20 flex items-center justify-between z-40 px-4 md:px-12 shadow-2xs font-poppins'>
        <div className='navItems flex items-center gap-3'>
            <Link href={"/"} className="flex items-center gap-2">
              <BrainCircuit className="h-8 w-8 text-maroon-700" />
              <span className="text-xl font-bold text-gray-900">AcademiTrend</span>
            </Link>
        </div>
        <div className='navItems'>
        <Button asChild className="bg-maroon-700 text-white">
            <Link href="/login">Login</Link>
        </Button>
        </div>
    </div>
  )
}

export default Navbar