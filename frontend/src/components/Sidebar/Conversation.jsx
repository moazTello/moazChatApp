import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/SocketContext';
import useWindowSize from '../../hooks/useWindowSize';
import { useState } from 'react';

const Conversation = ({conv, emoji, lastIdx}) => {
    const {selectedConversation, setSelectedConversation
        ,setSideNum
    } = useConversation();
    const [ imageProfile, setImageProfile ] = useState(false);
    const isSelected = selectedConversation?._id === conv._id;
    const {onlineUsers} = useSocketContext();
    const isOnline = onlineUsers.includes(conv._id);
    const {width} = useWindowSize();
    const setconvreference = () => {
        if(selectedConversation?._id !== conv._id)setSelectedConversation(conv);
    }
    const setSide = () => {
        if(width<600){
            setSideNum(true);
        }
    }
    const showImageProfile = () => {
        setImageProfile(true);
        setTimeout(()=>{
            setImageProfile(false);
        },3000)
    }
  return (
    <>
        <div className={`relative flex items-center gap-2 hover:bg-orange-300 text-white rounded p-2 py-1 cursor-pointer ${isSelected ? 'bg-orange-400' : ''}`}
            onClick={() => {setconvreference();
                setSide();
            }}
        >
            <div className={`avatar ${isOnline?'online':'offline'}`}>
                <div className='w-12 rounded-full' onClick = {showImageProfile}>
                    {/* <img src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' alt='user avatar'/> */}
                    <img src={conv.profilePic} alt='user avatar'/>
                    {/* <button className="" onClick={()=>document.getElementById('my_modal_1').showModal()}>
                        <img src={conv.profilePic} alt='user avatar'/>
                    </button>
                    <dialog id="my_modal_1" className="modal --tw-translate-y-[90px]">
                        <div className="modal-box self-center">
                        <img src={conv.profilePic} alt='user avatar'/>
                        <p className="py-4">Press ESC key or click the button below to close</p>
                        <div className="modal-action">
                            <form method="dialog">
                            <button className="btn">Close</button>
                            </form>
                        </div>
                        </div>
                    </dialog> */}
                </div>
            </div>
            <div className={`pt-10 z-20 w-36 absolute right-0`} style={{display:imageProfile ? '' : 'none'}}>
                    <img src={conv.profilePic} alt='user avatar'/>
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