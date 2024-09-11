import {React , useEffect , useState , useRef} from 'react'
import {io} from 'socket.io-client'


async function StartStreaming(callback){
    try{
        
    }catch(error){
        console.error('Error starting streaming', error);
    }
}

function StreamPlayer() {

    const videoRef = useRef(null);
    const peerConnection = useRef(null);
    const [stream , setStream] = useState(null);



    useEffect(() => {
        const getMediaStream = async()=>{
            try{
                const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                setStream(mediaStream);
                videoRef.current.srcObject = mediaStream;
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                  }

            }catch(error){
                console.error('Error getting media stream', error);
            }
        }

        getMediaStream()

    },[]);



    return (
        <div>
            <video ref={videoRef} width='600px' autoPlay playsInline/>
            <button onClick={()=>setStream(null)}>Stop Stream</button>
            <button onClick={()=>StartStreaming()}>Start Stream</button>
            
        </div>
    );
}


export default StreamPlayer;