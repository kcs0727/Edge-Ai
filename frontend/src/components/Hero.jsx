import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';
import { useClerk, useUser } from '@clerk/clerk-react';

function Hero() {
    const navigate = useNavigate();
    const {user}= useUser();
    const {openSignIn}= useClerk();

    return (
        <div className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full min-h-screen justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat'>

            <div className='text-center mt-15 mb-6'>
                <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]'>Create amazing content <br />with <span className='text-primary'>AI tools</span> </h1>

                <p className='mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm-text-xs text-gray-600'>Transform your content creation with our suite of premium AI tools. Write articles, generate images, and enhance your workflow.</p>
            </div>

            <div className='flex flex-wrap justify-center gap-4 text-xs sm:text-sm mb-8'>
                <button className='rounded-lg bg-primary text-white px-8 py-3 hover:scale-102 active:scale-95 transition cursor-pointer' onClick={user? () =>navigate("/ai"): openSignIn} >Start creating now</button>
                <button className='rounded-lg bg-white text-black px-8 py-3 hover:scale-102 active:scale-95 transition cursor-pointer '>watch-demo</button>
            </div>

            <div className='flex justify-center items-center gap-4 text-gray-600'>
                <img src={assets.user_group} alt="" className='h-8' /> Trusted by 10k+ people
            </div>

        </div>
    )
}

export default Hero