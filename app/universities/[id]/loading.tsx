import React from 'react'
import Loader from '@/components/Loader'

const loading = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-maroon-700/40'>
      <Loader />
    </div>
  )
}

export default loading