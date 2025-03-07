import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/AddQuestion.module.css'// Import the CSS file

function AddQuestion() {
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState('');
  const [error, setError] = useState('');

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (options.some(option => option.trim() === '') || questionText.trim() === '') {
      setError("All fields are mandatory");
      return;
    }
    try {
      const response = await axios.post("http://localhost:9000/insertquestions", {
        questionText,
        options,
        correctOption,
      });
      if (response.status === 201) {
        setError("New question inserted successfully");
        setQuestionText('');
        setOptions(['', '', '', '']);
        setCorrectOption('');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setError("All fields are mandatory");
        } else if (error.response.status === 400) {
          setError("Must give 4 options");
        } else if (error.response.status === 409) {
          setError("Question already exists in the database");
        } else {
          setError("Internal server error");
        }
      } else {
        setError("Network error");
      }
    }
  };

  return (
    <div className="p-5 font-sans bg-gray-100 rounded-lg shadow-md">
      <Link to="/admin" className="text-blue-500 font-bold mb-5 inline-block no-underline">Admin Home</Link>
      <br></br>
      <Link to="/" className="text-blue-500 font-bold mb-5 inline-block no-underline">Home</Link>
      <h1 className='text-#333'>Add Question</h1>
      <form onSubmit={handleSubmit}>
        <input
        className="w-full p-2 my-2 rounded-md text-base border border-gray-300"
          type="text"
          placeholder="Enter Question"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
        {options.map((option, index) => (
          <input
          className="w-full p-2 my-2 rounded-md text-base border border-gray-300"
            key={index}
            type="text"
            placeholder={`Enter Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
        ))}
        <div>
          <label htmlFor="correctOption">Correct Option Index (0-3): </label>
          <input
            type="number"
            id="correctOption"
            value={correctOption}
            onChange={(e) => setCorrectOption(Number(e.target.value))}
            min="0"
            max="3"
          />
        </div>
        <button className="px-4 py-2 rounded-md bg-blue-500 text-white cursor-pointer transition duration-300 hover:bg-blue-600" type="submit">Submit</button>
      </form>
      {error && <h2 className='text-red-700 mt-[10px]'>{error}</h2>}
    </div>
  );
}

export default AddQuestion;
