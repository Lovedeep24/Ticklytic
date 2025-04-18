import React from 'react'
// import backgroundimage from "../assets/loginImage.jpg";
// import { Link } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
// import { Boxes } from "@/components/ui/background-boxes"
// import { cn } from "@/lib/utils";
import { SignupForm } from "@/components/ui/signup-form";

export default function Signup() {
    
  return (
 <div>
  <div className="flex items-center justify-center fixed inset-0 w-full h-full  bg-gray-200">
      <SignupForm />
    </div>
    </div>
  )
}
