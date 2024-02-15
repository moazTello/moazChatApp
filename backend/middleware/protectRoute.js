import jwt  from "jsonwebtoken";
import User from "../models/user.model.js";
const protectRoute = async (req,res,next) => {
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({error : "unAutherizerd !"})
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({error : "unAuthirized - invalid token"})
        }
        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            res.status(404).json({error:"user is not found"})
        }
        req.user = user;
        next();
    }
    catch(err){
        console.log(err)
        res.status(500).json({"err":"error from protectRouter"})
    }
}
export default protectRoute;