const TestSubmission = require("../models/testSubmissionSchema");
const submissionCheck = async (req, res) => {
try {
    const submission = await TestSubmission.find();
    res.status(200).json(submission);
} catch (error) {
    console.log(error);
    res.status(500).send("Error while fetching submission");
}
};
module.exports = submissionCheck 