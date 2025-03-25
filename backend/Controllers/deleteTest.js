const Test=require('../models/testSchema');
const { findByIdAndDelete } = require('../models/testSubmissionSchema');

const deleteTest=async(req,res)=>{
    const testId = req.body;
    if(!testId)
    {
        res.status(401).json("No test Id");
    }
    try {
        const test=await Test.findById(testId);
        if(!test)
            {
                res.status(404).json("No test Found");
            }
        else{
            await findByIdAndDelete(test);
            res.status(200).json({
                status: "Test Deleted Successfully"
            });    
    
        }
    } catch (error) {
        res.status(400).json({"message":error.message});
    }
    
}

module.exports = deleteTest;