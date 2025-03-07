const mongoose = require('mongoose');
const Question = require('../models/questionsSchema'); // Import the model, not the schema

const findQuestion = async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        console.error("Error retrieving questions:", err);
        res.status(500).json({ error: 'An error occurred while retrieving the questions' });
    }
};


module.exports = findQuestion;
