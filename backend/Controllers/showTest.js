const Test = require('../models/testSchema');

const showTest = async (req, res) => {  
    const { testId } = req.params;  // Correct way to get testId from route parameters
    console.log(testId);  // Log the testId to verify if it's coming through correctly

    try {
        const tests = await Test.findById(testId).populate('questions');
        console.log(tests);

        if (!tests) {
            return res.status(404).json({ message: "No question found" });  // Use return here to avoid continuing further execution
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
