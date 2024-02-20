import User from "../models/user.model.js";
import * as path from 'path';
// import multer from "multer";
const __dirname = path.resolve();
import fs from 'fs';


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


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname, 'images'));
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//       cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//     }
// });

// export const upload = multer({ storage: storage });

// app.post('api/users/setImage',protectRoute, upload.single('image'), (req, res) => {
//     // Access the uploaded file using req.file
//     const imageFile = req.file;
  
//     // Process and save the file as needed
  
//     res.status(200).json({ success: true });
//   });

// export const setUserimage = async (req, res) => {
//     try{
//         const image = req.file;
//         console.log(image.filename);
//         // const filePath = path.join(__dirname, 'images', image.filename);

//         // fs.writeFile(filePath, imageFile.buffer, (err) => {
//         //   if (err) {
//         //     console.error(err);
//         //     // res.status(500).json({ success: false, message: 'Failed to save the file' });
//         //   } else {
//         //     console.log("image done!")
//         //     // res.status(200).json({ success: true, message: 'File saved successfully' });
//         //   }
//         // });

     //   // const user_id = req.user._id;
     //   // await User.findByIdAndUpdate(user_id, { profilePic:filePath });
//         const data = {"path":image}
//         res.status(200).json({data})
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({error:"internal server error please try upload image again"});
//     }
// }
export const setUserimage = async (req, res) => {
    try {
      const image = req.file;
      console.log(image);
      const filePath = path.join(__dirname, 'images', image.filename);
      const user_id = req.user._id;
      await User.findByIdAndUpdate(user_id, { profilePic:filePath });
    //   fs.writeFile(filePath, imageFile.buffer, (err) => {
    //     if (err) {
    //         console.error(err);
    //         // res.status(500).json({ success: false, message: 'Failed to save the file' });
    //     } else {
    //         console.log("image done!")
    //         // res.status(200).json({ success: true, message: 'File saved successfully' });
    //     }
    //   });
      res.status(200).json({ filename: image.filename,message:"image done!" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error. Please try uploading the image again." });
    }
  };

