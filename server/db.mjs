import mongoose from 'mongoose';
import dotenv from 'dotenv';

// dotenv.config();

const uri1='mongodb+srv://Ishmaelp:IxAuPicfteLbibS7@cluster0.wq8uf.mongodb.net/User_JB?retryWrites=true&w=majority'
const uri2='mongodb+srv://Ishmaelp:IxAuPicfteLbibS7@cluster0.wq8uf.mongodb.net/Password_JB?retryWrites=true&w=majority'


const connectDB = async () => {
  try {
    const usernameDB = mongoose.createConnection(uri1);
    console.log('Connected to usernameDB');

    const passwordDB = mongoose.createConnection(uri2);
    console.log('Connected to passwordDB');

    return { usernameDB, passwordDB }; 
  } catch (err) {
    console.error('Error connecting to databases:', err.message);
    process.exit(1); 
  }
};

export default connectDB;
