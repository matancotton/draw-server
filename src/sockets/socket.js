import { Server } from 'socket.io';
import Score from '../scoreModel.js';
import { removeUser } from './users.js';
import { getOnlineUsers } from './users.js';
import { addUser } from './users.js';

const socket = (server) =>{
    const io = new Server(server,{
        cors: {
          origin: process.env.CLIENT_URL,
          methods: ["GET", "POST"],
          allowedHeaders: ["nickname"],
          credentials: true
        }
      })
    io.on('connection',(socket)=>{
        console.log('new web socket connection')
        addUser(socket.id, socket.handshake.headers.nickname)
        io.emit('online-users',getOnlineUsers())
        socket.on('send-drawing',(socketId,drawing, session)=>{
          socket.to(socketId).emit('rescive-drawing',{socketId: socket.id, drawing, session})
        })

        socket.on('update-score', async (session) => {
          try {
            const score = new Score({ points: session.totalScore, time: session.totalTime })
            await score.save()
            
          } catch (err) {
            console.log(err.message)
          }
        })
    
        socket.on('disconnect',()=>{
          console.log(socket.handshake.headers.nickname+' disconnected')
          removeUser(socket.id)
          io.emit('user-disconnected', socket.id)
          io.emit('online-users',getOnlineUsers())
        })

      })

    
}

export default socket