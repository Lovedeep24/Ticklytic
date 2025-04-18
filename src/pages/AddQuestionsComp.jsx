import React from 'react'
import { useRef ,useState} from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AddQuestionsComp() {
      const [questions,setQuestions]=useState([{id:1,questionText:'',options:['','','',''], correctOption:''}])
      const [options, setOptions] = useState(['', '', '', '']);
      const [questionText, setQuestionText] = useState('');
      const [correctOption, setCorrectOption] = useState();
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
            }
          }
        };
  return (
    <div>
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
    </div>
  )
}
