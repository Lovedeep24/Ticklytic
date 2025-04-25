import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import AddQuestionsComp from './AddQuestionsComp';
export default function AddQuestion() {
    const [questionText, setQuestionText] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctOption, setCorrectOption] = useState('');
    const [error, setError] = useState('');
    const [tests,setTests]=useState([]);
  const fetchtests=async()=>{
       const token = localStorage.getItem('token'); 
       const decode=jwtDecode(token);
       console.log(decode);
       if (!token) {
         alert("Unauthorized access. Please login.");
         window.location.href = "/login"; 
         return;
       }
       const response=axios.get('http://localhost:9000/tests',{
         headers: {
           accessToken : `Bearer ${token}`
         }
       });
       if (response.status != 200) {
         throw new Error(`HTTP error! status: ${response.status}`);
       }
       if(response.status === 200)
       {
         setTests(response.data);
         console.log(response);
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
  return (
    <div className="p-2 flex w-full h-full font-sans bg-gray-100 ">
    <div className='w-[70%]'>
      <AddQuestionsComp/>
    </div>
    <div className='w=-[30%]'>
     <h1>All Tests</h1> 
    </div>
    </div>
  )
}
