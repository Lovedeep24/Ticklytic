const TestSubmission = require("../models/testSubmissionSchema");
const Tests = require("../models/testSchema");
const Signup = require("../models/SignupModel");
const submissionCheck = async (req, res) => {
try {
    const submission = await TestSubmission.find().populate('testId').populate('userId');
    res.status(200).json(submission);
} catch (error) {
    console.log(error);
    res.status(500).send("Error while fetching submission");
} 
};
module.exports = submissionCheck 
