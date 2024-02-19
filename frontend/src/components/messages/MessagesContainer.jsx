import React, { useEffect, useMemo } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import {TiMessages } from 'react-icons/ti';
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';
import useWindowSize from '../../hooks/useWindowSize';
import { FaArrowAltCircleLeft } from "react-icons/fa";
const MessagesContainer = () => {
  const {width} = useWindowSize();
  // const {messages, setMessages} = useConversation();
  const {selectedConversation, setSelectedConversation
    , sideNum,setSideNum
  } = useConversation();
  useEffect(()=>{
    return () => setSelectedConversation(null)
  },[setSelectedConversation]);
  const messagesComponent = useMemo(() => <>
        <div className='bg-orange-300 px-4 py-2 mb-2 relative'>
          <span className='label-text text-gray-500'>To : </span>
          <span className='text-gray-700 font-bold'>{selectedConversation?.fullname}</span>
          <button onClick={() => {setSideNum(false)}} className='absolute end-2 top-2 flex items-center pe-3'
                  style={{display:width<600 ? '' : 'none'}}
          >
            <FaArrowAltCircleLeft size={25} className='cursor-pointer text-gray-700'/>
          </button>
        </div>
        <Messages/>
  </>,[width,selectedConversation]);
  const messageInputComponent = useMemo(() => <MessageInput/>,[])
  return (
    <div className='md:min-w-[450px] flex flex-col' 
          style={{display:width<600&&!sideNum?'none':''}}
    >
        {!selectedConversation ? (<NoChatSelected/>) : (
            <>
                {/* <div className='bg-orange-300 px-4 py-2 mb-2 relative'>
                    <span className='label-text text-gray-500'>To : </span>
                    <span className='text-gray-700 font-bold'>{selectedConversation.fullname}</span>
                    <button onClick={ () => {setSideNum(false)}} className='absolute end-2 top-2 flex items-center pe-3'
                            // style={{display:width<600?'':'none'}}
                    >
                      <FaArrowAltCircleLeft size={25} className='cursor-pointer text-gray-700'/>
                    </button>
                </div>
                <Messages/> */}
                {/* <MessageInput/> */}
                {messagesComponent}
                {messageInputComponent}
            </>
        )}
    </div>
  )
}
const NoChatSelected = () => {
  const {authUser} = useAuthContext();
  const {setSideNum} = useConversation();
    return (
      <div className='flex items-center justify-center w-full h-full'>
        <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
            <p> Welcome to Moaz Tello Chat App 👏🏻 </p>
            <p>Hello {authUser.username}</p>
            <p>Select a Chat to start Messaging</p>
            {/* <TiMessages className='text-3xl md:text-6xl text-center'/> */}
            <button onClick={ () => {setSideNum(false)}} className='text-3xl md:text-6xl text-center'>
                      {/* <FaArrowAltCircleLeft size={25} className='cursor-pointer text-white'/> */}
                      <TiMessages className='text-3xl md:text-6xl text-center'/>
            </button>
        </div>  
      </div>
    )
  }

export default MessagesContainer