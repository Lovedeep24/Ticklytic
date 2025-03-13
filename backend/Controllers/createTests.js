const mongoose = require('mongoose');
const Test = require('../models/testSchema');
const tests = async(req,res)=>{
    console.log('Request body:', req.body); 
    const testName = req.body.testName;
    const description = req.body.description;  
    const duration = req.body.duration;   
    try {
        if(!testName || !description ||duration)
        {
            return res.status(401).json({status: "failed", message: "Please provide a test name and description also duration"});
        }
        const newTest= await Test.create(
            {
                testName: testName,
                duration:duration,
                description: description,
                questions: [],
            }   
        );
        console.log("Test created");
        res.status(200).json({status: "success",data: newTest,});
    } catch (error) {
        res.status(500).json({status: "failed", message: "Internal server error"});
        console.log(error.message);
        console.log("Test not created");
    }
   
  
} 

module.exports = tests;