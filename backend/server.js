// const express = require("express");
// const dotenv = require("dotenv");
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';
import {app, server} from './socket/socket.js';

import connectToMongoDB from "./db/connectToMongoDb.js";

// const app = express();  //moved to socket
const PORT = process.env.PORT || 9000;

dotenv.config();
app.use(express.json());  
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);


// app.get("/",(req,res) => {
//     //root route http://localhost:9000
//     res.send(`server is ready on port ${PORT}`)
// });

server.listen(PORT,()=> {
    connectToMongoDB();
    console.log(`server running on port ${PORT}`)

})