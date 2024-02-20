// const express = require("express");
// const dotenv = require("dotenv");
// import path from 'path';
import * as path from 'path';
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';
import {app, server} from './socket/socket.js';
import connectToMongoDB from "./db/connectToMongoDb.js";
import multer from 'multer';
import protectRoute from "./middleware/protectRoute.js";

// const app = express();  //moved to socket
const PORT = process.env.PORT || 9000;

//for deploy changes
const __dirname = path.resolve()

dotenv.config();
app.use(express.json());  
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, 'images'));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

app.post('api/users/setImage',protectRoute, upload.single('image'), (req, res) => {
    // Access the uploaded file using req.file
    const imageFile = req.file;
  
    // Process and save the file as needed
  
    res.status(200).json({ success: true });
  });

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);



//for deploy changes
// app.use(express.static(path.join(__dirname,"frontend/dist")));
app.use(express.static(path.resolve(__dirname, 'frontend/dist')));
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})
// app.get("/",(req,res) => {
//     //root route http://localhost:9000
//     res.send(`server is ready on port ${PORT}`)
// });

server.listen(PORT,()=> {
    connectToMongoDB();
    console.log(`server running on port ${PORT}`)

})