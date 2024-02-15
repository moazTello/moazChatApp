import mongoose from 'mongoose';

const connectToMongoDB = async () => {
    try{ 
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log('connected to mongo db')
    }
    catch(err){
        console.log('error when try to connect to mongodb ',err.message)
    }
}

export default connectToMongoDB;