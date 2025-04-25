import React from 'react';
import LoginForm from '@/components/ui/loginForm';
import login from '../assets/login.mp4'
export default function Login() {
  
  return (
     <div className='bg-gray-200 flex items-center justify-center h-screen w-full'> 
        <div className='w-1/2 h-[100vh]  bg-gray-200'>
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src={login} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="w-1/2  flex items-center justify-center h-full  ">
          <LoginForm/>
        </div>
      </div>  
  )
}
