import { Eraser, Sparkles } from 'lucide-react';
import React, { useState } from 'react'
import { ApiData } from '../context/contextApi';

function Removebg() {

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { removebg, buttonLoading } = ApiData();
  const onsubmitHandler = async (e) => {
    e.preventDefault();
    removebg(input, setLoading, setContent);
  }

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start gap-4 flex-wrap text-slate-700'>


      <form onSubmit={onsubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>

        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#FF4938]' />
          <h1 className='text-xl font-semibold'>Background Removal</h1>
        </div>

        <p className='mt-6 text-sm font-medium'>Upload image</p>
        <input type="file" accept='image/*' className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600' required onChange={(e) => setInput(e.target.files[0])} />

        <p className='text-sm text-gray-500 font-light mt-1'>Supports JPG, PNG, and other image format</p>

        <button type='submit' className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white px-4 py-2 mt-8 text-sm rounded-lg cursor-pointer' disabled={buttonLoading}>
          {
            loading ? <span className='size-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
              : <Eraser className='w-5' />
          }
          Remove background
        </button>
      </form>


      <div className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex flex-col min-h-96'>

        <div className='flex items-center gap-3'>
          <Eraser className='size-5 text-[#FF4938]' />
          <h1 className='text-xl font-semibold'>Processed Image</h1>
        </div>

        {!content ? (
          <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
              <Eraser className='size-9' />
              <p>Upload an image and click "Remove Background" to get started</p>
            </div>
          </div>

        ) : (
          <div className='mt-3 h-full'>
            <img src={content} alt="image" className='w-full h-full'/>
          </div>
        )}

      </div>

    </div>
  )
}

export default Removebg;