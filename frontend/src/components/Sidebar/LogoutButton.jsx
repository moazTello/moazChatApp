import React, { useEffect, useState, useRef } from 'react'
import {BiLogOut} from 'react-icons/bi';
import useLogout from '../../hooks/useLogout';
import useConversation from '../../zustand/useConversation';
import { FaMusic,FaPause } from "react-icons/fa";
import nadam from '../../assets/sounds/nadam.mp3';
const LogoutButton = () => {
  const {logout,loading} = useLogout();
  const {setJhinImage} = useConversation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const audioRef = useRef(null);
  const showJhin = () => {
    setJhinImage(true);
    setTimeout(() => {
      setJhinImage(false);
    },5000);
  };
  useEffect(() => {
    audioRef.current.addEventListener('ended', handleAudioEnded);
    return () => {
      audioRef.current.removeEventListener('ended', handleAudioEnded);
    };
  }, []);

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setIsEnded(true);
  };
  const playNadam = () => {
    // audioRef.current.currentTime = 0;
    audioRef.current.play();
    setIsPlaying(true);
    setIsEnded(false);
  };

  const pauseNadam = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };


  return (
    <div className='mt-auto flex items-center'>
      {loading ? (<span className='loading loading-spinner mt-5'></span>) : (<BiLogOut className='w-8 h-8 text-white cursor-pointer mt-5' title='Logout' onClick={logout}/>)}
      <button className='cursor-pointer mt-5'>
        <img className='w-7 ml-5' src='jhins.svg' alt='See Jhin Image for 5 seconds !' title='See Jhin Image for 5 seconds !' onClick={showJhin}/>
      </button>
      {/* <button onClick={palyNadam} className='cursor-pointer mt-10 ml-7'>
        <FaMusic size={20} className='text-white'/>
      </button>
      <button onClick={stopNadam} className='cursor-pointer mt-10 ml-7'>
        <FaPause size={20} className='text-white'/>
      </button> */}
      <button
        onClick={playNadam}
        className="cursor-pointer mt-5 ml-7"
        disabled={isPlaying && isEnded}
        style={{display:isPlaying && !isEnded ?'none':''}}
        title='play Nadam music'
      >
        <FaMusic size={20} className="text-white" />
      </button>
      <button
        onClick={pauseNadam}
        className="cursor-pointer mt-5 ml-7"
        disabled={!isPlaying || isEnded}
        style={{display:isPlaying && !isEnded ?'':'none'}}
        title='pause Nadam music'
      >
        <FaPause size={20} className="text-white" />
      </button>
      <audio ref={audioRef} src={nadam}></audio>
    </div>
  )
}

export default LogoutButton