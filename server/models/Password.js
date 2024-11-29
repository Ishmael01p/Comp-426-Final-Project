import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
})

const PasswordModel = mongoose.model('Password', userSchema)
export default PasswordModel;