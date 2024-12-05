import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({path: '../.env' });

const mongoURI1 = process.env.DB1_URI
const mongoURI2 = process.env.DB2_URI

const connectDB = async () => {
  try {
    const usernameDB = mongoose.createConnection(mongoURI1);
    console.log('Connected to usernameDB');

    const passwordDB = mongoose.createConnection(mongoURI2);
    console.log('Connected to passwordDB');

    return { usernameDB, passwordDB }; 
  } catch (err) {
    console.error('Error connecting to databases:', err.message);
    process.exit(1); 
  }
};

export default connectDB;
