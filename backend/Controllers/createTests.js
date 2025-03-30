const mongoose = require('mongoose');
const Test = require('../models/testSchema');
const tests = async(req,res)=>{
    console.log('Request body:', req.body); 
    const testName = req.body.testName;
    const description = req.body.description;  
    const duration = req.body.duration;   
    try {
        if(!testName || !description || !duration)
        {
            return res.status(401).json({status: "failed", message: "Please provide all Fields"});
        }
        const testExist = await Test.findOne({testName});
        if(testExist)
        {
            res.status(409).json("Test already Exist with this name");
        }
        else{
            const newTest= await Test.create(
                {
                    testName: testName,
                    duration:duration,
                    description: description,
                    questions: [],
                }   
            );
            console.log("Test created");
            console.log(newTest);
            res.status(200).json({status: "success", testId:newTest._id});
        }
        
    } catch (error) {
        res.status(500).json({status: "failed", message: "Internal server error"});
        console.log(error.message);
        console.log("Test not created");
    }
   
} 

module.exports = tests;