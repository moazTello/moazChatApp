import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
export const useUplaodImage = () => {
    const {authUser} = useAuthContext();
    const [ loading, setLoding ] = useState(false);
    const loadingImage = async ({image}) => {
        try{
            setLoding(true);
            const res = await fetch('/api/users/setImage',{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({'image':image})
            });
            const data = await res.json()
            console.log(data);
        }
        catch(err){
            console.log(err);
        }
        finally{
            setLoding(false);
        }
    }
    return {loading,loadingImage}
}