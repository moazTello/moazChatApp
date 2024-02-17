import React, {useState} from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
const useLogout = () => {
    const [ loading, setLoding ] = useState(false);
    const { setAuthUser } = useAuthContext();
    const logout = async () => {
        setLoding(true);
        try{
            const res = await fetch("/api/auth/logout",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
            });
            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            console.log(data)
            localStorage.removeItem("chat-user");
            setAuthUser(null);
        }
        catch(err){
            toast.error(err.message);
            toast.error('errror');
            console.log(err)
        }
        finally{
            setLoding(false);
        }
    }
    return {loading,logout}
}

export default useLogout