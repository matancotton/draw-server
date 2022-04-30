import express from 'express'
import cors from "cors"
import http from 'http'
import socket from './sockets/socket.js'
import 'dotenv/config';
import './db/mongoose.js';
import scoreRouter from './scoreRouter.js'
const port = process.env.PORT;

const app = express()
const server = http.createServer(app)


app.use(cors())
app.use(express.json())
app.use("/health", (req, res) => res.send("ok"))
app.use(scoreRouter)

socket(server)


server.listen(port, ()=>{
    console.log("Server is up on port ",port)
})



