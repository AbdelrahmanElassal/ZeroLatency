import express from 'express';
import {io} from 'socket.io-client';
import cors from 'cors';
import pkg from 'wrtc';
const app = express();



app.use(cors());
app.use(express.static('public'));


const server = app.listen(8080 , ()=>{
    console.log('server is listening on port 8080')
});




const socket = io('http://localhost:5000');

const config = {'iceServers': [
    { 'urls': 'stun:stun.l.google.com:19302'}
]}


const peerConnection = new pkg.RTCPeerConnection(config);
peerConnection.addEventListener('icecandidate', event => {
    if (event.candidate) {
        socket.emit.broadcast('icecandidate', event.candidate);
    }
});

peerConnection.addEventListener('connectionstatechange', event => {
    if (peerConnection.connectionState === 'connected') {
        console.log('peers are connected');
    }
});

socket.on('offer', async(offer)=>{
    if(offer){
        const remoteDisc = new pkg.RTCSessionDescription(offer);
        await peerConnection.setRemoteDescription(remoteDisc);
        console.log(socket.id , "recieved remote disc");
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit('answer', answer);
        console.log(socket.id , "sent my local disc");
    }
})


socket.on('icecandidate', async(candidate)=>{
    if (candidate) {
        try {
            console.log("candidate")
            await pkg.peerConnection.addIceCandidate(candidate);
        } catch (e) {
            console.error('Error adding received ice candidate', e);
        }
    }
});

