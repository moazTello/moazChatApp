import User from "../models/user.model.js";

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