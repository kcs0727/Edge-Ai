import { useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react'
import { Heart } from 'lucide-react';
import { ApiData } from '../context/contextApi';



function Community(){

  const [creations, setCreations]= useState([]);
  const {user}=useUser();
  const [loading, setLoading]= useState(true);

  
  const {fetchcreations, tooglelikes} = ApiData();

  useEffect(()=>{
    if(user){
      fetchcreations(setCreations,setLoading);
    } 
  },[user])

  const tooglelikesHandler= async(id)=>{
    tooglelikes(id, user.id, setCreations);
  }


  return !loading?(
    <div className='flex-1 h-full flex flex-col gap-4 p-6'>

      <h1 className='text-xl font-semibold text-slate-700'>Creations</h1>

      <div className='bg-white h-full w-full rounded-xl overflow-y-scroll'>
        {
          creations.map((creation,idx)=>(
            <div key={idx} className='relative group inline-block pl-3 pt-3  max-w-1/2 lg:max-w-1/3 xl:max-w-1/4'>

              <img src={creation.content} alt="" className='w-full h-full object-cover rounded-lg'/>

              <div className='absolute bottom-0 top-0 right-0 left-3 flex gap-2 items-end justify-end p-3 group-hover:justify-between group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg'>
                <p className='text-sm hidden group-hover:block'>{creation.prompt}</p>
                <div className='flex gap-1 items-center'>
                  <p>{creation.likes.length}</p>
                  <Heart className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${creation.likes.includes(user.id) ? 'fill-red-500 text-red-600':'text-white'}`} onClick={()=>tooglelikesHandler(creation.id)}/>
                </div>
              </div>

            </div>
          ))
        }
      </div>
    </div>
  ):
  (
    <div className='flex justify-center items-center h-full'>
      <span className='size-10 my-1 rounded-full border-3 border-t-transparent animate-spin'></span>
    </div>
  )
}

export default Community