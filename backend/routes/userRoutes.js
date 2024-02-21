import express from "express";
import { getUserForSidebar, setUserimage, setUserimageFromUrl } from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import upload from '../middleware/multerMiddle.js'
const router = express.Router();

router.get('/',protectRoute,getUserForSidebar);
router.post('/setImage',protectRoute,upload.single("image"),setUserimage);
router.post('/setImageFromUrl', protectRoute, setUserimageFromUrl);



export default router;