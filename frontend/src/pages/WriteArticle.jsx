import { Edit, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import { ApiData } from '../context/contextApi';
import Markdown from 'react-markdown';

function WriteArticle() {

  const articelLength = [
    { length: 800, text: 'Short (500-800 words)' },
    { length: 1200, text: 'Medium (800-1200 words)' },
    { length: 1600, text: 'Long (1200+ words)' }
  ]

  const [selectedLen, setSelectedLen] = useState(articelLength[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");


  const { writearticle, buttonLoading} = ApiData();
  const onsubmitHandler = async (e) => {
    e.preventDefault();
    writearticle(input, selectedLen, setLoading, setContent);
  }


  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start gap-4 flex-wrap text-slate-700'>


      <form onSubmit={onsubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>

        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Article Configuration</h1>
        </div>

        <p className='mt-6 text-sm font-medium'>Article Topic</p>
        <input type="text" className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' placeholder='Know more about artificial intelligence..' required onChange={(e) => setInput(e.target.value)} value={input} />

        <p className='mt-4 text-sm font-medium'>Article Length</p>
        <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
          {articelLength.map((item, idx) => (
            <span key={idx} className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedLen.text === item.text ? 'bg-blue-50 text-blue-700' : 'text-gray-500 border-gray-300'}`} onClick={() => setSelectedLen(item)}>{item.text}</span>
          ))}
        </div>

        <button type='submit' className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-8 text-sm rounded-lg cursor-pointer' disabled={buttonLoading}>
          {
            loading ? <span className='size-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
              : <Edit className='w-5' />
          }
          Generate article
        </button>
      </form>


      <div className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 flex flex-col min-h-96 max-h-[600px]'>

        <div className='flex items-center gap-3'>
          <Edit className='size-5 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Generated article</h1>
        </div>

        {!content ? (
          <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
              <Edit className='size-9' />
              <p>Enter a topic and click “Generate article ” to get started</p>
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

export default WriteArticle