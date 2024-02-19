import React, { useState } from 'react'
import { BsSend } from 'react-icons/bs';
import useSendMessage from '../../hooks/useSendMessage';
const MessageInput = () => {
  const [ message, setMessage ] = useState('');
  const { loading, sendMessage } = useSendMessage();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!message)return
    await sendMessage(message);
    setMessage("");
  }
  return (
    <form className='px-4 py-3' onSubmit={handleSubmit}>
        <div className='w-full relative'>
        {/* <div className='w-full fixed bottom-0'> */}
            <input value={message} onChange={(e) => {setMessage(e.target.value)}} className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white outline-none' 
            type='text' placeholder='Send a message'/>
            <button className='absolute inset-y-0 end-0 flex items-center pe-3'>
                {loading ? <span className='loading loading-ball'></span> : <BsSend className='cursor-pointer text-white'/>}
            </button>
        </div>
    </form>
  )
}

export default MessageInput