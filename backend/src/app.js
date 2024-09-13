import express from "express";
import {createServer} from "node:http";

import {Server} from "socket.io";

import mongoose from "mongoose";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";

import { connectToSocket } from "./controllers/socketManager.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port",(process.env.PORT || 8000))
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Adjust according to your needs
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit:"40kb", extended:true}));

app.use("/api/v1/users", userRoutes);


const start = async() => {
    app.set("mongo_user")
        const connectionDb = await mongoose.connect("mongodb+srv://bhrighugupta:8hdi5nRoLH6QiHTL@cluster0.hcebt.mongodb.net/")
        console.log(`MONGO CONNECTED DB HOST: ${connectionDb.connection.host}`)
        server.listen(app.get("port"),()=>{
        console.log("LISTEN ON PORT 8000")
    });

}

start();