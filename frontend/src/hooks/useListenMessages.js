import { useEffect } from 'react';
import {useSocketContext} from '../context/SocketContext';
import useConversation from '../zustand/useConversation';
import notificationSound from '../assets/sounds/notification.mp3';
const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages,setMessages } = useConversation();
    useEffect(() => {
        socket?.on("newMessage",(newMessage) => {
            newMessage.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();
            console.log(newMessage);
            // setMessages([...messages,newMessage]);
            if(newMessage.senderId === messages[0]?.senderId && newMessage.receiverId === messages[0]?.receiverId){
                console.log("sender = sender");
                setMessages([...messages,newMessage]);
            }
            else if(newMessage.senderId === messages[0]?.receiverId && newMessage.receiverId === messages[0]?.senderId){
                console.log("receiver = sender");
                setMessages([...messages,newMessage]);
            }
        });
        return () => socket?.off("newMessage");
    },[socket,setMessages,messages]);
}
export default useListenMessages