import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

import axios from 'axios';
function Test() {
  const [questions, setQuestions] = useState([]);
  const [testName, setTestName] = useState("");
  const[currentQuestionIndex,setCurrentQuestionIndex] = useState(0);
  const [userAnswer,setUserAnswer] = useState({});
  const [score, setScore] = useState(null);
  const { testId } = useParams();
  const navigate = useNavigate();
  // console.log(testId);
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
    <>
      <h1>{testName}</h1>
      <div>
        {questions.length === 0 ? (
          <p>No questions available in the test</p>
        ) : (
          <ul>
              <div >
                <p>{questions[currentQuestionIndex].questionText}</p>
                <ul>
              
                {questions[currentQuestionIndex].options.map((option, index) => (
                    <li key={`${questions[currentQuestionIndex]._id}-${index}`}>
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
            
          </ul>
          
        )}
      </div>
      <div>
            <button onClick={handlePrev} disabled={currentQuestionIndex === 0}>
              Previous
            </button>
            
            <button onClick={handleNext} disabled={currentQuestionIndex === questions.length-1}>
              Next
            </button>

            <button onClick={handleSubmit}>
              Submit
            </button>
            {/* <h2>{score}</h2> */}
      </div>
    </>
  );
}

export default Test;
