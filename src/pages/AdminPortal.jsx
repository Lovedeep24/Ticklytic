import React from 'react'
import { useNavigate, Link } from 'react-router-dom';

export default function AdminPortal() {
   const navigate = useNavigate(); // Initialize the navigate function
  
  return (
    <div className="h-screen p-5 font-sans bg-gray-100 rounded-lg shadow-md">
    <Link to="/admin" className="text-blue-500 font-bold mb-5 inline-block no-underline">Admin Home</Link>
    <br></br>
    <Link to="/" className="text-blue-500 font-bold mb-5 inline-block no-underline">Home</Link>
    <h1 className='text-[#333] pl-[33%]'>Admin Portal</h1>
    <div className="pl-[27rem]">
    <button className="h-20 w-40 px-4 py-2 m-1 rounded-md bg-blue-500 text-white cursor-pointer transition duration-300 hover:bg-blue-600" onClick={() => navigate('/addquestions')}>Add Question</button>
    <button className="h-20 w-40 px-4 py-2 m-1 rounded-md bg-blue-500 text-white cursor-pointer transition duration-300 hover:bg-blue-600" onClick={() => navigate('/submissions')}>View Submissions</button>
    <button className="h-20 w-40 px-4 py-2 m-1 rounded-md bg-blue-500 text-white cursor-pointer transition duration-300 hover:bg-blue-600" onClick={() => navigate('/tests')}>All Test</button>
    <button className="h-20 w-40 px-4 py-2 m-1 rounded-md bg-blue-500 text-white cursor-pointer transition duration-300 hover:bg-blue-600" onClick={() => navigate('/createTest')}>Create Test</button>
    </div>
    </div>
  )
}
