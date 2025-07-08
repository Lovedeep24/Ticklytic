const Test = require('../models/testSchema');

const showTest = async (req, res) => {  
    const { testId } = req.params;  
    console.log(testId);  
    try {
        const tests = await Test.findById(testId).populate('questions');
        console.log(tests);

        if (!tests) {
            return res.status(404).json({ message: "No question found" }); 
        }

        res.status(200).json({
            status: "success",
            data: tests,
        });
    
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = showTest;
