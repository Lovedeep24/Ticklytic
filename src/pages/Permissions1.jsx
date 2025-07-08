"use client";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PlayIcon, CameraIcon, MicrophoneIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export default function Permissions() {
  const [video, setVideo] = useState(false);
  const [audio, setAudio] = useState(false);
  // const [screenShare, setScreenShare] = useState(false);
  // const [canHear, setCanHear] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const videoPermission = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setVideo(true);
    } catch (error) {
      toast.error("Please grant access to camera");
      console.log(error);
    }
  };

  const audioPermission = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudio(true);
    } catch (error) {
      toast.error("Please grant access to microphone");
      console.log(error);
    }
  };


  const allPermissionsGranted = video && audio;


  const handleTest=async()=>{
    const testId=localStorage.getItem("testId");
    navigate(`/test/${testId}`);
  }
  return (
    <div className="flex flex-col sm:flex-row border-red-400 items-center justify-center bg-[rgb(22,29,41)] w-screen h-screen">
    
      <div className="sm:w-1/2 w-[100%]   p-4 flex justify-center items-center ">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-[80%] h-auto object-cover border-white border-2 rounded-3xl transform -scale-x-100"
        />
      </div>

    
    <div className="sm:w-1/2 w-full flex flex-col h-[60%] items-center justify-center text-white">
       <div className="flex flex-col items-center justify-center  p-14">
         <h1 className="text-2xl sm:text-3xl font-semibold">Ready to Join?</h1>
           <p className="text-xl sm:text-2xl">Make sure your device is well configured.</p>
       </div>
      

     <div className="flex flex-col items-center space-y-2 px-1 sm:px-10 ">
      <div className="w-sm sm:w-2xl p-4 rounded-lg shadow-md flex items-center space-x-4 border border-white">
          <CameraIcon className="w-8 h-8 text-white" />
          <div className="flex items-center space-x-2 w-full justify-between">
            <span>Allow Camera</span>
            <input
              type="checkbox"
              checked={video}
              onChange={videoPermission}
              className="w-8 h-8 ml-auto"
            />
          </div>
        </div>

      <Toaster richColors position="top-center" />
        <div className="w-sm sm:w-2xl p-4 rounded-lg shadow-md flex items-center space-x-1 sm:space-x-4 border border-white">
          <MicrophoneIcon className="w-8 h-8 text-white" />
          <div className="flex items-center space-x-2 w-full justify-between">
            <span>Allow Microphone</span>
            <input
              type="checkbox"
              checked={audio}
              onChange={audioPermission}
              className="w-8 h-8 ml-auto"
            />
          </div>
        </div>

        <div className="w-sm sm:w-2xl p-2 items-center">
          <div onClick={()=>handleTest()}
            className={`w-full cursor-pointer block px-8 py-3 rounded-lg text-center text-xl font-semibold ${
              allPermissionsGranted? "bg-purple-700 text-white hover:bg-purple-900"
                : "bg-gray-500 text-gray-300 cursor-not-allowed"
            }`}
          >
            Proceed to Test
          </div>
        </div>
     </div>
      
      </div>
    </div>
  );
}
