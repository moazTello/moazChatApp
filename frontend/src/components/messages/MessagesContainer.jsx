import React, { useState, useEffect, useMemo } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import {TiMessages } from 'react-icons/ti';
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';
import useWindowSize from '../../hooks/useWindowSize';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useUplaodImage } from '../../hooks/useUploadImage';
const MessagesContainer = () => {
  const {width} = useWindowSize();
  const  {loading,loadingImage} = useUplaodImage();
  // const {messages, setMessages} = useConversation();
  const {selectedConversation, setSelectedConversation
    , sideNum,setSideNum,image,setImage
  } = useConversation();
  const {authUser} = useAuthContext();
  useEffect(()=>{
    return () => setSelectedConversation(null)
  },[setSelectedConversation]);
  const handleImage = (e) => {
    if(e.target.files.length !== 0){
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
            upLoadImage(reader.result);
        }
        reader.readAsDataURL(e.target.files[0]);
    }
  }
  const upLoadImage = async (imageLoeded) => {
    console.log(image);
    await loadingImage(imageLoeded);
  }
  const messagesComponent = useMemo(() => <>
        <div className='bg-orange-300 px-4 py-2 mb-2 min-h-[65px] flex items-center relative'>
          <span className='label-text text-gray-500'>To : </span>
          <span className='text-gray-700 font-bold'>{selectedConversation?.fullname}</span>
          <label className='w-12 absolute end-1 top-2' htmlFor='choose'>
            <img className='rounded-full w-12 cursor-pointer' src={image?image:authUser.profilePic} alt='userPic' />
          </label>
          <input onChange={handleImage} style={{display:'none'}} type='file' id='choose'/>
          <button onClick={() => {setSideNum(false)}} className='absolute end-12 top-5 flex items-center pe-3'
                  style={{display:width<600 ? '' : 'none'}}
          >
            <FaArrowAltCircleLeft size={25} className='cursor-pointer text-gray-700'/>
          </button>
        </div>
        <Messages/>
  </>,[width,selectedConversation,image]);
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