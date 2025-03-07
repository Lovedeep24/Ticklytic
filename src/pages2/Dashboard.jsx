import React from 'react';
import { Link } from 'react-router-dom';
import styles from "../styles/Dashboard.module.css"; // Assuming you have a CSS module for styling

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 text-center p-5">
      <h2 className="text-4xl mb-5 text-gray-800">Welcome to the MCQ Test Platform</h2>
      <p className="text-lg mb-10 max-w-xl leading-relaxed">This platform allows students to take multiple-choice question tests, manage their profiles, and view their results.</p>
      
      <div className="flex flex-col gap-4">
        <Link to="/login" className="inline-block text-lg px-5 py-2.5 rounded text-white bg-blue-500 transition-colors duration-300 hover:bg-blue-600">Login</Link>
        <Link to="/signup" className="inline-block text-lg px-5 py-2.5 rounded text-white bg-blue-500 transition-colors duration-300 hover:bg-blue-600">Signup</Link>
        {/* <Link to="/admin" className={styles.adminLink}>Admin Portal</Link> */}
      </div>
    </div>
  );
};

export default Dashboard;