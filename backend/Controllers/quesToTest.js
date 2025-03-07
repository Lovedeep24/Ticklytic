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
        const test= await Test.findByIdAndUpdate(
            testId,
            {
                $push: {questions: question._id},
            },
            {new: true}
        ).populate('questions');   
        console.log("Question added to test");
        res.status(200).json({test});
    } catch (error) {
        res.status(500).json({message: error.message});
    }

 };
 module.exports = quesToTest;
