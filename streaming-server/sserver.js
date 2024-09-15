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


const config = {
    iceServers: [
        { urls: "stun:stun.l.google.com:19302" }
    ]
};


let iceCandidateMap = {};
let isRemoteDescriptionMap = {};
let peerConnectionMap = {};


const socket = io('http://localhost:5000');


socket.on('offer', async(offer)=>{

    let id = offer.id;
    iceCandidateMap[id] = [];
    const peerConnection = new pkg.RTCPeerConnection(config);
    // const dummyStream = new pkg.MediaStream({video : true , audio : true});
    // const dummyTrack = dummyStream.getVideoTracks()[0] || dummyStream.getAudioTracks()[0];
    // if (dummyTrack) {
    //     peerConnection.addTrack(dummyTrack, dummyStream);
    // }

    peerConnectionMap[id] = peerConnection;
    isRemoteDescriptionMap[id] = false;

    console.log('peer   ', peerConnectionMap[id]);
    peerConnectionMap[id].addEventListener('track', async (event) => {
        console.log('track', event.streams)
    });

    peerConnectionMap[id].addEventListener('icecandidate', event => {
        if (event.candidate) {
            socket.emit('icecandidate', event.candidate);
        }
    });

    peerConnectionMap[id].addEventListener('icegatheringstatechange', () => {
        console.log('ICE Gathering State:', peerConnectionMap[id].iceGatheringState);
    });

    peerConnectionMap[id].addEventListener('connectionstatechange', event => {
        console.log('peers are connected ',peerConnectionMap[id].connectionState)
    });

    
    
    if(offer){
        const remoteDisc = new pkg.RTCSessionDescription(offer);
        await peerConnectionMap[id].setRemoteDescription(remoteDisc);
        console.log(socket.id , "recieved remote disc");
        const answer = await peerConnectionMap[id].createAnswer();
        await peerConnectionMap[id].setLocalDescription(answer);
        socket.emit('answer', answer);
        isRemoteDescriptionMap[id] = true;
        if(iceCandidateMap[id]){
            iceCandidateMap[id].forEach(async candidate => {
                await peerConnectionMap[id].addIceCandidate(candidate);
                console.log("ICE candidate added");
            });
        }
        iceCandidateMap[id] = [];
        console.log(socket.id , "sent my local disc");
    }
})


socket.on('icecandidate', async(candidate)=>{
    let id = candidate.id;
    if (candidate) {
        if (isRemoteDescriptionMap[id]) {
            try {
                await peerConnectionMap[id].addIceCandidate(candidate);
                console.log("ICE candidate added");
            } catch (e) {
                console.error('Error adding received ICE candidate', e);
            }
        } else {
            // Buffer ICE candidates until remote description is set
            iceCandidateMap[id].push(candidate);
        }
    } else {
        console.log("Received an empty ICE candidate");
    }
});


  
