import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req,res) => {
    try{
        const { fullName, userName,password, confirmPassword, gender } = req.body;
        if(password !== confirmPassword){
            return res.status(400).json({"message":"confirm your password please"});
        }
        const user = await User.findOne({ username:userName });
        if (user) {
            return res.status(400).json({"message":"this userName is exists !"});
        }
        // HASH PASSWORD HERE

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        //https://avatart-placeholder.iran.liara.run/girl
        const boyProfilePic = `https://pm1.aminoapps.com/6296/e053ef20357b79eb6ab406eae01c143fe194ca23_128.jpg`;
        const girlProfilePic = `https://pm1.aminoapps.com/6296/e053ef20357b79eb6ab406eae01c143fe194ca23_128.jpg`;

        const newUser = new User({
            fullname:fullName,
            username:userName,
            password:hashedPassword,
            gender:gender,
            profilePic:gender === 'male' ? boyProfilePic : girlProfilePic
        });
        if(newUser){
            generateTokenAndSetCookie(newUser._id,res)
            await newUser.save();
            res.status(201).json({
            _id:newUser._id,
            fullname:newUser.fullname,
            username:newUser.username,
            profilePic:newUser.profilePic
            });
        }
        else{
            console.log('invalid user data')
            res.status(400).json({"error":"invalid user data"})
        }
    }

    
    catch(err){
        console.log(err)
        res.status(500).json({
            "message":"internal our server error "
        })
    }
}
export const login = async (req,res) => {
    try{
        const {username,password} = req.body;
        const user = await User.findOne({username:username});
        const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");
        if(!user || !isPasswordCorrect){
            return res.status(400).json({"error":"username or password is not correct ! "})
        }
        generateTokenAndSetCookie(user._id,res)
        res.status(200).json({
            _id:user._id,
            fullname:user.fullname,
            username:user.username,
            profilePic:user.profilePic
        });
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message":"internal our server error "})
    }
}

export const logout = (req,res) => {
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({"message":"logout done !"})
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"internal our server error "})
    }
}