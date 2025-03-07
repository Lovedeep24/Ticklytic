import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { ProjectStatusCard } from "@/components/ui/expandable-card"
// const token = localStorage.getItem('token')
// const[testName,setTestName]=useState("");
// const[testDescription,setTestDescription]=useState("");
// const[createdOn,setCreatedOn]=useState("");

export default function TestCluster() {
   const[tests,setTests]=useState([]);
    const Navigate = useNavigate();
    const fetchtests=async()=>{
      const token = localStorage.getItem('token'); // Retrieve the token
      const decode=jwtDecode(token);
      console.log(decode);
      if (!token) {
        alert("Unauthorized access. Please login.");
        window.location.href = "/login"; // Redirect to login
        return;
      }
      const response=await fetch('http://localhost:9000/tests',{
        headers: {
          'Authorization': `Bearer ${token}`,  // Send token in Authorization header
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data=await response.json();
      if(data.data)
      {
        setTests(data.data);
        console.log(data.data);
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
    
    // const handleTestClick=(testId)=>{
    //   Navigate(`/test/${testId}`);
    // }
  return (
    <>
    <h1>Test Cluster</h1>
    <div className="grid gap-4 md:grid-cols-2">
    {Array.isArray(tests) && tests.length > 0 ? (
  tests.map((test) => (
    <div key={test._id} className={styles.test} onClick={() => handleTestClick(test._id)}>
    <h2>{test.testName}</h2>
    <p>{test.description}</p>
    <p>Created on: {new Date(test.createdAt).toLocaleString()}</p>
</div> 
  ))
) : (
  <p>No tests available</p>
)} 
  </div>
  </>
  )
}
