import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';
import { ArrowRight } from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

function Navbar() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className='px-4 sm:px-20 xl:px-32 py-3 fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center'>

      <img src={assets.logo} alt="logo" className='w-32 sm:w-44 cursor-pointer' onClick={() => navigate("/")} />

      {
        user ? <UserButton /> :
          <button className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-8 py-2' onClick={openSignIn}>Get Started <ArrowRight className='size-4'/></button>
      }

    </div>
  )
}

export default Navbar