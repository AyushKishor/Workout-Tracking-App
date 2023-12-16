import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

const app = express();
dotenv.config();


app.use(express.json());
app.use(cors({
    origin: 'https://workout-app-client-theta.vercel.app', // Replace with your frontend domain
    credentials: true, // Include credentials (cookies, etc.)
}));

const mongodbURL = process.env.MONGODB_URL;

mongoose.connect(mongodbURL)

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    pastWorkouts: [{name: String, durationInMinutes: Number, exercises:[{exerciseName: String, exerciseSets: Array, exerciseWeight: Array, exerciseReps: Array}]}]
})

const User = new mongoose.model("User",userSchema);


app.get('/',(req,res)=>{
    res.send('Backend Home Page');
})

app.post("/api/register", async (req,res)=>{
    const existingUser = await User.findOne({email: req.body.email})
    
    if (existingUser || req.body.password.length < 1){
        res.status(400).send({token: false});
    }

    const {email,password} = req.body;
    const hashedPassword = await bcryptjs.hashSync(password,10);
    const user = new User({email,password: hashedPassword});
    const userRegistered = await user.save();
    if (userRegistered){
        const token = jwt.sign({_id: userRegistered._id},process.env.JWT_SECRET);
        res.status(200).send({token: token});
    }
    else {
        res.status(400).send({token: false});
    }
})

app.post("/api/login", async (req,res)=>{
    const {email,password} = req.body;
    const foundUser = await User.findOne({email: email})
    const passwordMatch = await bcryptjs.compare(password,foundUser.password);
    

    if(!passwordMatch){
        res.status(400).send({token: false});
    }
    else{
        const token = jwt.sign({_id: foundUser._id},process.env.JWT_SECRET);
        res.status(200).send({token: token});
    }
})

app.post("/api/dashboard", async (req,res)=>{
    const token = req.body.token;
    const decoded = jwt.decode(token,process.env.JWT_SECRET);
    const userId = decoded._id;
    const foundUser = await User.findById(userId)
    res.send({pastWorkouts: foundUser.pastWorkouts});
})

app.post("/api/newWorkout", async (req,res)=>{
    const token = req.body.token;
    const decoded = jwt.decode(token,process.env.JWT_SECRET);
    const userId = decoded._id;
    const latestWorkout = req.body.currentWorkout;
    const workoutName = req.body.workoutName;
    const workoutDuration = req.body.workoutDuration;

    console.log(latestWorkout)
    
    const updateUser = await User.updateOne({_id: userId},{$push: {pastWorkouts: {name: workoutName || "Unnamed Workout", durationInMinutes: latestWorkout.durationInMinutes || "", exercises: latestWorkout}}})
    res.send({message: "Workout Added"});
})

app.post("/api/deleteWorkout", async (req,res)=>{
    const token = req.body.token;
    const decoded = jwt.decode(token,process.env.JWT_SECRET);
    const userId = decoded._id;
    const workoutId = req.body.workoutId;
    const deleteWorkout = await User.findByIdAndUpdate(userId,{$pull: {pastWorkouts: {_id: workoutId}}})
    console.log(deleteWorkout)
    res.send({message: "Workout Deleted"});
})

app.post("/api/updateWorkout", async (req,res)=>{
    const token = req.body.token;
    const decoded = jwt.decode(token,process.env.JWT_SECRET);
    const userId = decoded._id;
    const workoutId = req.body.workout._id;
    const deleteWorkout = await User.findByIdAndUpdate(userId,{$pull: {pastWorkouts: {_id: workoutId}}})
    const updateWorkout = await User.findByIdAndUpdate(userId,{$push: {pastWorkouts: req.body.workout}})
    res.send({message: "Workout Updated"});
})



app.listen(8000,(req,res)=>{
    console.log('Server is running at port 8000');
})