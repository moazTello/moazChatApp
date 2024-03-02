import React, {memo, useMemo} from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import MessagesContainer from '../../components/messages/MessagesContainer';
import useConversation from '../../zustand/useConversation';
import JhinGif from '/Jhin_gif.gif';
import { CiMail } from "react-icons/ci";
// import JhinMovie from '/jhin_mov.mp4'
// import useWindowSize from '../../hooks/useWindowSize';
const Home = () => {
  // const {width} = useWindowSize();
  const {jhinImage,sideNum} = useConversation();
  const sidebarComponent = useMemo(() => <Sidebar/> ,[]);
  const messageContainerComponent = useMemo(() => <MessagesContainer/> ,[]);
  return (
    <div className='flex flex-col h-full items-center justify-center'>
      <div className='flex sm:h-[360px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0' 
            style={{display:jhinImage ? 'none' : ''}} 
      >
        {sidebarComponent}
        {messageContainerComponent}
          {/* <Sidebar/>
          <MessagesContainer/> */}
      </div>
      <div className='flex rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 p-5' 
          style={{display:jhinImage ? '' : 'none'}} 
      >
        <img src={JhinGif} alt='jhin'/>
        {/* <iframe title='0' width="100%" src={JhinMovie} frameborder="0" allowfullscreen webkitallowfullscreen></iframe>  */}
      </div>
      {/* <div className='flex w-full h-10 justify-center text-gray-200 font-semibold items-center rounded-lg overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0' 
      >
        <CiMail size={25} className='mr-3' color="white"/>  tello.m.m.t.95@gmail.com
      </div> */}
    </div>
  )
}

export default memo(Home);