import mongoose from 'mongoose';

const PasswordSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    password: { type: String, required: true }
});

export default (connection) => connection.model('Password', PasswordSchema);
