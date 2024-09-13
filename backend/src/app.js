import express from "express";
import {createServer} from "node:http";

import {Server} from "socket.io";

import mongoose from "mongoose";

import cors from "cors";

import { connectToSocket } from "./controllers/socketManager.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port",(process.env.PORT || 8000))

app.get("/home",(req,res)=>{
    return res.json({"hello":"World"})
});


const start = async() => {
    app.set("mongo_user")
        const connectionDb = await mongoose.connect("")
        console.log(`MONGO CONNECTED DB HOST: ${connectionDb.connection.host}`)
        server.listen(app.get("port"),()=>{
        console.log("LISTEN ON PORT 8000")
    });


}

start();