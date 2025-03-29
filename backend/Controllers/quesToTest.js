const Test=require('../models/testSchema');
const Question = require('../models/questionsSchema');
const quesToTest =async(req,res)=>{ 
    const testId=req.params.testid;
    console.log(testId);
    const questionData=req.body;
    console.log(questionData);
    try {
        const question= await Question.create(questionData); 
        console.log(question);
        if(!testId)
        {
            res.status(404).json("testID not found");
        } 
        const insertedQuestions = await Question.insertMany(questionData);
        const questionIds = insertedQuestions.map(q => q._id);  // Extract the IDs

        const test = await Test.findByIdAndUpdate(
            testId,
            { $push: { questions: { $each: questionIds } } },  // Push multiple IDs at once
            { new: true }
        ).populate('questions');
        console.log("Question Inserted");
        res.status(200).json({test});
    } catch (error) {
        res.status(500).json({message: error.message});
    }

 };
 module.exports = quesToTest;
