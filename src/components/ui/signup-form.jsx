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


export function SignupForm() {
const [isOpen, setIsOpen] = useState(false);
const[isLoading, setIsLoading] = useState(false);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [firstname, setFirstname] = useState("");
const [lastname, setLastname] = useState("");
const[confirmPassword, setConfirmPassword] = useState("");
const navigate = useNavigate();
const [errors, setErrors] = useState({
  firstname: false,
  lastname: false,
  email: false,
  password: false,
  confirmPassword: false,
});

  const handleSubmit = async(e) => {
    e.preventDefault();
    let newErrors = {
      firstname: firstname.trim() === "",
      lastname: lastname.trim() === "",
      email: email.trim() === "",
      password: password.trim() === "",
      confirmPassword: confirmPassword.trim() === "" || confirmPassword !== password,
    };
    setErrors(newErrors);
    if (newErrors.confirmPassword && confirmPassword.length > 0) {
      toast.error("Passwords do not match!"); 
      return;
    }
    if (Object.values(newErrors).includes(true)) {
      return toast.error("All fields are mandatory");
    }
    else{
      const fullName = `${firstname} ${lastname}`.trim();
      try {
        setIsLoading(true);
        const response = await axios.post("http://localhost:9000/signup", {
            name:fullName,
            email,
            password,
        });
        console.log(response.status);
        if (response.status === 200) {
          toast.success("Signed up successfully!");
          setIsLoading(false); 
          navigate("/login");
          console.log("Form submitted");
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
              toast.error("Check your email and password");
            } else if (error.response.status === 400) {
              toast.error("Email already exists");
            }
              else if (error.response.status === 404) {
                toast.error("All fields are mandatory");
            } else {
              toast.error("Something went wrong. Please try again later.");
            }
            setIsLoading(false);
        }
      }
    }

  };

return (
    <div 
    className="h-full w-full  mx-auto flex items-center justify-center p-4 md:p-8 shadow-input bg-white ">
      <form className=" h-[80%] sm:w-[80%] w-[90%]  p-4" onSubmit={handleSubmit}>
      <h1 className="text-3xl font-bold mb-20">SIGNUP TO <span className="text-[#7142CA]">TICKLYTIC</span></h1>
        <div
          className=" flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer className={"w-full text-start"}>
            <Label htmlFor="firstname" className="text-xl">First name</Label>
            <Input id="firstname" placeholder="Tyler" type="text" className={`text-xl ${errors.firstname ? "border-red-500" : ""}`} value={firstname} onChange={(e)=>setFirstname(e.target.value)}/>
          </LabelInputContainer>
          <LabelInputContainer className={"w-full text-start"}>
            <Label htmlFor="lastname" className="text-xl">Last name</Label>
            <Input id="lastname" placeholder="Durden" type="text" value={lastname}  className={`text-xl ${errors.lastname ? "border-red-500" : ""}`} onChange={(e)=>setLastname(e.target.value)} />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className={"w-full text-start mb-4"}>
          <Label htmlFor="email" className="text-xl">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@ticklytic.com" type="email" value={email} className={`text-xl ${errors.email ? "border-red-500" : ""}`} onChange={(e)=>setEmail(e.target.value)} />
          <p className=" text-lg text-[#6C24BE]" role="region" aria-live="polite">
        We won&lsquo;t share your email with anyone
      </p>
        </LabelInputContainer>
        <LabelInputContainer className={"w-full text-start mb-4"}>
          <Label htmlFor="password" className="text-xl">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" value={password}  className={`text-xl ${errors.password ? "border-red-500" : ""}`} onChange={(e)=>setPassword(e.target.value)} />
        </LabelInputContainer>
        <LabelInputContainer className={"w-full text-start mb-4"}>
          <Label htmlFor="confirmpassword" className="text-xl">confirm password</Label>
          <Input id="confirmpassword" placeholder="••••••••" type="confirmpassword" value={confirmPassword}  className={`text-xl ${errors.confirmPassword ? "border-red-500" : ""}`} onChange={(e)=>setConfirmPassword(e.target.value)} />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br text-lg relative group/btn bg-[#6C24BE] w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit">
          {isLoading ? "Signing in..." :  "Sign up →" } 
          <BottomGradient />
        </button>
        <Toaster richColors position="top-center" />
        <div
          className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-3 h-[1px] w-full" />
        
        <div className="flex w-full items-center justify-center gap-2">
        
          <div className="flex items-center justify-center h-[100%] text-lg">
            <p> Already have an account? 
            <span 
              className="font-bold cursor-pointer text-[#6C24BE] hover:underline text-lg"
              onClick={() => navigate("/login")}>
            Login
            </span>
              </p>
          </div>
        </div>
      </form>
        <Toaster richColors position="top-center" />
    </div>
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