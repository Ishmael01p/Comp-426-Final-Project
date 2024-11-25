import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try {
        const URI = process.env.MONGO_URI;
        await mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('Connect to MongoDB')
    } catch(err) {
        console.error(err)
        process.exit(1);
    }
} 
export default connectDB