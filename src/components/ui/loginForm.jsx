"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import {
  IconBrandGoogle
} from "@tabler/icons-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {

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
        const response = await axios.post("http://localhost:9000/login", {
            email,
            password,
            role
        });
        console.log(response.status);
        if (response.status === 200) {
          localStorage.setItem("accessToken", response.data.accessToken);
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
        }
      }
    }
  };




  return (
    (<div 
    className="h-full w-full mx-auto flex items-center justify-center p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <form className="" onSubmit={handleLogin}>
        <LabelInputContainer className="mb-4 text-start">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" value={email} className={errors.email ? "border-red-500" : ""} onChange={(e)=>setEmail(e.target.value)} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4  text-start ">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" value={password}  className={errors.password ? "border-red-500" : ""} onChange={(e)=>setPassword(e.target.value)} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
            <div className="flex gap-5 items-center">
                <div className="flex items-center justify-center gap-1">
                <Input 
                  id="role-admin" 
                  type="radio" 
                  name="role"
                  value="Admin"
                  className={`w-5 h-5 errors.role ? "border-red-500" : "" `}
                  onChange={(e) => setRole(e.target.value)}
                />  
                <Label htmlFor="role-admin">Admin</Label>
                </div>
             
            
                <div className="flex items-center justify-center gap-1">
                <Input 
                  id="role-user" 
                  type="radio" 
                  name="role"
                  value="User"
                  className={`w-5 h-5 errors.role ? "border-red-500" : "" `}
                  onChange={(e) => setRole(e.target.value)}
                />
                <Label htmlFor="role-user">User</Label>
                </div>
          
            
            </div>
          
        </LabelInputContainer>
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit">
          Login &rarr;
          <BottomGradient />
        </button>
        <Toaster richColors position="top-center" />
        <div
          className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-3 h-[1px] w-full" />
        
        <div className="flex w-full items-center justify-center gap-2">
          <div className="w-12 flex flex-col space-y-4">
            <button
              className=" relative group/btn  flex space-x-2 items-center justify-start px-4 w-auto text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="submit">
              <IconBrandGoogle className="h-8 w-8 text-neutral-800 dark:text-neutral-300" />
              {/* <BottomGradient /> */}
            </button>
          </div>
          <div className="flex items-center justify-center h-[100%]">
            <p> Don't have an account?  
            <span 
              className="font-bold cursor-pointer text-black-600 hover:underline"
              onClick={() => navigate("/signup")}>
             Signup
            </span>
              </p>
          </div>
        </div>
      </form>
     
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