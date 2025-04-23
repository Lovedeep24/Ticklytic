import React, { useState, useEffect,useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { SlidingNumber } from '@/components/ui/sliding-number';
import AlertDailogBox from './AlertDailogBox';
import axios from 'axios';
import { toast } from 'sonner';

export default function Test() {
    const [questions, setQuestions] = useState([]);
    const [testName, setTestName] = useState('');
    const [isOpen , setIsOpen] = useState(false);
    const [userAnswer,setUserAnswer] = useState({});
    const [score, setScore] = useState();
    const { testId } = useParams();
    const videoRef = useRef(null);
    const streamRef = useRef(null);
  
    const token = localStorage.getItem("accessToken");
    const decodedToken = jwtDecode(token);
    const fetchQuestions = async () => { 
      if (!token) {
        alert("Unauthorized access. Please login.");
        window.location.href = "/login";
        return;
      }
   
      try {
        const response = await fetch(`http://localhost:9000/tests/${testId}/questions`,{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        if (data.status === "success") {
          console.log(data.data.questions);
          setTestName(data.data.testName);
          setQuestions(data.data.questions);
        } else {
          console.error("Error fetching questions");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    useEffect(() => {
      fetchQuestions();
      setScore(0);
    }, []);

    useEffect(() => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          streamRef.current = stream;
          if (videoRef.current) {  // Ensure videoRef.current is not null
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error("Error accessing media devices: ", error);
          alert("Please grant access to camera and microphone");
        });
    
      return () => {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
      };
    }, []);


    const handleAnswerChange = (questionId,option) => {
      setUserAnswer((previousAnswer)=>({
        ...previousAnswer,
        [questionId]:option
      }));
    };
    
    const handleSubmit =async () => {
      let correctCount = 0;
      questions.forEach((question) => {
        if (userAnswer[question._id] === question.correctOption) {
          correctCount = correctCount+1;
        }
      });
      const userId = localStorage.getItem("userId");
      try {
        const response= await axios.post("http://localhost:9000/submitTest",
          {
            score:correctCount,
            testId,
            userId,
          }
        );
        if(response.status===200){
          setIsOpen(true);
        }
      } catch (error) {
        toast.error("Failed to Submit Test! try again")
        console.error("Error:", error.message);
      }
    };
  return (
    <div className='border-2 border-red-700 w-screen h-screen m-0 p-0'>
      <div className='flex flex-col bg-[#161D29] items-center justify-center'>
        <div className='flex justify-between w-[70%]'>
          <a className='text-white'>Logo</a>
          <h1 className='text-5xl text-white'>{testName}</h1>
        </div>
      </div>
      
    <div className='flex w-[100%] h-[90%] border-2 border-blue-900'>
      <div className='overflow-auto w-[75%] '>  
        {questions.length === 0 ? (
          <p className='text-xl'>No questions available in the test</p>
          ) : (
          <div className='flex flex-col border-2 w-full h-full '>
            <div className='border-2 border-blue-950 flex flex-col p-4 gap-5 w-full'>
              {questions.map((question, index) => (
                <div key={question._id} className='w-full border-b-2 gap-2 flex flex-col items-start justify-start'>
                  <p className='text-3xl text-[#161D29]'>{question.questionText}</p>
                  <ul>
                    {question.options.map((option, optionIndex) => (
                      <li className='text-2xl p-2' key={`${question._id}-${optionIndex}`}>
                        <lable className='flex gap-3'>
                          <input
                            type="radio"
                            name={`question-${question._id}`}
                            checked={userAnswer[question._id] === optionIndex}
                            value={option}
                            onChange={() => handleAnswerChange(question._id, optionIndex)}
                          />
                          {option}
                        </lable>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          <div className='border-2 border-black flex px-8 w-[70%] justify-between items-center'>
          <Button className="relative " onClick={() => handleSubmit()  }>
  Submit Test
</Button>

            
          </div>
        </div>
        )}
    </div>
    {isOpen && <AlertDailogBox isOpen={isOpen} setIsOpen={setIsOpen} /> }
          <div className='flex flex-col w-[25%] items-center  justify-center h-full border-2 border-yellow-500'>
            <div className='w-[80%] h-[40%]'>
            <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className=" border-2 rounded-3xl mb-4 transform -scale-x-100"
                    />
            </div>
      
          </div>
      </div>

  </div>
  )
}
