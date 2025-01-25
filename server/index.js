const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv")
const userModel = require("./model/user")
const session = require("express-session")
const mongoStore = require("connect-mongo");
const MongoStore = require("connect-mongo");

dotenv.config(); //config the env
const app = express(); //creating the APP 
app.use(express.json()); //it converts the req into json format`
app.use(cors({
    origin:process.env.FORNTEND_URL,
    credentials: true
})); //allows to connect the forntend and backend and to fetch the data from the frontend
        
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds if unable to connect
        tls: true, // Use TLS/SSL
        tlsInsecure: false, // Optional: Set to true for self-signed certificates
      });
      console.log("DB is connected");
    } catch (err) {
      console.error("Failed to connect to DB:", err.message);
      process.exit(1); // Exit process with failure
    }
  };
connectDB();      

app.listen(process.env.PORT,() => {
    console.log("Server is running");
})

app.use(session(
    {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({mongoUrl:process.env.MONGO_URI}),
        cookie: {maxAge: 1000 * 60 * 60 * 24}
    }
))

app.post("/signup", async (req, res) => {
    try{
        const { name, email, password } = req.body;
        console.log(name+" "+email+" "+password);
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(400).json({ error: "User already exist"})
        }
        const HashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({name, email, password: HashedPassword});
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

app.post("/login", async (req,res) => {
    try{
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        if(user){
            const passwordMatch = await bcrypt.compare(password, user.password)
            if(passwordMatch){
                req.session.user = { id: user._id, name:user.name, email: user.email }
                res.json("Success")
            }else{
                res.json("Password dose not match").status(401)
            }
        }else{
            res.json("User not found").status(401)
        }
    }catch(error) {
        res.json({error: error.message}).status(500)
    }
})

app.get("/user", (req, res) => {
    if(req.session.user){
        res.json({user: req.session.user})
    }else{
        res.status(401).json("Not authenticated")
    }
})