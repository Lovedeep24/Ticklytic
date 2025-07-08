"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
const[isLoading, setIsLoading] = useState(false);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [role, setRole] = useState("");
const navigate = useNavigate();
const [errors, setErrors] = useState({
  email: false,
  password: false,
});

  const handleLogin = async(e) => {
    e.preventDefault();

    let newErrors = {
      email: email.trim() === "",
      password: password.trim() === "",
    };
    setErrors(newErrors);
    if (Object.values(newErrors).includes(true)) {
      return;
    }
    else{
      try {
        setIsLoading(true);
        const response = await axios.post("http://localhost:9000/login", {
            email,
            password,
            role
        });
        console.log(response.data);
        if (response.status === 200) {
          localStorage.setItem("accessToken", response.data.accessToken);
          setIsLoading(false);
          if(role === "User")
          {
            localStorage.setItem("userId",response.data.userId);
            toast.success("login successfull"); 
            navigate("/tests")
            console.log("login success");
          }
          else if(role === "Admin")
          {
            toast.success("login successfull");
            navigate("/admin");
            console.log("login success");
          }
       
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
              toast.error("Not Authorized");
            } else if (error.response.status === 400) {
              toast.error("Incorrect Password");
            }
              else if (error.response.status === 403) {
                toast.error("Email not Registered");
            } else {
              toast.error("Something went wrong. Please try again later.");
            }
            setIsLoading(false);
        }
      }
    }
  };




  return (
    (<div className="h-full w-full mx-auto flex items-center justify-center p-4 md:p-8 shadow-input bg-white dark:bg-black">
 
      <div className=" h-[100%] w-[65%] flex gap-1 flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-20">LOGIN TO <span className="text-[#7142CA]">TICKLYTIC</span></h1>
        <LabelInputContainer className="mb-4 text-start">
          <Label htmlFor="email" className="text-xl">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" value={email} className={`p-5 text-xl ${errors.email ? "border-red-500" : ""}`} onChange={(e)=>setEmail(e.target.value)} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4  text-start ">
          <Label htmlFor="password"  className="text-xl">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" value={password}  className={`p-5 text-xl ${errors.password ? "border-red-500" : ""}`} onChange={(e)=>setPassword(e.target.value)} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
            <div className="flex gap-5 items-center">
                <div className="flex items-center justify-center gap-1">
                <Input 
                  id="role-admin" 
                  type="radio" 
                  name="role"
                  value="Admin"
                  className={`w-5 h-5 text-xl `}
                  onChange={(e) => setRole(e.target.value)}
                />  
                <Label htmlFor="role-admin" className="text-xl">Admin</Label>
                </div>
             
            
                <div className="flex items-center justify-center gap-1">
                <Input 
                  id="role-user" 
                  type="radio" 
                  name="role"
                  value="User"
                  className="w-5 h-5 text-xl"
                  onChange={(e) => setRole(e.target.value)}
                />
                <Label htmlFor="role-user" className="text-xl">User</Label>
                </div>
          
            
            </div>
          
        </LabelInputContainer>
        <button
          className="bg-gradient-to-br relative group/btn bg-[#6C24BE] w-full text-lg text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit" onClick={handleLogin}>
          {isLoading ? "Logging in.." : "Login →"}
          <BottomGradient />
        </button>
        <Toaster richColors position="top-center" />
        <div
          className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-3 h-[1px] w-full" />
        
        <div className="flex w-full items-center justify-center gap-2">
          <div className="flex items-center justify-center h-[100%] text-lg">
            <p> Don't have an account?  
            <span 
              className="font-bold cursor-pointer text-black-600 hover:underline text-lg text-[#6C24BE]"
              onClick={() => navigate("/signup")}>
             Signup
            </span>
              </p>
          </div>
        </div>
      </div>
     <Toaster richColors position="top-center" />
    </div>)
  );
}

const BottomGradient = () => {
  return (<>
    <span
      className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span
      className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>);
};

const LabelInputContainer = ({
  children,
  className
}) => {
  return (
    (<div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>)
  );
};