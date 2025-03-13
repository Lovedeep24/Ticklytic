const TestSubmission = require('../models/testSubmissionSchema'); // Adjust the path as necessary
const submitTest = async (req, res) => {
  try {
    const {  correctCount, totalQuestions, email } = req.body;
    const finalScore = correctCount;
    // Allow finalScore to be zero
    if (finalScore < 0 || finalScore > totalQuestions) {
      return res.status(400).json({ message: 'Invalid score' });
    }

    if (!finalScore || !totalQuestions || !email) {
      if (!finalScore) {
        return res.status(400).json({ message: 'finalScore is mandatory' });
      } else if (!totalQuestions) {
        return res.status(400).json({ message: 'totalQuestions is mandatory' });
      } else if (!email) {
        return res.status(400).json({ message: 'email is mandatory' });
      } else {
        return res.status(400).json({ message: 'All fields are mandatory' });
      }
    }
    
    console.log('Received data:', { finalScore, totalQuestions, email });
    const testId=req.params.testId;
    const newSubmission = new TestSubmission({
      testId,
      finalScore,
      totalQuestions,
      email,
    });

    await newSubmission.save();

    res.status(201).json({ message: 'Test submitted successfully!' });

  } catch (error) {
    console.error('Error submitting test:', error);
    res.status(500).json({ message: 'An error occurred while submitting your test. Please try again.' });
  }
};


module.exports = submitTest;