import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Results() {
    const navigate = useNavigate();
  
  return (
    <div className="flex justify-center items-center h-screen bg-white text-black font-sans">
      <div className="text-center bg-gray-100 border border-gray-300 p-8 rounded-lg shadow-md w-11/12 max-w-lg box-border">
        <h1 className="ml-[-15rem] text-2xl font-bold text-black mb-5">Thank You for Taking the Test!</h1>
        <p className="text-lg mb-5">Your test has been successfully submitted.</p>
        <p className="text-lg mb-5">Your test results will be sent to your email address shortly. Please check your inbox (and spam folder) for the results.</p>
        <button className="bg-black text-white text-base py-3 px-6 border-none rounded-md cursor-pointer transition duration-300 ease-in-out w-full max-w-[200px] mt-5 ml-[-1rem] hover:bg-gray-800" onClick={() => navigate('/')}>Go to Home</button>
      </div>
    </div>
  )
}
