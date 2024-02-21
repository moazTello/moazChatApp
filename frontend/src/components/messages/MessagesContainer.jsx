import React, { useEffect, useMemo, useState } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import {TiMessages } from 'react-icons/ti';
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';
import useWindowSize from '../../hooks/useWindowSize';
import { FaArrowAltCircleLeft, FaCloudUploadAlt } from "react-icons/fa";
import { useUplaodImage, useUploadImageFromUrl } from '../../hooks/useUploadImage';
const MessagesContainer = () => {
  const {width} = useWindowSize();
  const {loadingImage} = useUplaodImage();
  const {LoadImageFromUrl} = useUploadImageFromUrl();
  // const {messages, setMessages} = useConversation();
  const {selectedConversation, setSelectedConversation
    , sideNum,setSideNum,image,setImage
    // ,imageUrl,setImageUrl
  } = useConversation();
  const {authUser} = useAuthContext();
  useEffect(()=>{
    return () => setSelectedConversation(null)
  },[setSelectedConversation]);
  const handleImage = async (e) => {
    if(e.target.files.length !== 0){
      const file = e.target.files[0];
      console.log(file);
      setImage(URL.createObjectURL(file));
      await loadingImage(file);
    }
  }
  // const handleImageUrl = async (e) => {
  //   e.preventDefault();
  //   if(imageUrl.length > 0){
  //     LoadImageFromUrl(imageUrl);
  //     setImageUrl('');
  //   }
  // }
  const ImageInputComponent1 = () => {
    const [imageUrl, setImageUrl] = useState('');
    const handleImageUrl = async (e) => {
      e.preventDefault();
      if (imageUrl.length > 0) {
        LoadImageFromUrl(imageUrl);
        setImageUrl('');
        setImage(imageUrl);
      }
    };
    return (
      <form onSubmit={handleImageUrl}>
        <input value={imageUrl} onChange={(e) => {setImageUrl(e.target.value)}} type='text' placeholder='free image source' className='w-[100%] cursor-pointer outline-none bg-transparent'/>
        <button type='submit'><FaCloudUploadAlt size={25}/></button>
      </form>
    );
  };
  const ImageInputComponent = useMemo(() => <ImageInputComponent1 />, []);
  // const imageInputContainer = useMemo(()=>
  //   <form onSubmit={handleImageUrl}>
  //     <input value={imageUrl} onChange={(e) => {setImageUrl(e.target.value)}} type='text' placeholder='free image source' className='w-[100%] cursor-pointer outline-none bg-transparent'/>
  //     <button type='submit'><FaCloudUploadAlt size={25}/></button>
  //   </form>
  // ,[imageUrl,setImageUrl,handleImageUrl]);
  const headerMessagesComponent = useMemo(()=> <>
    <div className='bg-orange-300 px-4 py-2 mb-2 min-h-[65px] flex items-center relative'>
      <span className='label-text text-gray-500'>To : </span>
      <span className='text-gray-700 font-bold'> {selectedConversation?.fullname}</span>
      <div className="dropdown dropdown-end w-12 h-12 absolute end-1 top-2">
        <div tabIndex="0" role="button" className="m-1">
          <img className='rounded-full w-12 h-10 cursor-pointer' src={image?image:authUser.profilePic} alt='userPic' />
        </div>
        <ul tabIndex="0" className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <li>
          <button className="btn outline-none" onClick={()=>document.getElementById('my_modal_1').showModal()}>See Image</button>
          <dialog id="my_modal_1" className="modal --tw-translate-y-[90px]">
            <div className="modal-box self-center">
              <img className='w-full' src={image?image:authUser.profilePic} alt='userPic' />
              <p className="py-4">Press ESC key or click the button below to close</p>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
          </li>
          <li>
            <label className='' htmlFor='choose'>
              UpLoad Image Not supported yet cause of server
            </label>
          </li>
          <li>
            {ImageInputComponent}
            {/* <form onSubmit={handleImageUrl}>
              <input value={imageUrl} onChange={(e) => {setImageUrl(e.target.value)}} type='text' placeholder='free image source' className='w-[100%] cursor-pointer outline-none bg-transparent'/>
              <button type='submit'><FaCloudUploadAlt size={25}/></button>
            </form> */}
          </li>
        </ul>
      </div>
      {/* <label className='w-12 absolute end-1 top-2' htmlFor='choose'>
        <img className='rounded-full w-12 cursor-pointer' src={image?image:authUser.profilePic} alt='userPic' />
      </label> */}
      <input onChange={handleImage} style={{display:'none'}} name='image' accept='.jpg, .jpeg, .png' type='file' id='choose'/>
      <button onClick={() => {setSideNum(false)}} className='absolute end-12 top-5 flex items-center pe-3'
              style={{display:width<600 ? '' : 'none'}}
      >
        <FaArrowAltCircleLeft size={25} className='cursor-pointer text-gray-700'/>
      </button>
    </div>
  </>,[width,selectedConversation,image,setSideNum,sideNum,handleImage]);
  const messagesComponent = useMemo(() =><Messages/>,[]);
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
                {headerMessagesComponent}
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