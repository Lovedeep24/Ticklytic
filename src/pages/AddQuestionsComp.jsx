import React from 'react'
import {useState} from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

export default function AddQuestionsComp({open,setOpen,testId,fetchTests = null}) {
  const [questions,setQuestions]=useState([{id:1,questionText:'',options:['','','',''], correctOption:''}])
  const addNewQuestion=(e)=>{  
    console.log(testId);
    e.preventDefault();
    setQuestions([...questions,{id:questions.length + 1,questionText:'',options:['','','',''],correctOption:0}])
  }
  const resetQuestions = () => {
    setQuestions([{ id: 1, questionText: '', options: ['', '', '', ''], correctOption: '' }]);
  };
  const handleAddQuestions = async (e) => {
    e.preventDefault();
    const testid = testId;
    if(!testid)
    {
      return toast.error("No test ID found");
    }
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
        resetQuestions(); 
        if (fetchTests) fetchTests(); 
        setOpen(false);         
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
      }
    }
  };
return (
  <>
  <Dialog open={open}  onOpenChange={(val) => {
    setOpen(val);
    if (!val) resetQuestions();
    }}
     >
      <DialogContent className=" max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Questions</DialogTitle>
          <DialogDescription>
           You Can Add multiple Questions here
          </DialogDescription>
        </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <form className="flex  flex-col gap-10 items-center justify-center">
          {questions.map((question,questionIndex)=>{
             return(  
            <div key={questionIndex} className='w-full flex flex-col items-center justify-center'>
              <div className="grid w-full max-w-sm  items-center gap-1.5">
              <Label>Question {questionIndex+1}</Label>
              <Textarea
                  className=" p-2 my-2 rounded-md text-base border text-start align-top overflow-auto "
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
        <Button onClick={addNewQuestion} className="px-4 py-2 mt-2 rounded-mdcursor-pointer transition duration-300">Add Another Question</Button>
      </div>
    </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" >
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" onClick={handleAddQuestions}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
)
  
}

