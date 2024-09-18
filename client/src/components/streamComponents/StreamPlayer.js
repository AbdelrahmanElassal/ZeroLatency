import {React , useEffect , useState , useRef} from 'react'
import {io} from 'socket.io-client'
import adapter from 'webrtc-adapter';



function StreamPlayer() {
    const videoRef = useRef(null);
    const peerConnection = useRef(null);
    const [stream , setStream] = useState(null);
    const iceCandidatesQueue = useRef([]); 
    const isRemoteDescriptionSet = useRef(false); 


    useEffect(() => {
        const getMediaStream = async()=>{
            try{
                const constraints = {
                    video: true, // Set basic constraints for testing
                    audio: true
                };
               const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
                setStream(mediaStream);
                // Extract the video track only
                const videoTrack = mediaStream.getVideoTracks()[0];
                // Create a new MediaStream with only the video track
                const videoOnlyStream = new MediaStream([videoTrack]);
                videoRef.current.srcObject = videoOnlyStream;
                
                if (videoRef.current) {
                    videoRef.current.srcObject = videoOnlyStream;
                }
            }catch(error){
                console.error('Error getting media stream', error);
            }
        }
        getMediaStream()
    },[]);




    const startingStream = async ()=>{
        if(peerConnection.current){
            return;
        }
        const socket = io('http://localhost:5000'); 
        const config = {
            iceServers: [
                { urls: "stun:stun.l.google.com:19302" }
                ]
        };
        peerConnection.current = new RTCPeerConnection(config);
        console.log('can or not ice ' , peerConnection.current.canTrickleIceCandidates)
        stream.getTracks().forEach(track => peerConnection.current.addTrack(track, stream));
        stream.getTracks().forEach(track => console.log('added Track ' , track));

        console.log(peerConnection.current.getSenders())
        peerConnection.current.addEventListener('icecandidate', event => {
            if (event.candidate) {
                socket.emit('icecandidate', event.candidate);
            }
        });


        peerConnection.current.addEventListener('icegatheringstatechange', () => {
            console.log('ICE Gathering State:', peerConnection.current.iceGatheringState);
        });

        peerConnection.current.addEventListener('connectionstatechange', event => {
            console.log('peers are connected ',peerConnection.current.connectionState);
        });
        

        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        console.log('SDP Offer:', offer.sdp);

        socket.emit('offer', offer);

        socket.on('answer',async(answer)=>{
            const remoteDisc = new RTCSessionDescription(answer);
            await peerConnection.current.setRemoteDescription(remoteDisc); 
            isRemoteDescriptionSet.current = true;
            console.log(socket.id, "recieved answer");
    
            iceCandidatesQueue.current.forEach(async candidate => {
                await peerConnection.current.addIceCandidate(candidate);
            });
            iceCandidatesQueue.current = []; // Clear the buffer after processing
        });

        socket.on('icecandidate', async(candidate)=>{
            if (candidate) {
                if (isRemoteDescriptionSet.current) {
                    try {
                        await peerConnection.current.addIceCandidate(candidate);
                        console.log("ICE candidate added");
                    } catch (e) {
                        console.error('Error adding received ICE candidate', e);
                    }
                } else {
                    // Buffer ICE candidates until remote description is set
                    iceCandidatesQueue.current.push(candidate);
                }
            } else {
                console.log("Received an empty ICE candidate");
            }
        
        });

    }


    return (
        <div className="video-container">
            <video ref={videoRef} width='600px' autoPlay playsInline/>
            <button onClick={()=>setStream(null)}>Stop Stream</button>
            <button onClick={startingStream}>Start Stream</button>
            
        </div>
    );
}


export default StreamPlayer;