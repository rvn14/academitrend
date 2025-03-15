import { BrainCircuit } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='fixed bg-white/80 backdrop-blur-sm w-full h-20 flex items-center justify-between z-40 px-12'>
        <div className='flex items-center gap-3'>
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-8 w-8 text-maroon-700" />
              <span className="text-xl font-bold text-gray-900">EduPredict</span>
            </div>
        </div>
        <div>
        <Button asChild className='bg-maroon-700 text-white'>
            <Link href="/login">Login</Link>
        </Button>
        </div>
    </div>
  )
}

export default Navbar