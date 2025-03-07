import React from 'react'
import {  Link } from 'react-router-dom';
import styles from '../styles/createTest.module.css';
import { useRef } from 'react';
import axios from 'axios';
export default function CreateTest() {
    // const[testName,setTestName]=useState('');  
    // const[description,setDescription]=useState(''); 
    const testNameRef=useRef();
    const descriptionRef=useRef();
    const handleCreation = async () => {
        const testName = testNameRef.current.value;
        const description = descriptionRef.current.value;
        try {
            const response = await axios.post("http://localhost:9000/createTest", {
                testName,
                description,
            }); 
            if (response.status === 200) {
                console.log('Test created successfully');
                testNameRef.current.value = '';
                descriptionRef.current.value = '';
                alert('Test created successfully');
            }
            else if(response.status === 401){
                alert('Please provide a test name and description');
            }
        } catch (error) {
            console.error(error);
            alert('Test creation failed');
        }
    }
  return (
    <>
     <div className="h-screen p-5 font-sans bg-gray-100 rounded-lg shadow-md">
         <Link to="/admin" className="text-blue-500 font-bold mb-5 inline-block hover:underline">Admin Home</Link>
            <br></br>
         <Link to="/" className="text-blue-500 font-bold mb-5 inline-block hover:underline">Home</Link>
        <div className='testBox'>
            <label>Test Name</label>
            <input type='text' placeholder='Test Name' ref={testNameRef} />
            <label>Description</label>
            <input type='text' placeholder='Description' ref={descriptionRef} />
        </div>
    </div>

    <div>
      <button onClick={handleCreation} className="h-20 w-40 p-3 m-2 border-none rounded-md bg-blue-500 text-white cursor-pointer transition duration-300 hover:bg-blue-700 focus:outline-none">Create Test</button>
    </div>
    </>
   
  )
}
