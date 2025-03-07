import React, { useState } from 'react'
import styles from "../Styles/Signup.module.css";
import backgroundimage from "../assets/loginImage.jpg";
import { Link } from 'react-router-dom';
import axios from "axios";
export default function Signup() {
    const [email,setEmail]=useState(``);
    const [password,setPassword]=useState(``);
    const [name,setName]=useState(``);
    // const [role,setRole]=useState(``);
     
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
          const response = await axios.post("http://localhost:9000/signup", {
              name,
              email,
              password,
              // role // Uncomment if using roles
          });
  
          console.log(response.status);
          if (response.status === 200) {
              alert("Signup successful!");
          }
      } catch (error) {
          console.error("Error during signup:", error); // Log the entire error object
  
          if (error.response) {
              // Server responded with a status code other than 2xx
              console.log("Response status:", error.response.status);
              if (error.response.status === 400) {
                  alert("User already exists");
              } else if (error.response.status === 404) {
                  alert("All fields mandatory");
              } else {
                  alert("An error occurred");
              }
          } else if (error.request) {
              // Request was made but no response was received
              alert("No response received from the server. Please check your network connection.");
          } else {
              // Something happened in setting up the request
              alert("Error creating request: " + error.message);
          }
      }
  };
  
  return (
    <div>
  <div className="flex justify-center items-center h-screen">
  <div className="w-1/2 h-full flex justify-center items-center bg-gray-100">
        <div className="w-full h-[90%] overflow-hidden">
          <img src={backgroundimage} alt="profile" className="w-full h-full object-cover"  />
        </div>
      </div>
      <div className="w-1/2 h-full flex justify-center items-center pl-12">
        <h2 className="ml-4 mt-24 text-left text-2xl text-black">Sign up</h2>
        <p className="ml-4 mt-4 text-left text-black">
          Already have an account? <span className='text-[#38CB89] font-bold'><Link to="/login">Log in</Link></span>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="w-[70%] h-[40%] my-4 px-2 text-[1.2rem] rounded-md outline-none border border-gray-300 focus:border-blue-500">
            <input
              type="text"
              placeholder="Username"
              className="w-full h-10 my-2 px-2 text-[1.2rem] border-b border-gray-300 outline-none focus:border-blue-500 transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)} />
            <input
              type="email"
               className="w-full h-10 my-2 px-2 text-[1.2rem] border-b border-gray-300 outline-none focus:border-blue-500 transition-all"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            <input
              type="password"
               className="w-full h-10 my-2 px-2 text-[1.2rem] border-b border-gray-300 outline-none focus:border-blue-500 transition-all"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>
        
          <div className="flex items-center ml-4">
            <input
              type="checkbox"
              className='flex w-5 h-5 cursor-pointer accent-black' />
            <label className="ml-4 text-black" htmlFor="terms">I agree to the <span className="font-semibold">terms</span> and <span className="font-semibold">conditions</span></label>
          </div>

          <button type="submit" onClick={handleSubmit} className="w-[68%] h-[50px] ml-4 mt-8 px-2 text-[1.2rem] rounded-md outline-none bg-black text-white cursor-pointer hover:bg-gray-800 transition-all">Sign up</button>
        </form>
      </div>

    </div>
  
    </div>
  );
}
