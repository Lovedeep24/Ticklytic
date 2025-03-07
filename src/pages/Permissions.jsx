import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MediaStreamContext } from "../Context/MediaStreamContext";

export default function Permissions() {
  const { stream, setStream } = useContext(MediaStreamContext);
    const [error, setError] = useState('');
    const [isPreviewVisible, setIsPreviewVisible] = useState(false);
    const videoRef = useRef(null);
    const navigate = useNavigate();

    const startTest = async () => {
        try {
          console.log("Requesting camera and microphone access...");
    
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
    
          console.log("Stream obtained:", mediaStream);
    
          setStream(mediaStream);
          setIsPreviewVisible(true);
          setError('');
        } catch (err) {
          console.error("Error accessing media devices:", err);
          setIsPreviewVisible(false);
          setError('Permission denied or no media devices found. Please allow access to your camera and microphone.');
        }
      };
    
      useEffect(() => {
        if (videoRef.current && stream) {
          console.log("Assigning stream to video element...");
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play().catch(err => {
              console.error("Error starting video playback:", err);
            });
          };
        }
      }, [stream]);
    
      const proceedToTest = () => {
        if (stream) {
          navigate('/test');
        } else {
          setError('Please allow camera and microphone access before proceeding.');
        }
      };
  return (
    <div className="bg-gray-900 text-white flex flex-col justify-center items-center h-screen font-sans">
      {!isPreviewVisible && (
        <div>
          <div className="text-white text-center font-bold text-lg mb-5 max-w-lg leading-relaxed">
            The test is about to start. Please ensure your camera and microphone are working properly. Click the button below to begin.
          </div>
          <button onClick={startTest}>Start Test</button>
        </div>
      )}

      {isPreviewVisible && (
        <div className="relative flex flex-col items-center justify-center w-4/5 max-w-[700px] rounded-lg overflow-hidden shadow-lg shadow-black/40">
          <video className="rounded-lg max-w-full h-auto shadow-md shadow-white/30" ref={videoRef} autoPlay muted style={{ width: '100%', height: 'auto' }} />
          <button onClick={proceedToTest} className="bg-white text-gray-900 border-2 border-white px-6 py-3 text-lg font-bold cursor-pointer rounded-lg transition-all duration-300 hover:bg-gray-800 hover:text-white hover:border-white">
            Proceed to Test
          </button>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center font-bold text-base mt-5 shadow-md" style={{ color: 'red' }}>
          {error}
        </div>
      )}
    </div>
  )
}
