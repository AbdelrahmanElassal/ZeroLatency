import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";// const io  = require('socket.io-client');


const socket = io('http://localhost:8080');

const remoteVideo = document.querySelector('.remoteVideo');


socket.on('track',(stream)=>{
    remoteVideo.srcObject = stream;
    console.log('recieved video ' , stream);
})

