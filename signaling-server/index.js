import express from 'express';
import cors from 'cors';
import { globalErrorHandler } from './middlewares/globalErrorHandler.js';
import authRouter from './routes/authRoutes.js';
import * as socketio from 'socket.io';




const app = express();


app.use(cors({
  origin: ["http://localhost:3000", "https://localhost:8080"],
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());

app.use(authRouter);
app.get('/' , (req , res)=>{
  res.json({ message: 'Hello from the server!' });
})


app.use(globalErrorHandler);

const signalingServer = app.listen(5000, () => {
    console.log(`Server is running on http://localhost:5000`);
});

const io = new socketio.Server(signalingServer,{
  cors: {
    origin: ["http://localhost:3000", "https://localhost:8080"],
    methods: ["GET", "POST"],
    credentials: true
  },
});


io.on('connection', (socket) => {
  console.log(socket.id);
  socket.on('offer' , (offer) => {
    console.log(socket.id , ' sent an offer');
    socket.broadcast.emit('offer', {id:socket.id, ...offer});
  })

  socket.on('answer', (answer) => {
    socket.broadcast.emit('answer', answer);
    console.log(socket.id , ' sent an answer');
  })

  socket.on('icecandidate' , (candidate) => {
    console.log(socket.id , ' sent an ICE');
    socket.broadcast.emit('icecandidate', {...candidate, id:socket.id});
  });
});