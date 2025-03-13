import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import styles from "../Styles/Login.module.css";
import axios from "axios";
import LoginForm from '@/components/ui/loginForm';

export default function Login() {
  
  return (
    <>
        <div className="flex items-center justify-center h-screen w-full bg-gray-200">
            <div className='w-[80%] h-full flex border-2 border-amber-900 justify-center items-center'>
                <LoginForm/>
            </div>
        </div>
        </>
      
  )
}
