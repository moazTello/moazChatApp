import express from "express";
import { getUserForSidebar
    , setUserimage 
} from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import upload from '../middleware/multerMiddle.js'
const router = express.Router();

router.get('/',protectRoute,getUserForSidebar);
router.post('/setImage',protectRoute,upload.single("image"),setUserimage);
// router.post('/setImage',protectRoute, upload.single('image'), (req, res) => {
//     // Access the uploaded file using req.file
//     const imageFile = req.file;
  
//     // Process and save the file as needed
  
//     res.status(200).json({ success: true });
//   });

export default router;