import { useEffect, useState } from "react"
import toast from "react-hot-toast";
// import { useNavigate } from 'react-router-dom';

const useGetConversations = () => {
    // const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [ conversations, setConversations ] = useState([]);
    useEffect(() => {
        const getConversation = async () => {
            setLoading(true);
            try{
                const res = await fetch("api/users");
                const data = await res.json();
                if(data.error){
                    throw new Error(data.error);
                }
                setConversations(data)
            }
            catch(err){
                toast.error('token expired relogin please',err.message);
                // localStorage.removeItem('chat-user');
                // navigate('/login');
            }
            finally{
                setLoading(false);
            }
        }
        getConversation();
    },[]);
    return {loading,conversations}
}
export default useGetConversations