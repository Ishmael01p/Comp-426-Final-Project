import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: {
    name: { type: String, required: true },
    url: { type: String, required: false },
    logo: { type: String, required: false },
  },
  location: { type: String, required: true },
  url: { type: String, required: true }
  
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  savedJobs: [JobSchema]
});

export default (connection) => connection.model("User", UserSchema);
