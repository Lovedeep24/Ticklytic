import React, { useState, useEffect,useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
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
  

    const fetchQuestions = async () => { 
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(`http://localhost:9000/tests/${testId}/questions`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // console.log(response);
        if (response.status === 200) {
          const questions=response.data.data.questions;
          console.log(questions);
          setTestName(response.data.data.testName);
          setQuestions(questions);
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
      const token = localStorage.getItem("accessToken");
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
          } ,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
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
    <div className= ' w-screen h-screen m-0 p-0'>
      <div className='flex flex-col p-3 bg-[#161D29] items-center justify-center'>
        <div className='flex justify-between w-full items-center'>
        <div className="text-white text-xl p-5 flex items-center justify-center h-10 font-bold ">
             <img
             onClick={() => router.push('/')}
              src="/ticklyticLogo.png" 
              alt="Logo"
              className="h-10 sm:h-14 w-auto cursor-pointer"
            /> 
          </div>
          <h1 className='text-xl sm:text-4xl mr-10 text-white'>{testName}</h1>
        </div>
      </div>
      
    <div className='flex flex-col-reverse sm:flex w-[100%] h-[90%]'>
      <div className='overflow-auto border-2 w-full sm:w-[75%] '>  
        {questions.length === 0 ? (
          <p className='text-xl'>No questions available in the test</p>
          ) : (
          <div className='flex flex-col  w-full h-full '>
            <div className=' flex flex-col p-4 gap-5 w-full'>
              {questions.map((question, index) => (
                <div key={question._id} className='w-full border-b-2 gap-2 flex flex-col items-start justify-start'>
                  <p className='text-md sm:text-2xl break-words text-[#161D29]'>{question.questionText}</p>
                  <ul>
                    {question.options.map((option, optionIndex) => (
                      <li className='text-lg sm:text-xl p-1 sm:p-2' key={`${question._id}-${optionIndex}`}>
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

          <div className=' flex px-8 w-[50%] sm:w-[70%] justify-between items-center'>
          <Button className="relative " onClick={() => handleSubmit()  }>
            Submit Test
          </Button>          
          </div>
        </div>
        )}
      </div>
      <div className=' border-2 flex flex-col w-full sm:w-[25%] items-center h-auto '>
        <div className='sm:w-[80%] w-[50%] sm:h-[40%] h-[50%] mt-5'>
          <video
                    ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className=" border-2 rounded-xl sm:rounded-3xl mb-4 transform -scale-x-100"
                  />
          </div>
         
        </div>
      </div>
    {isOpen && <AlertDailogBox isOpen={isOpen} setIsOpen={setIsOpen} /> }
  </div>
  )
}
