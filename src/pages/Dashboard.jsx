import React from 'react'
import { Link } from 'react-router-dom';
import { ParticleButton } from "@/components/ui/particle-button"
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
export default function Dashboard() {
  return (
    <>
     <BackgroundBeamsWithCollision>
      <div className='flex w-full flex-col gap-13'>
      <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
      Tick Your Way to the Top with {" "}
      <br/>
        <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
          <div className="absolute left-0 top-[1px] bg-clip-text  bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
            <span className="">Ticklytic! </span>
          </div>
          <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
            <span className="">Ticklytic! </span>
          </div>
        </div>
      </h2>
      <Link to="/signup" className='w-auto'>
      <ParticleButton successDuration={1000} variant="default">
            Get Started
        </ParticleButton>
      </Link>
   
      </div>
     
    </BackgroundBeamsWithCollision>
    </>
  //   <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 text-center p-5">
  //   <h2 className="text-4xl mb-5 text-gray-800">Welcome to the MCQ Test Platform</h2>
  //   <p className="text-lg mb-10 max-w-xl leading-relaxed">This platform allows students to take multiple-choice question tests, manage their profiles, and view their results.</p>
    
  //   <div className="flex flex-col gap-4">
  //     <Link to="/login" className="inline-block text-lg px-5 py-2.5 rounded text-white bg-blue-500 transition-colors duration-300 hover:bg-blue-600">Login</Link>
  //     <Link to="/signup" className="inline-block text-lg px-5 py-2.5 rounded text-white bg-blue-500 transition-colors duration-300 hover:bg-blue-600">Signup</Link>
  //     <Link to="/admin">Admin Portal</Link>
  //   </div>
  // </div>
  )
}
