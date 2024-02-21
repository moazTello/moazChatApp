import { useState } from "react";
export const useUplaodImage = () => {
    const loadingImage = async (image) => {
        try{
            console.log(image);
            const formData = new FormData();
            formData.append('image', image);
            const res = await fetch('/api/users/setImage',{
                method:"POST",
                body:formData
            });
            const data = await res.json()
            console.log(data);
        }
        catch(err){
            console.log(err);
        }
    }
    return {loadingImage}
}

export const useUploadImageFromUrl = () => {
    const LoadImageFromUrl = async (imageUrl) => {
        try{
            const res = await fetch('/api/users/setImageFromUrl',{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({imageurl:imageUrl})
            });
            const data = await res.json()
            console.log(data);
            let newlocal = JSON.parse(localStorage.getItem('chat-user'));
            console.log(newlocal);
            console.log(data.path.imageurl)
            newlocal = {...newlocal, profilePic : data.path.imageurl}
            console.log(newlocal);
            localStorage.setItem('chat-user',JSON.stringify(newlocal));
        }
        catch(err){
            console.log(err);
        }
    }
    return {LoadImageFromUrl}
}