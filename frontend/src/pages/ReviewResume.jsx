import { FileText, Sparkles } from 'lucide-react';
import React, { useState } from 'react'
import { ApiData } from '../context/contextApi';
import Markdown from 'react-markdown';


function ReviewResume() {

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { reviewresume, buttonLoading } = ApiData();
  const onsubmitHandler = async (e) => {
    e.preventDefault();
    reviewresume(input, setLoading, setContent);
  }


  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start gap-4 flex-wrap text-slate-700'>


      <form onSubmit={onsubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>

        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#00DA83]' />
          <h1 className='text-xl font-semibold'>Resume Review</h1>
        </div>

        <p className='mt-6 text-sm font-medium'>Upload Resume of maxsize: 5MB</p>
        <input type="file" accept='application/pdf' className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600' required onChange={(e) => setInput(e.target.files[0])} />

        <p className='text-sm text-gray-500 font-light mt-1'>Supports PDF resume only.</p>

        <button type='submit' className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00DA83] to-[#009BB3] text-white px-4 py-2 mt-8 text-sm rounded-lg cursor-pointer' disabled={buttonLoading}>
          {
            loading ? <span className='size-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
              : <FileText className='w-5' />
          }
          Resume Review
        </button>
      </form>


      <div className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex flex-col min-h-96 max-h-[600px]'>

        <div className='flex items-center gap-3'>
          <FileText className='size-5 text-[#00DA83]' />
          <h1 className='text-xl font-semibold'>Analysis Results</h1>
        </div>

        {!content ? (
          <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
              <FileText className='size-9' />
              <p>Upload a resume and click "Review Resume" to get started</p>
            </div>
          </div>

        ) : (
          <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600'>
            <div className='reset-tw'>
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}

      </div>

    </div >
  )
}

export default ReviewResume