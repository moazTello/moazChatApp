import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
export const useUplaodImage = () => {
    const {authUser} = useAuthContext();
    const [ loading, setLoding ] = useState(false);
    const loadingImage = async (image) => {
        try{
            setLoding(true);
            console.log(image);
            const formData = new FormData();
            formData.append('image', image);
            const res = await fetch('/api/users/setImage',{
                method:"POST",
                // headers:{"Content-Type":"application/json"},
                // body:JSON.stringify({'image':formData})
                body:formData
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