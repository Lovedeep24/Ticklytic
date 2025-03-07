import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import styles from "../Styles/Login.module.css";
import axios from "axios";
import backgroundimage from "../assets/loginImage.jpg";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[role,setRole]=useState('');
    const navigate = useNavigate();  // Hook for navigation

    // Function to handle successful login
    const handleLoginSuccess = (accessToken) => {
           if (accessToken) {
               localStorage.setItem('accessToken', accessToken);  // Store the token
               console.log("Token stored successfully");
               const decodedToken = jwtDecode(accessToken);
               console.log("Decoded token:", decodedToken);
               const expirationTime = decodedToken.exp;
               const expirationDate = new Date(expirationTime * 1000);
               console.log("Expiration Date:", expirationDate);
               const userRole = decodedToken.user.role; // Extract role from the token
               console.log("User role:", userRole);
               if (userRole === 'Admin') {
                   navigate('/admin'); // Redirect to Admin Dashboard
               } else if (userRole === 'User') {
                   navigate('/tests'); // Redirect to User Dashboard
               }
               // Redirect to Permissions page
           } else {
               console.error("Failed to store token");
           }
       };
    
       const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post("http://localhost:9000/login", {
                email,
                password,
                role
            });
    
          
    
            if (response.status === 200) {
                const {accessToken} = response.data;  // Extract the token
                if (accessToken) {
                    alert("Login Successful");
                    handleLoginSuccess(accessToken); // Store the token and navigate
                } else {
                    console.error("Token not found in response");
                }
            }
        } catch (error) {

            console.log("Error:", error);
            if(error.response)
            {
                // console.log("Error status:", error.response);
                if (error.response.status === 404) {
                    alert("User not found");
                } else if (error.response.status === 400) {
                    alert("Invalid password");}
                    else if (error.response.status === 401) {
                        alert("Not Authorized");
                } else {
                    alert("All Fields are required");
                }
            }
            
        }
    };
  return (
    <>
          <div className="flex justify-center items-center border-2 border-black">
               <div  class="w-1/2 h-full flex border-2 justify-center items-center bg-gray-100">
                    <div class="w-full h-[90%] overflow-hidden">
                        <img src={backgroundimage} alt="profile" class="w-full h-full object-contain block" />
                    </div>
                </div>
            <div class="w-1/2 h-full border-2 pl-12 flex justify-center items-center">
            <h2 class="ml-4 mt-24 text-start text-2xl text-black">Log in</h2>
                    <p class="ml-4 mt-4 text-start text-black">
                        Don't have an account? <span  class="text-[#38CB89] font-bold"><Link to="/signup">Sign up</Link></span>
                    </p>
            <form onSubmit={handleSubmit}>
                        <div class="w-[70%] h-[40%] my-4 px-2 text-lg rounded-md outline-none border border-gray-300 focus:border-blue-500" >
                            <input 
                              class="w-full h-10 border-0 border-b border-gray-300 outline-none px-2 text-lg focus:border-blue-500" 
                                type="text" 
                                placeholder="Email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                            <input 
                              class="w-full h-10 border-0 border-b border-gray-300 outline-none px-2 text-lg focus:border-blue-500" 
                                type="password" 
                                placeholder="Password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>
                        <div className='flex items-center mt-4 ml-4'>
                            <label>
                                <input type="radio"value="Admin"checked={role === 'Admin'} onChange={(e) => setRole(e.target.value)}disabled={false} />Admin
                            </label>
                            
                            <label>
                                <input  type="radio"  value="User"  checked={role === 'User'} onChange={(e) => setRole(e.target.value)}disabled={false}/>User
                            </label>
                        </div>
                
                        
                        <div class="flex items-center mt-4 ml-4">
                            <input 
                            class="mr-2"
                                type="checkbox" 
                                id="terms" 
                                // checked={termsAccepted} 
                                // onChange={() => setTermsAccepted(!termsAccepted)} 
                            />

                            <label htmlFor="terms" class="text-sm text-gray-700">Remember <span class="text-black">me</span></label>
                            <div className="mt-[20px] ml-[20px]">
                                <a href="#" className='text-black font-bold cursor-pointer'>Forgot Password?</a>
                            </div>
                        </div>
        <button type="submit"  class="w-[68%] h-12 ml-4 mt-8 px-2 text-lg rounded-md outline-none bg-black text-white cursor-pointer hover:bg-gray-800 transition">Log in</button>
                    </form>
            </div>
        </div>
        </>
      
  )
}
