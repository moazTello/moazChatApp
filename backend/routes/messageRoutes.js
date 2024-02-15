import express from "express";
import { sendMessage,getMessages } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();

router.get('/:user_id', protectRoute,getMessages);
router.post('/send/:user_id', protectRoute,sendMessage);


export default router;