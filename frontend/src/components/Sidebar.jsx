import { Protect, useClerk, useUser } from '@clerk/clerk-react'
import { Eraser, FileText, Hash, House, Image, LogOut, Scissors, SquarePen, Users } from 'lucide-react';
import React from 'react'
import { NavLink } from 'react-router-dom';

const navItems=[
    {to: '/ai', label: "Dashboard", icon: House},
    {to: '/ai/write-article', label: "Write Article", icon: SquarePen},
    {to: '/ai/blog-titles', label: "Blog Titles", icon: Hash},
    {to: '/ai/generate-image', label: "Generate Image", icon: Image},
    {to: '/ai/remove-background', label: "Remove Background", icon: Eraser},
    {to: '/ai/remove-object', label: "Remove Object", icon: Scissors},
    {to: '/ai/review-resume', label: "Review Resume", icon: FileText},
    {to: '/ai/community', label: "Community", icon: Users},
]

function Sidebar({sidebar, setsidebar}) {

    const {user}= useUser();
    const {signOut, openUserProfile}= useClerk();

    return (
        <div className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center ${sidebar?'translate-x-0': 'max-sm:-translate-x-full'} max-sm:absolute top-14 bottom-0 transition-all duration-300 ease-in-out z-10`}>

            <div className='my-7 w-full'>
                <img src={user.imageUrl} alt="Avatar" className='w-13 rounded-full mx-auto' />
                <h1 className='mt-1 text-center'>{user.fullName}</h1>

                <div className='px-6 mt-5 text-sm text-gray-600 font-medium'>
                    {navItems.map((item,idx)=>(
                        <NavLink key={idx} to={item.to} end={item.to==='/ai'}  className={({isActive})=>`px-3.5 py-2.5 flex items-center gap-3 rounded ${isActive? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white':''}`} onClick={()=>setsidebar(false)}>
                             
                                <item.icon className='size-4'/>
                                <p>{item.label}</p>
                        </NavLink>
                    ))}
                </div>
            </div>


            <div className='w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between'>

                    <div onClick={openUserProfile} className='flex gap-2 items-center cursor-pointer'>
                        <img src={user.imageUrl} alt="" className='w-8 rounded-full'/>
                        <div>
                            <h1 className='text-sm font-medium'>{user.fullName}</h1>
                            <p className='text-xs text-gray-500'>
                                <Protect plan='premium' fallback='Free'>Premium</Protect> Plan
                            </p>
                        </div>
                    </div>
                    <LogOut onClick={signOut} className='w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer'/>
            </div>

        </div>
    )
}

export default Sidebar