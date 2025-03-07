import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/Submissions.module.css';

function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get("http://localhost:9000/submissions");
        setSubmissions(response.data);
      } catch (error) {
        setError("Failed to fetch submissions");
        console.error("Error fetching submissions:", error);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="bg-white text-black font-sans p-5 rounded-lg shadow-md w-4/5 mx-auto">
      <Link to="/admin" className="text-black no-underline text-base mr-4 hover:text-gray-800">Admin Home</Link>
      <br />
      <Link to="/" className="text-black no-underline text-base mr-4 hover:text-gray-800">Home</Link>
      <h1 className="text-black text-center text-2xl mb-5">Submissions</h1>
      {error && <h2 className="text-red-500 text-center text-lg mt-5">{error}</h2>}
      <ul className="list-none p-0">
        {submissions.map((submission, index) => (
          <li key={index} className="bg-gray-200 border border-gray-300 mb-4 p-4 rounded-md">
            <p className="text-base my-1">Submitted By: {submission.email}</p>
            <p className="text-base my-1">Score: {submission.finalScore}</p>
            <p className="text-base my-1">Submission Date: {submission.updatedAt}</p>
            <p className="text-base my-1">
              Result Out: <span className={submission.status ? '' : 'text-red-500'}>{submission.status ? "Yes" : "No"}</span>
            </p>
            <hr className="mt-4 border-t border-gray-300" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Submissions;
