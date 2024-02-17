import React from 'react'
import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/SocketContext';

const Conversation = ({conv, emoji, lastIdx}) => {
    const {selectedConversation, setSelectedConversation} = useConversation();
    const isSelected = selectedConversation?._id === conv._id;
    const {onlineUsers} = useSocketContext();
    const isOnline = onlineUsers.includes(conv._id) 
  return (
    <>
        <div className={`flex items-center gap-2 hover:bg-orange-300 text-white rounded p-2 py-1 cursor-pointer ${isSelected ? 'bg-orange-400' : ''}`}
            onClick={() => setSelectedConversation(conv)}
        >
            <div className={`avatar ${isOnline?'online':'offline'}`}>
                <div className='w-12 rounded-full'>
                    {/* <img src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' alt='user avatar'/> */}
                    <img src={conv.profilePic} alt='user avatar'/>

                </div>
            </div>
            <div className='flex flex-col flex-1'>
                <div className='flex justify-between gap-3'>
                    <p className='font-bold text-gray-200'>{conv.fullname}</p>
                    <span className='text-xl'>{emoji}</span>
                </div>

            </div>
        </div>
        {!lastIdx && <div className={`divider h-1 py-0 my-0`}/>}
    </>
  )
}

export default Conversation