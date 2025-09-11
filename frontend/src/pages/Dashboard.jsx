import { Protect } from '@clerk/clerk-react';
import { Gem, Sparkles } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import Creationitem from '../components/Creationitem';
import { ApiData } from '../context/contextApi';

function Dashboard() {

  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);

  const { getdashboarddata } = ApiData();

  useEffect(() => {
    getdashboarddata(setCreations, setLoading);
  }, [])


  return (
    <div className='h-full overflow-y-scroll p-6'>

      <div className='flex justify-start gap-4 flex-wrap'>

        <div className='flex justify-between items-center w-72 py-4 px-6 bg-white rounded-xl border border-gray-200'>
          <div className='text-slate-600'>
            <p className='text-sm'>Total Creations</p>
            <h2 className='text-xl font-semibold'>{creations.length}</h2>
          </div>
          <div className='size-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center'>
            <Sparkles className='w-5' />
          </div>
        </div>

        <div className='flex justify-between items-center w-72 py-4 px-6 bg-white rounded-xl border border-gray-200'>
          <div className='text-slate-600'>
            <p className='text-sm'>Active Plan</p>
            <h2 className='text-xl font-semibold'>
              <Protect plan="premium" fallback="Free">Premium</Protect>
            </h2>
          </div>
          <div className='size-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center'>
            <Gem className='w-5' />
          </div>
        </div>

      </div>

      {loading ? (
        <div className='flex justify-center items-center h-3/4'>
          <span className='size-10 rounded-full border-3 border-purple-500 border-t-transparent animate-spin'></span>
        </div>

      ) : (
        <div className='space-y-3'>
          <p className='mt-6 mb-4'>Recent Creations</p>
          {
            creations.map((item) => (
              <Creationitem key={item.id} item={item} />
            ))
          }
        </div>
      )}

    </div>
  )
}

export default Dashboard