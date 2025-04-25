import React from 'react'
import {useState} from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import AddQuestionsComp from './AddQuestionsComp';
import { useCharacterLimit } from "@/hooks/use-character-limit";
import { useId } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";


export default function CreateTest() {
  const [testName,setTestName]=useState('');
  const [description,setDescription]=useState('');
  const [testId,setTestId]=useState('');  
  const [duration,setDuration]=useState(0);
  const [openQuestionDialog,setOpenQuestionDialog]= useState(false);
  const id = useId();
  const maxLength = 50;
  const {
    value,
    characterCount,
    handleChange,
    maxLength: limit,
  } = useCharacterLimit({ maxLength });


  const handleCreation = async () => {
    const token = localStorage.getItem("accessToken");
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
        return;
      }
      try {
          const response = await axios.post("http://localhost:9000/createTest",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              }
            } ,{
              testName,
              description,
              duration,
          }); 
          if (response.status === 200) {
            setTestId(response.data.testId);
            console.log(testId);
            toast.success("Test Created successfull");
            setOpenQuestionDialog(true);
            setTestName('');
            setDescription('');
            setDuration(0);

          }
          else{
            toast.error("Test not created");
            console.log(response);
          }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 409) {
          toast.error("Test with same name already exists!");
        } else {
          toast.error("Something went wrong");
          console.error(error);
        }
      }
  }
  
  return (
    <>
    <div className="p-5 font-sans boorder-2  bg-gray-100 ">
      <div className='border-2  w-auto border-red-700 '>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline" aria-label="Open account menu">
              <CircleUserRound size={25} strokeWidth={1.5} aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-w-64">
            <DropdownMenuLabel className="flex flex-col">
              <span>Signed in as</span>
              <span className="text-xs font-normal text-foreground">k.kennedy@originui.com</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Option 1</DropdownMenuItem>
                <DropdownMenuItem>Option 2</DropdownMenuItem>
                <DropdownMenuItem>Option 3</DropdownMenuItem>
              </DropdownMenuGroup>
           <DropdownMenuSeparator />
            <DropdownMenuItem>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col w-full justify-center items-center">
        <div className="flex flex-col w-[30%] p-5 rounded-xl gap-5 border-2 ">
          <div className='flex flex-col gap-1 text-start'>
          <Label className="text-lg ">Test Name:</Label>
          <Input type='text' placeholder='Test Name' value={testName} onChange={(e)=>setTestName(e.target.value)} />
          </div>

           <div className="flex flex-col gap-1 text-start">
              <Label htmlFor={id} className="text-lg">Test Description</Label>
              <div className="relative">
                <Input
                  placeholder="Description"
                  id={id}
                   className="peer pe-14 p-2 rounded-md border "
                  type="text"
                  value={value}
                  maxLength={maxLength}
                  onChange={(e) => {
                    handleChange(e);
                    setDescription(e.target.value);
                  }}
                  aria-describedby={`${id}-description`}
                />
                <div
                  id={`${id}-description`}
                  className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-xs tabular-nums text-muted-foreground peer-disabled:opacity-50"
                  aria-live="polite"
                  role="status"
                >
                  {characterCount}/{limit}
                </div>
              </div>
            </div>
          <div className='flex flex-col text-start gap-2'>
          <Label className="text-lg">Duration:</Label>
            <Input type='number' placeholder='Duration (min)' value={duration} onChange={(e)=>setDuration(e.target.value)}/>
            
          </div>
             
        </div>
      </div>
       
       <div className=" border-2">
     <InteractiveHoverButton onClick={handleCreation} />
   </div>
   <Toaster richColors position="top-center" />
    <AddQuestionsComp open={openQuestionDialog} setOpen={setOpenQuestionDialog} testId={testId} />
  </div>
 </>
  )
}
