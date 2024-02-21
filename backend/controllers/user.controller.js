import User from "../models/user.model.js";
import * as path from 'path';
const __dirname = path.resolve();


export const getUserForSidebar = async (req,res) => {
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id : { $ne : loggedInUserId }}).select("-password"); //get all users in the database but don't get the user that have the logedinuserid and select to remove the password field
        res.status(200).json(filteredUsers);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error please try to login again"});
    }
}

export const setUserimage = async (req, res) => {
    try {
      const image = req.file;
      console.log(image);
      const filePath = path.join(__dirname, 'images', image.filename);
      const user_id = req.user._id;
      await User.findByIdAndUpdate(user_id, { profilePic:`https://moaztello-chat-app.onrender.com/images/${image.filename}` });
      res.status(200).json({ filename: image.filename,message:"image done!",path:filePath});
    } 
    catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error. Please try uploading the image again." });
    }
  };

  export const setUserimageFromUrl = async (req, res) => {
    try{
      const imageurl = req.body;
      console.log(imageurl);
      const user_id = req.user._id;
      await User.findByIdAndUpdate(user_id, { profilePic:imageurl.imageurl });
      res.status(200).json({ message:"image done!",path:imageurl});
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error. Please try uploading the image again." });
    }
  }
