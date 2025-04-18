const TestSubmission = require('../models/testSubmissionSchema'); // Adjust the path as necessary
const User = require('../models/SignupModel'); // Adjust the path as necessary

const submitTest = async (req, res) => {
  try {
    const { testId, score, userId } = req.body;
    const newSubmission = new TestSubmission({
      userId,
      testId,
      score,
    });

    await newSubmission.save();
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { testHistory: testId } },
      { new: true }
    );
    res.status(200).json({ message: 'Test submitted successfully!' });

  } catch (error) {
    console.error('Error submitting test:', error);
    res.status(500).json({ message: 'An error occurred while submitting your test. Please try again.' });
  }
};


module.exports = submitTest;