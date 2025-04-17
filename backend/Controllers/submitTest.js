const TestSubmission = require('../models/testSubmissionSchema'); // Adjust the path as necessary
const submitTest = async (req, res) => {
  try {
    const { testId, score, userId } = req.body;
    
    if (!score || !userId || !testId) {  
      if (!score) {
        return res.status(300).json({ message: 'score is mandatory' });
      } else if (!userId) {
        return res.status(302).json({ message: 'userId is mandatory' });
      }  else if (!testId) {
        return res.status(303).json({ message: 'testId is mandatory' });
      } else {
        return res.status(309).json({ message: 'All fields are mandatory' });
      }
    }
    
    const newSubmission = new TestSubmission({
      userId,
      testId,
      score,
    });

    await newSubmission.save();

    res.status(201).json({ message: 'Test submitted successfully!' });

  } catch (error) {
    console.error('Error submitting test:', error);
    res.status(500).json({ message: 'An error occurred while submitting your test. Please try again.' });
  }
};


module.exports = submitTest;