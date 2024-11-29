import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const usernameDB = mongoose.createConnection(process.env.DB1_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to usernameDB');

    const passwordDB = mongoose.createConnection(process.env.DB2_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to passwordDB');

    return { usernameDB, passwordDB }; // Return both connections for use in models
  } catch (err) {
    console.error('Error connecting to databases:', err.message);
    process.exit(1); // Exit process on failure
  }
};

export default connectDB;
