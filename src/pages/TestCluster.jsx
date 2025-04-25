import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { cn } from "@/lib/utils";
import {
    CheckCircle,
} from "lucide-react";

export default function TestCluster() {
   const[tests,setTests]=useState([]);
    const navigate = useNavigate();
    const fetchtests=async()=>{
      const token = localStorage.getItem('accessToken'); // Retrieve the token
      const decode=jwtDecode(token);
      console.log(decode);
      if (!token) {
        alert("Unauthorized access. Please login.");
        window.location.href = "/login"; // Redirect to login
        return;
      }
      const response=await fetch('http://localhost:9000/tests',{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data=await response.json();
      if(data.data)
      {
        setTests(data.data);
        console.log(data.data);
      }
      else
      {
        console.error("Error fetching tests");
      }
    }
    useEffect(()=>
      { 
      fetchtests()
    },[]);


    const handleTestClick=(id)=>{
      localStorage.setItem("testId",id);
      navigate("/permissions");
    }
  return (
    <div className='bg-black min-h-screen w-full m-0 p-0'>
    <h1 className="text-white text-4xl">Test Cluster</h1>
 
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 max-w-7xl mx-auto">
                {tests.map((test, index) =>{
                   const noOfQuestions = test.questions.length;
                   const createdAt = test.createdAt;
                  const date = new Date(createdAt).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short", 
                      year: "numeric"
                  });
                  return (
              
                    <div onClick={()=>handleTestClick(test._id)}
                    id={test._id}
                        key={index}
                        className={cn(
                            "group relative p-4  rounded-xl overflow-hidden transition-all duration-300 ",
                            "border border-gray-100/80 dark:border-white/10 bg-white dark:bg-black",
                            "hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_2px_12px_rgba(255,255,255,0.03)]",
                            "hover:-translate-y-0.5 will-change-transform",
                        )}>
                        <div
                            className={`absolute inset-0 opacity-0 group-hover:opacity-100
                             transition-opacity duration-300 `}>
                            <div
                                className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:4px_4px]" />
                        </div>
    
                        <div className=" relative flex flex-col space-y-3">
                            <div className="flex items-center justify-between">
                                <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center bg-black/5 dark:bg-white/10 group-hover:bg-gradient-to-br transition-all duration-300">
                                   <CheckCircle className="w-4 h-4 text-emerald-500" />
                                </div>
                                <span
                                    className={cn(
                                        "text-xs font-medium px-2 py-1 rounded-lg backdrop-blur-sm",
                                        "bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300",
                                        "transition-colors duration-300 group-hover:bg-black/10 dark:group-hover:bg-white/20"
                                    )}>
                                    Created on: {date}
                                </span>
                            </div>
    
                            <div className="space-y-2">
                                <h3
                                    className="font-medium text-gray-900 dark:text-gray-100 tracking-tight text-[15px]">
                                    {test.testName}
                                 
                                </h3>
                                <p
                                    className="text-sm text-gray-600 dark:text-gray-300 leading-snug font-[425]">
                                    {test.description}
                                </p>
                            </div>
    
                            <div className="flex items-center justify-between mt-2">
                                <div
                                    className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                                        <span
                                            className="px-2 py-1 rounded-md bg-black/5 dark:bg-white/10 backdrop-blur-sm transition-all duration-200 hover:bg-black/10 dark:hover:bg-white/20">
                                            <p>Duration: {test.duration} min</p>
                                        </span>
                                        <span
                                            className="px-2 py-1 rounded-md bg-black/5 dark:bg-white/10 backdrop-blur-sm transition-all duration-200 hover:bg-black/10 dark:hover:bg-white/20">
                                            <p>{noOfQuestions} Ques</p>
                                        </span>
                                </div>
                                <span
                                    className="text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    Take Test →
                                </span>
                            </div>
                        </div>
                        <div
                            className={`absolute inset-0 -z-10 rounded-xl p-px bg-gradient-to-br from-transparent via-gray-100/50 to-transparent dark:via-white/10 ${
                                test.hasPersistentHover
                                    ? "opacity-100"
                                    : "opacity-0 group-hover:opacity-100"
                            } transition-opacity duration-300`} />
                    </div>
                )})}
            </div>
  </div>
  )
}
