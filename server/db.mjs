import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const mongoURI1 = process.env.DB1_URI;
const mongoURI2 = process.env.DB2_URI;

const connectDB = async () => {
  try {
    const usernameDB = mongoose.createConnection(mongoURI1, {
      dbName: 'User_JB', 
    });
    usernameDB.on('connected', () => {
      console.log('Connected to:', usernameDB.name); 
    });

    const passwordDB = mongoose.createConnection(mongoURI2, {
      dbName: 'Password_JB', 
    });
    passwordDB.on('connected', () => {
      console.log('Connected to:', passwordDB.name);
    });

    console.log('Connections established successfully');

    return { usernameDB, passwordDB }; 
  } catch (err) {
    console.error('Error connecting to databases:', err.message);
    process.exit(1);
  }
};

export default connectDB;
