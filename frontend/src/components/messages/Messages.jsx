import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeliton from '../skelitons/MessageSkeliton';
import useListenMessages from '../../hooks/useListenMessages';

const Messages = () => {
  const {messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({behavior:'smooth'});
    },100)
  },[messages])
  console.log(messages);
  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loading && messages.length > 0 && messages.map((mess) => (<div key={mess._id} ref={lastMessageRef}><Message mess={mess}/></div>))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeliton key={idx}/>)}
      {!loading && messages.length === 0 && (<p className='text-center'>Send a Message to start the conversation</p>)}
        {/* {loading ? <span className='loading loading-bars'></span> : messages.map((mess) => (<Message key={mess._id} mess={mess}/>))} */}
    </div>
  )
}

export default Messages