const TestSubmission = require('../models/testSubmissionSchema'); // Adjust the path as necessary
const submitTest = async (req, res) => {
  try {
    const { testId, score, totalQuestions,userId } = req.body;
    if (score < 0 || score > totalQuestions) {
      return res.status(400).json({ message: 'Invalid score' });
    }
    
    if (!score || !totalQuestions || !userId || !testId) {  
      if (!score) {
        return res.status(400).json({ message: 'score is mandatory' });
      } else if (!totalQuestions) {
        return res.status(400).json({ message: 'totalQuestions is mandatory' });
      } else if (!userId) {
        return res.status(400).json({ message: 'userId is mandatory' });
      }  else if (!testId) {
        return res.status(400).json({ message: 'testId is mandatory' });
      } else {
        return res.status(400).json({ message: 'All fields are mandatory' });
      }
    }
    
    const newSubmission = new TestSubmission({
      userId,
      testId,
      score,
      totalQuestions,
    });

    await newSubmission.save();

    res.status(201).json({ message: 'Test submitted successfully!' });

  } catch (error) {
    console.error('Error submitting test:', error);
    res.status(500).json({ message: 'An error occurred while submitting your test. Please try again.' });
  }
};


module.exports = submitTest;