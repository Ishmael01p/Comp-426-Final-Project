import express from 'express';
import cors from 'cors';
import connectDB from './db.mjs';
import UserModel from './models/User.mjs';
import PasswordModel from './models/Password.mjs';

const app = express();
app.use(express.json());
app.use(cors());

(async () => {
    try {
        // Connect to the databases
        const { usernameDB, passwordDB } = await connectDB();

        // Initialize the models after the connections are ready
        const User = UserModel(usernameDB);
        const Password = PasswordModel(passwordDB);

        console.log('Models initialized successfully');

        // Register endpoint
        app.post('/register', async (req, res) => {
            const { username, password } = req.body;
            try {
                const newUser = new User({ username });
                const savedUser = await newUser.save();

                const newPassword = new Password({ userId: savedUser._id, password });
                await newPassword.save();

                res.status(201).send('User Registered');
            } catch (err) {
                console.error('Error registering user:', err.message);
                res.status(500).send('Error registering user');
            }
        });

        // Login endpoint
        app.post('/login', async (req, res) => {
            const { username, password } = req.body;
            try {
                const user = await User.findOne({ username });
                if (!user) {
                    return res.status(401).send('Invalid username');
                }

                const matchingPassword = await Password.findOne({ userId: user._id });
                if (!matchingPassword || matchingPassword.password !== password) {
                    return res.status(401).send('Invalid password');
                }
                res.send('Login successful');
            } catch (err) {
                console.error('Error logging in:', err.message);
                res.status(500).send('Error logging in');
            }
        });

        // Start the server
        const PORT = 8080;
        app.listen(PORT, () => console.log(`API is running on http://localhost:${PORT}`));
    } catch (err) {
        console.error('Error starting the server:', err.message);
    }
})();
