import React, { useState, useEffect,useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { SlidingNumber } from '@/components/ui/sliding-number';
import axios from 'axios';

export default function Test() {
    const [questions, setQuestions] = useState([]);
    const [testName, setTestName] = useState("");
    const [currentQuestionIndex,setCurrentQuestionIndex] = useState(0);
    const [userAnswer,setUserAnswer] = useState({});
    const [score, setScore] = useState(null);
    const { testId } = useParams();
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setSeconds((prevSec) => {
          if (prevSec > 0) return prevSec - 1;
          
          if (minutes > 0) {
            setMinutes((prevMin) => prevMin -1);
            return 59;
          }
  
          clearInterval(interval); // Stop when reaching 00:00:00
          return 0;
        });
      }, 1000);
  
      return () => clearInterval(interval);
    }, [minutes]);
  
    const token = localStorage.getItem("accessToken");
    const fetchQuestions = async () => { 
      if (!token) {
        alert("Unauthorized access. Please login.");
        window.location.href = "/login"; // Redirect to login
        return;
      }
      try {
        const response = await fetch(`http://localhost:9000/tests/${testId}/questions`,{
          headers: {
            'Authorization': `Bearer ${token}`,  // Send token in Authorization header
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        if (data.status === "success") {
          setMinutes(data.data.duration);
          setQuestions(data.data.questions);
          setTestName(data.data.testName);
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
    }, [testId]);

    useEffect(() => {
          navigator.mediaDevices.getUserMedia({ video: true, audio: true })
              .then((stream) => {
                  streamRef.current = stream;
                  videoRef.current.srcObject = stream;
                  // startRecording(stream);
              })
              .catch((error) => {
                  console.error("Error accessing media devices: ", error);
                  alert("Please grant access to camera and microphone");
              });  
  }, []);

    const decodedToken = jwtDecode(token);
    const email=decodedToken.user.email;
    const userId=decodedToken.user._id;
    const totalQuestions=questions.length;  
    const handleNext = () => {
      if(currentQuestionIndex <questions.length-1){
        setCurrentQuestionIndex(currentQuestionIndex+1);
      }
    }
    const handlePrev=()=>{
      if(currentQuestionIndex>0)
      {
        setCurrentQuestionIndex(currentQuestionIndex-1);
      }
    }
    const handleAnswerChange = (questionId,option) => {
      setUserAnswer((previousAnser)=>({
        ...previousAnser,
        [questionId]:option
      }));
    };
    const handleSubmit =async () => {
      let correctCount = 0;
      questions.forEach((question) => {
        if (userAnswer[question._id] === question.correctOption) {
          correctCount += 1;
        }
      });
      // console.log(correctCount);
      setScore(correctCount); // Set the score
      try {
        const response= await axios.post("http://localhost:9000/submitTest",
          {
            totalQuestions,
            correctCount,
            email,
            userId
          }
        );
        if(response.status===201){
          alert("Test submitted successfully!");
          navigate("/result"); // Navigate to result page
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
  return (
    <div className='border-2 border-red-700 w-screen h-screen m-0 p-0'>
      <div className='flex flex-col items-center justify-center'>
        <div className='flex justify-between w-[70%]'>
          <a>Logo</a>
          <h1 className='text-5xl'>{testName}</h1>
        </div>
      </div>
      
    <div className='flex w-[100%] h-[90%] border-2 border-blue-900'>
      <div className='testQuestions w-[75%] '>  
        {questions.length === 0 ? (
          <p className='text-xl'>No questions available in the test</p>
          ) : (
          <div className='flex flex-col border-2 w-full h-full items-center'>
            <div className='border-2 border-blue-950 flex flex-col items-start justify-start p-4 gap-5 w-full'>
              <p className='text-3xl'>{questions[currentQuestionIndex].questionText}</p>
              <ul>
              {questions[currentQuestionIndex].options.map((option, index) => (
                  <li className='text-2xl p-2' key={`${questions[currentQuestionIndex]._id}-${index}`}>
                    <label>
                      <input
                    
                        type="radio"
                        name={`question-${questions[currentQuestionIndex]._id}`}
                        checked={userAnswer[questions[currentQuestionIndex]._id] === option}
                        value={option}
                        onChange={()=>handleAnswerChange(questions[currentQuestionIndex]._id,option)}
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul> 
            </div>
              
          <div className='border-2 border-black flex px-8 w-[70%] justify-between items-center'>
            <Button className="relative ps-12" onClick={handlePrev} disabled={currentQuestionIndex === 0}>
              Previous
              <span className="pointer-events-none absolute inset-y-0 start-0 flex w-9 items-center justify-center bg-primary-foreground/15">
                <ChevronLeft className="opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
              </span>
            </Button>

            <Button className="relative " onClick={handleSubmit} >
              Submit Test
            </Button>
             
            <Button className="relative pe-12" onClick={handleNext} disabled={currentQuestionIndex === questions.length-1}>
              Next
              <span className="pointer-events-none absolute inset-y-0 end-0 flex w-9 items-center justify-center bg-primary-foreground/15">
                <ChevronRight className="opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
              </span>
            </Button>
          </div>

        </div>
        )}
    </div>

          <div className='flex flex-col w-[25%] items-center justify-center h-full border-2 border-yellow-500'>
            <div className='w-[50%] h-[20%] '>
              <div className='flex items-center gap-0.5 font-mono'>
                <SlidingNumber value={minutes} padStart={true} />
                <span className='text-zinc-500'>:</span>
                <SlidingNumber value={seconds} padStart={true} />
              </div>
            </div>
            <div className='w-[80%] h-[40%]'>
            <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className=" border-2 rounded-3xl mb-4"
                    />
            </div>
      
          </div>
      </div>
   
    


  </div>
  )
}
