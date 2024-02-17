import React, { useState } from 'react'
import useConversation from '../zustand/useConversation';
const useSendMessage = () => {
const [loading,setLoding] = useState(false);
const { messages, setMessages, selectedConversation} = useConversation ();
const sendMessage = async (message) => {
    setLoding(true);
    try{
        const res = await fetch(`api/messages/send/${selectedConversation._id}`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({message})
        });
        const data = await res.json()
        console.log(data);
        if(data.error){
            console.log(data)
            throw new Error(data.error)
        }
        setMessages([...messages,data])
    }
    catch(err){
        toast.error(err.message)
    }
    finally{
        setLoding(false);
    }
}
return {loading, sendMessage}
}

export default useSendMessage