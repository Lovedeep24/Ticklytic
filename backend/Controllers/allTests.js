const Test=require('../models/testSchema');
const allTests=async(req,res)=>{
    try {
        const tests=await Test.find();
        res.status(200).json({
            status: "success",
            data: tests,
        });    
    } catch (error) {
        res.status(400).json({"message":error.message});
    }
    
}

module.exports = allTests;