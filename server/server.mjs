import express from 'express';
import cors from 'cors';
import connectDB from './db.mjs';
import authRoutes from './routes/authRoutes.mjs'
import UserModel from './models/User.mjs';
import PasswordModel from './models/Password';

const app = express()
app.use(express.json())
app.use(cors())

(async ()=> {
    const {usernameDB, passwordDB } = await connectDB()
});
connectDB();

const User = UserModel(usernameDB);
const Password = PasswordModel(passwordDB);

app.post('/register', async (req, res) => {
    const {username, password} = req.body;
    try {
        const newUser = new User({ username });
        await newUser.save();

        const newPassword = new Password({ password });
        await newPassword.save();

        res.status(201).send('User Registered')
    } catch (err) {
        res.status(500).send('Error registering user')
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = res.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).send('Invalid username');
        }

        const matchingPassword = await Password.findOne({_id: user._id});
        if (!matchingPassword || matchingPassword.password !== password) {
            return res.status(401).send('Invalid password')
        }
        res.send('Login successful');
    } catch (err) {
        res.status(500).send('Error logging in')
    }
});

app.use('/auth', authRoutes)
app.use('/login', (req, res) => {
    res.send({
        token: 'test123'
    });
});

app.listen(8080, () => console.log('API is run on http://localhost:8080/login'))