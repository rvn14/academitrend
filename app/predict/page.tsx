import { Mychart } from '@/components/MyChart'
import React from 'react'

const page = () => {
  return (
    <div className='w-full min-h-screen bg-white flex items-center justify-center flex-col font-poppins'>
      <div className='w-4/5 h-fit'>

      <Mychart />
      </div>
    </div>
  )
}

export default page