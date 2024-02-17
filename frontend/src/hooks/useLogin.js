import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin =  () => {
    const { setAuthUser } = useAuthContext();
    const [ loading, setLoading ] = useState(false);
    const login = async (userName,password) => {
        const success = handleInputErrors({userName,password});
        if(!success) return;
        try{
            setLoading(true);
            const res = await fetch("api/auth/login",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({'username':userName,'password':password})
            });
            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            console.log(data);
            localStorage.setItem('chat-user',JSON.stringify(data));
            setAuthUser(data);
        }
        catch(err){
            console.log(err);
            toast.error(err.message);
        }
        finally{
            setLoading(false);
        }
    }
    return {loading,login}
}
export default useLogin

function handleInputErrors({userName,password}){
    if( !userName || !password ){
      toast.error('Please fill all the fields ! ');
      return false  
    }
    if(password.length < 6){
      toast.error("Password must at least more than 6 characters ");
      return false
    }
    return true
}