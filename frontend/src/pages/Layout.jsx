import { Menu, X } from 'lucide-react';
import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';
import Sidebar from '../components/Sidebar';

function Layout(){

  const navigate= useNavigate();
  const[sidebar,setsidebar]=useState(false);

  return (
    <div className='flex flex-col items-start justify-start h-screen'>
      
      <nav className='w-full flex justify-between items-center px-8 min-h-14 border-b border-gray-200'>
        <img src={assets.logo} alt="logo" className='w-32 sm:w-44 cursor-pointer' onClick={() => navigate("/")} />
        {
          sidebar? <X className='size-6 text-gray-600 sm:hidden' onClick={()=>setsidebar(false)}/>:
          <Menu className='size-6 text-gray-600 sm:hidden' onClick={()=>setsidebar(true)}/>
        }
      </nav>

      <div className='flex flex-1 w-full h-[calc(100vh-64px)]'>
        <Sidebar sidebar={sidebar} setsidebar={setsidebar} />
        <div className='flex-1 bg-[#F4F7FB]'>
          <Outlet />
        </div>
      </div>

    </div>
  )
}

export default Layout