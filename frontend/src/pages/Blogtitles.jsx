import { Hash, Sparkles } from 'lucide-react';
import React, { useState } from 'react'
import { ApiData } from '../context/contextApi';
import Markdown from 'react-markdown';


function Blogtitles() {

  const blogCategories = [
    'General', 'Technology', 'Business', 'Health', 'Lifestyle', 'Education', 'Travel', 'Food'
  ]

  const [selectedCategory, setSelectedCategory] = useState('General');
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");


  const { blogtitles, buttonLoading } = ApiData();
  const onsubmitHandler = async (e) => {
    e.preventDefault();
    blogtitles(input, selectedCategory, setLoading, setContent);
  }

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start gap-4 flex-wrap text-slate-700'>


      <form onSubmit={onsubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>

        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#8E37EB]' />
          <h1 className='text-xl font-semibold'>AI Title Generator</h1>
        </div>

        <p className='mt-6 text-sm font-medium'>Keyword</p>
        <input type="text" className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' placeholder='Know more about artificial intelligence..' required onChange={(e) => setInput(e.target.value)} value={input} />

        <p className='mt-4 text-sm font-medium'>Category</p>
        <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
          {blogCategories.map((item, idx) => (
            <span key={idx} className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedCategory === item ? 'bg-purple-50 text-purple-700' : 'text-gray-500 border-gray-300'}`} onClick={() => setSelectedCategory(item)}>{item}</span>
          ))}
        </div>

        <button type='submit' className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341f6] to-[#8E37EB] text-white px-4 py-2 mt-8 text-sm rounded-lg cursor-pointer' disabled={buttonLoading}>
          {
            loading ? <span className='size-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
              : <Hash className='w-5' />
          }
          Generate title
        </button>
      </form>


      <div className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex flex-col min-h-96'>

        <div className='flex items-center gap-3'>
          <Hash className='size-5 text-[#8E37EB]' />
          <h1 className='text-xl font-semibold'>Generated titles</h1>
        </div>

        {!content ? (
          <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
              <Hash className='size-9' />
              <p>Enter a topic and click “Generate title” to get started</p>
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

    </div>
  )
}

export default Blogtitles