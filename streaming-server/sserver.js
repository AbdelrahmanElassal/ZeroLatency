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


let iceCandidatesQueue = [];
let isRemoteDescriptionSet = false;



const socket = io('http://localhost:5000');

const config = {
    iceServers: [
        { urls: "stun:stun.l.google.com:19302" }
    ]
};


const peerConnection = new pkg.RTCPeerConnection(config);
const dummyStream = new pkg.MediaStream();
const dummyTrack = dummyStream.getVideoTracks()[0] || dummyStream.getAudioTracks()[0];
if (dummyTrack) {
    peerConnection.addTrack(dummyTrack, dummyStream);
}

peerConnection.addEventListener('icecandidate', event => {
    if (event.candidate) {
        socket.emit('icecandidate', event.candidate);
    }
});

peerConnection.addEventListener('icegatheringstatechange', () => {
    console.log('ICE Gathering State:', peerConnection.iceGatheringState);
});

peerConnection.addEventListener('connectionstatechange', event => {
    console.log('peers are connected ',peerConnection.connectionState)
});

socket.on('offer', async(offer)=>{
    if(offer){
        const remoteDisc = new pkg.RTCSessionDescription(offer);
        await peerConnection.setRemoteDescription(remoteDisc);
        console.log(socket.id , "recieved remote disc");
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit('answer', answer);
        isRemoteDescriptionSet = true;
        iceCandidatesQueue.forEach(async candidate => {
            await peerConnection.addIceCandidate(candidate);
        });
        iceCandidatesQueue = []; 
        console.log(socket.id , "sent my local disc");
    }
})


socket.on('icecandidate', async(candidate)=>{
    if (candidate) {
        if (isRemoteDescriptionSet) {
            try {
                await peerConnection.addIceCandidate(candidate);
                console.log("ICE candidate added");
            } catch (e) {
                console.error('Error adding received ICE candidate', e);
            }
        } else {
            // Buffer ICE candidates until remote description is set
            iceCandidatesQueue.push(candidate);
        }
    } else {
        console.log("Received an empty ICE candidate");
    }
});

