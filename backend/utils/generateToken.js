import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId,res) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'15d'
    })
    res.cookie("jwt",token,{
        // maxAge:15*24*60*60*1000, //milliseconds
        maxAge:3*60*1000, //milliseconds
        httpOnly:true, //prevent any request from other http (for attackers)
        sameSite:"strict",
        secure:process.env.NODE_ENV !== "development"
    })
}
export default generateTokenAndSetCookie;