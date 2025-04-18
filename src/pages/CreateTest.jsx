import React from 'react'
import {useState} from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleUserRound } from "lucide-react";
import AddQuestionsComp from './AddQuestionsComp';

export default function CreateTest() {
  const [testName,setTestName]=useState('');
  const [description,setDescription]=useState('');
  const [duration,setDuration]=useState(0);
  const [addQuestions,setAddQuestions]= useState(false);


  const handleCreation = async () => {
      if(!testName || !description || !duration)
      { 
        toast.error("All fields are mandatory");
        return;
      }
      if(duration<=0){
        toast.error("Duration must be greater than 0");
        return;
      }
      if(description.length<10)
      {
        toast.error("Description should be of atleast 10 characters");
      }
      try {
          const response = await axios.post("http://localhost:9000/createTest", {
              testName,
              description,
              duration,
          }); 
          if (response.status === 200) {
            localStorage.setItem("testId",response.data.testId);
            setAddQuestions(true);
            toast.success("Test Created successfull");
            console.log(response);
          }
          else if(response.status === 401){
             toast.error("Please Provide Test Name and Desc.");
          } else if(response.status === 409){
            toast.error("Test with same name already exist!");
         }
      } catch (error) {
        toast.error("Something went wrong");
          console.error(error);
      }
  }
  
  return (
    <>
    <div className="p-5 font-sans bg-gray-100 ">
      <div className="border-2 border-green-950">
      <div className='border-2 border-red-700 '>
      <Button variant="outline" aria-label="Open account menu">
          <CircleUserRound  size={20} strokeWidth={2} aria-hidden="true" />
        </Button>
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        <div className="flex flex-col w-full max-w-sm gap-1.5">
          <div className='flex gap-5'>
          <Label className="text-xl text-nowrap">Test Name:</Label>
          <Input type='text' placeholder='Test Name' value={testName} onChange={(e)=>setTestName(e.target.value)} />
          </div>
          <div className='flex gap-5'>
          <Label className="text-xl">Description:</Label>
          <Input type='text' placeholder='Description' value={description} onChange={(e)=>setDescription(e.target.value)} />
          </div>
          <div className='flex gap-5'>
          <Label className="text-xl">Duration:</Label>
            <Input type='number' placeholder='Duration' value={duration} onChange={(e)=>setDuration(e.target.value)}/>
          </div>
             
        </div>
      </div>
       
       <div className=" border-2">
     <button onClick={handleCreation} className="h-20 w-40 p-3 m-2 border-none rounded-md bg-blue-500 text-white cursor-pointer transition duration-300 hover:bg-blue-700 focus:outline-none">Create Test</button>
   </div>
   </div>
   <Toaster richColors position="top-center" />
   {addQuestions &&  <AddQuestionsComp/>}    
  </div>
  </>
  )
}
