const Test=require('../models/testSchema');
const Question = require('../models/questionsSchema');
const quesToTest =async(req,res)=>{ 
    const testId=req.params.testid;
    console.log(testId);
    const questionData=req.body;
    console.log("questionData",questionData);
    try {
        if(!testId)
        {
            res.status(404).json("testID not found"); 
            return
        } 
        const questionArray = questionData.questions;
        const insertedQuestions = await Question.insertMany(questionArray);
        console.log("insertedQuestion",insertedQuestions);
        const questionIds = insertedQuestions.map(q => q._id);  // Extract the IDs

        const test = await Test.findByIdAndUpdate(
            testId,
            { $addToSet: { questions: { $each: questionIds } } },  // Use $addToSet to prevent duplicates
            { new: true }
        ).populate('questions');
        console.log("Question Inserted");
        res.status(200).json({test});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }

 };
 module.exports = quesToTest;
