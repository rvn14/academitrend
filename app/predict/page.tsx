import { Linechart } from '@/components/Linechart'
import { Linechartrnd } from '@/components/Linechartrnd'

import React from 'react'

const page = () => {
  return (
    <div className='w-full min-h-screen bg-white flex flex-col items-center justify-center font-poppins'>
        <div className='w-4/5 grid grid-cols-1 gap-4 mt-30 p-24'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className='w-full '>
              <div className='w-full h-full shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl border-none'></div>
            </div>
            <div className='w-full'>
              <Linechart />
            </div>
          </div>
          <div className='w-full'>
            <Linechartrnd />
          </div>
        </div>
    </div>
  )
}

export default page