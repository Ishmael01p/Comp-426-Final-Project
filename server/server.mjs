import express from "express";
import cors from "cors";
import connectDB from "./db.mjs";
import UserModel from "./models/User.mjs";
import PasswordModel from "./models/Password.mjs";

const app = express();
app.use(express.json());
app.use(cors());

(async () => {
  try {
    const { usernameDB, passwordDB } = await connectDB();

    const User = UserModel(usernameDB);
    const Password = PasswordModel(passwordDB);

    console.log("Models initialized successfully");

    app.post("/register", async (req, res) => {
      const { username, password } = req.body;
      try {
        const newUser = new User({ username });
        const savedUser = await newUser.save();

        const newPassword = new Password({ userId: savedUser._id, password });
        await newPassword.save();

        res.status(201).send("User Registered");
      } catch (err) {
        console.error("Error registering user:", err.message);
        res.status(500).send("Error registering user");
      }
    });

    app.post("/login", async (req, res) => {
      const { username, password } = req.body;
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return res.status(401).send("Invalid username");
        }

        const matchingPassword = await Password.findOne({ userId: user._id });
        if (!matchingPassword || matchingPassword.password !== password) {
          return res.status(401).send("Invalid password");
        }
        res.send("Login successful");
      } catch (err) {
        console.error("Error logging in:", err.message);
        res.status(500).send("Error logging in");
      }
    });

    app.post("/save-job", async (req, res) => {
      const { username, job } = req.body;

      if (!username || !job) {
        return res.status(400).send("Missing username or job details");
      }

      try {
        const user = await User.findOne({ username });

        if (!user) {
          return res.status(404).send("User not found");
        }

        user.savedJobs.push(job);
        await user.save();

        res.status(200).send("Job saved successfully");
      } catch (err) {
        console.error("Error saving job:", err.message);
        res.status(500).send("Internal server error");
      }
    });

    app.delete("/unsave-job", async (req, res) => {
      const { username, job } = req.body;

      if (!username || !job) {
        return res.status(400).send("Missing username or job details");
      }

      try {
        const user = await User.findOne({ username });

        if (!user) {
          return res.status(404).send("User not found");
        }

        user.savedJobs = user.savedJobs.filter(
          (savedJob) =>
            savedJob.title !== job.title ||
            savedJob.company.name !== job.company.name
        );

        await user.save();

        res.status(200).send("Job unsaved successfully");
      } catch (err) {
        console.error("Error unsaving job:", err.message);
        res.status(500).send("Internal server error");
      }
    });

    app.post('/get-saved', async (req, res) => {
      const { username } = req.body;

      if (!username) {
        return res.status(400).send("Missing username.");
      }

      try {
        const user = await User.findOne({ username });
        if (!user) {
          return res.status(404).send("User not found.");
        }

        res.status(200).json(user.savedJobs); // Send the saved jobs back to the client
      } catch (error) {
        console.error("Error fetching saved jobs:", error.message);
        res.status(500).send("Internal server error.");
      }
    });

    // Start the server
    const PORT = 8080;
    app.listen(PORT, () =>
      console.log(`API is running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("Error starting the server:", err.message);
  }
})();
