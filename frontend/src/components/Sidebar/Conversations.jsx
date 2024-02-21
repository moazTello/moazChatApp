import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations'
// import { getRandomEmoji } from '../../utils/Emojes';

const Conversations = () => {
  const {loading, conversations} = useGetConversations();
  console.log(conversations);
  return (
    <div className='flex flex-col py-2 overflow-auto'>
      {conversations.length > 0 && conversations?.map((conv,idx)=>(<Conversation key={conv._id} conv={conv} lastIdx={idx === conversations.length - 1}/>))}
      {loading ? <span className='loading loading-infinity w-20 h-10 ms-auto'></span> : null}
    </div>
  )
}

export default Conversations