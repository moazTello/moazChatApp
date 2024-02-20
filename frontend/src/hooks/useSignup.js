import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
    const [ loading, setLoding ] = useState(false);
    const { setAuthUser } = useAuthContext();
    const signup = async ({fullName,userName,password,confirmPassword,gender}) => {
        const success = handleInputErrors({fullName,userName,password,confirmPassword,gender});
        if(!success) return;
        setLoding(true);
        try{
            const res = await fetch("/api/auth/signup",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({fullName,userName,password,confirmPassword,gender})
            })
            const data = await res.json();
            if(data.message){
                throw new Error(data.message)
            }
            localStorage.setItem("chat-user",JSON.stringify(data));
            setAuthUser(data);
        }
        catch(err){
            toast.error(err.message)
        }
        finally{
            setLoding(false);
        }
    }
    return { loading, signup };
}

export default useSignup

function handleInputErrors({fullName,userName,password,confirmPassword,gender}){
    if( !fullName || !userName || !password || !confirmPassword || !gender ){
      toast.error('Please fill all the fields ! ');
      return false  
    }
    if(password !== confirmPassword){
      toast.error("Passwords don't match ");
      return false
    }
    if(password.length < 6){
      toast.error("Password must at least more than 6 characters ");
      return false
    }
    return true
}