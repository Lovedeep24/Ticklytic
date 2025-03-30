import React from 'react'
import { useRef ,useState} from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CircleUserRound } from "lucide-react";
// import { Button } from "@/components/ui/button";


export default function CreateTest() {
  const [questions,setQuestions]=useState([{id:1,questionText:'',options:['','','',''], correctOption:''}])
  const [options, setOptions] = useState(['', '', '', '']);
  const [questionText, setQuestionText] = useState('');
  const [correctOption, setCorrectOption] = useState();
  const [testName,setTestName]=useState('');
  const [description,setDescription]=useState('');
  const [duration,setDuration]=useState(0);
  const [addQuestions,setAddQuestions]= useState(false);
  const addNewQuestion=(e)=>{  
    e.preventDefault();
    setQuestions([...questions,{id:questions.length + 1,questionText:'',options:['','','',''],correctOption:0}])
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const testId = localStorage.getItem("testId");
    console.log(questions);
    const isInvalid = questions.some(
      (q) =>
        q.questionText.trim() === '' ||
        q.options.some((opt) => opt.trim() === '') ||
        q.correctOption === ''
    );
    
    if (isInvalid) {
      toast.error("All fields are required");
      return;
    }
    try {
      const response = await axios.patch(`http://localhost:9000/${testId}/ques-to-test`, {
          questions
      });
      if (response.status === 200) {
        toast.success("Questions inserted successfully");
        setQuestionText('');
        setOptions(['', '', '', '']);
        setCorrectOption('');
        setAddQuestions(false);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          toast.error("All fields are mandatory");
        } else if (error.response.status === 400) {
         toast.error("Must give 4 options");
        } else if (error.response.status === 409) {
          toast.error("Question already exists in the database");
        } else {
          toast.error("Internal server error");
        }
      } else {
        toast.error("Network error");
      }
    }
  };

  const handleCreation = async () => {
      if(!testName || !description || !duration)
      { 
        toast.error("All fields are mandatory");
        return;
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

  {addQuestions && 
   <div className="border-2 border-green-900 flex flex-col items-center justify-center">
    <form className="border-2 border-green-900 flex w-[70%] flex-col items-center justify-center">
    {questions.map((question,questionIndex)=>{
     return(  <div key={questionIndex} className='border-2 w-full flex flex-col items-center justify-center'>
      <div className="grid w-full max-w-sm  items-center gap-1.5">
      <Label>Question</Label>
      <Textarea
          className=" p-2 my-2 rounded-md text-base border text-start align-top overflow-auto border-gray-300"
            type="text"
            placeholder="Enter Question"
            value={question.questionText}
            onChange={(e) => {
              const newQuestion=[...questions];
              newQuestion[questionIndex].questionText=e.target.value;
              setQuestions(newQuestion);
            }}
          />
          </div>
          <div className='w-full max-w-sm flex flex-col items-start'>
          {question.options.map((option, optionIndex) => {
            return(
              <div className="grid w-full max-w-sm  items-center gap-1.5">
              <Label htmlFor={`option${optionIndex}`}>Option {optionIndex }</Label>
            <Input
              className="w-full p-2 my-2 rounded-md text-base border border-gray-300"
                key={optionIndex}
                type="text"
                placeholder={`Enter Option ${optionIndex }`}
                value={option}
                onChange={(e) => {
                  const newQuestion = [...questions];
                  newQuestion[questionIndex].options[optionIndex] = e.target.value;
                  setQuestions(newQuestion);
                }}
              />
            </div>
            );
            })}
          </div>
       
          <div className="grid gap-1.5">
          <Label htmlFor="correctOption">Correct Option Index (0-3): </Label>
            <Input
              type="number"
              id="correctOption"
              value={questions[questionIndex]?.correctOption ?? ''}
              onChange={(e) => {
                const newQuestion = [...questions];
                // Convert the input value to a number to avoid storing it as a string
                newQuestion[questionIndex].correctOption = parseInt(e.target.value, 10);
                setQuestions(newQuestion);
              }}
              min="0"
              max="3"
            />
            </div>
          <div>
      </div>
          </div>) 

    })}
      </form>
      <button onClick={addNewQuestion} className="px-4 py-2 rounded-md bg-blue-500 text-white cursor-pointer transition duration-300 hover:bg-blue-600">Add Another Question</button>
      <button onClick={handleSubmit} className="px-4 py-2 rounded-md bg-blue-500 text-white cursor-pointer transition duration-300 hover:bg-blue-600" type="submit">Add Questions</button>
      </div>
   }
  
      
   </div>

   
   </>
  
  )
}
