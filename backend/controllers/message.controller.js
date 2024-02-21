import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import {getReceiverSocketId, io} from '../socket/socket.js'
export const sendMessage = async (req,res) => {
    // console.log("message sent",req.params.user_id );
    try{
        const {message} = req.body;
        const {user_id : receiverId} = req.params;
        const senderId = req.user._id
        let conversation = await Conversation.findOne({
            participants:{$all: [senderId,receiverId]}
        })
        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,receiverId],
            });
        }
        const newMessage = new Message({
            senderId:senderId,
            receiverId:receiverId,
            message:message
        });
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        // await conversation.save();
        // await newMessage.save();
        // this will run parallel
        await Promise.all([newMessage.save(),conversation.save()]);


        // SOCKET Here
        const receiverSocketId = getReceiverSocketId(receiverId); 
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage); //io.to() used to send a message to a specific client
        }
        console.log("newMessage",newMessage);
        res.status(201).json(newMessage);
    }
    catch(err){
        console.log(err);
        res.status(500).json({"error":`error from message controller ${err}`});
    }
}
export const getMessages = async (req,res) => {
    try{
        const { user_id : userToChatId } = req.params;
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({
            participants:{ $all: [senderId,userToChatId] },
        }).populate("messages");
        if(!conversation)return res.status(200).json([]);
        const messages = conversation.messages;
        res.status(200).json(messages);
    }
    catch(err){
        console.log(err);
        res.status(500).json({"error":`error from message controller ${err}`})
    }
}