import React, {memo, useMemo} from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import MessagesContainer from '../../components/messages/MessagesContainer';
import useConversation from '../../zustand/useConversation';
// import useWindowSize from '../../hooks/useWindowSize';
const Home = () => {
  // const {width} = useWindowSize();
  const {jhinImage} = useConversation();
  const sidebarComponent = useMemo(() => <Sidebar/> ,[]);
  const messageContainerComponent = useMemo(() => <MessagesContainer/> ,[]);
  return (
    <div className='flex sm:h-[360px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0' 
          style={{display:jhinImage ? 'none' : ''}} 
    >
      {sidebarComponent}
      {messageContainerComponent}
        {/* <Sidebar/>
        <MessagesContainer/> */}
    </div>
  )
}

export default memo(Home);