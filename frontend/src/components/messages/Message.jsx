import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/ExtractTime';
const Message = ({mess}) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const formatedTime = extractTime(mess.createdAt);
  const fromMe = mess.senderId === authUser._id;
  const chatClassname = fromMe ? "chat-end" : "chat-start" ;
  const profilePic = fromMe ? authUser.profilePic : selectedConversation.profilePic;
  const bubbleBgColor = fromMe ? 'bg-orange-300' : 'bg-gray-500';
  const shakeClass = mess.shouldShake ? 'shake' : '' ;
  return (
    <div className={`chat ${chatClassname}`}>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                {/* <img src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' alt='user avatar'/> */}
                <img src={profilePic} alt='user avatar'/>

            </div>
        </div>
        <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} max-w-[300px] `}>{mess.message}
        {/* <p className='chat-footer bg-transparent text-xs -mb-2'>{mess.createdAt}</p> */}
        </div>
        <div className='chat-footer rounded-md mt-1 opacity-80 text-xs flex gap-1 items-center bg-transparent text-white p-0.5'>{formatedTime}</div>
    </div>
  )
}

export default Message