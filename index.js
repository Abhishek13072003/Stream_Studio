import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 8000;
const URL = process.env.MONGOURL;

// Define User schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

// Create User model
const User = mongoose.model('User', userSchema);

// Define Creator schema
const creatorSchema = new mongoose.Schema({
    name: String,
    email: String,
    contact: String,
    genre: String,
    title: String,
    description: String,
    url: String,
});

// Create Creator model
const Creator = mongoose.model('Creator', creatorSchema);

mongoose.connect(URL).then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port:- " + PORT);
    })
}).catch(error => console.log(error));

app.get('/', (req, res) => {
    res.send('PONG')
});

// Route for user signup
app.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating user" });
    }
});

// Route for user login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (user.password !== password) {
            return res.status(401).json({ error: "Invalid password" });
        }
        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error logging in" });
    }
});

// Route for creator registration
app.post("/creator-registration", async (req, res) => {
    try {
        const { name, email, contact, genre, title, description, url } = req.body;
        const newCreator = new Creator({ name, email, contact, genre, title, description, url });
        await newCreator.save();
        res.status(201).json({ message: "Creator registration submitted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error submitting creator registration" });
    }
});

// Route to get all creator registration data
app.get("/abhi", async (req, res) => {
    try {
        const creators = await Creator.find(); // Retrieve all creator registrations
        res.status(200).json(creators); // Send the creator registrations as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error retrieving creator registration data" });
    }
});

// Route to get all users
app.get("/users", async (req, res) => {
    try {
        const users = await User.find(); // Retrieve all users
        res.status(200).json(users); // Send the users as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error retrieving user data" });
    }
});
