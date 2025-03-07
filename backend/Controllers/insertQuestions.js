const mongoose = require('mongoose');
const Question = require('../models/questionsSchema');

const insertQuestion = async (req, res) => {
    const newQuestion = req.body; // Expecting a single question object

    try {
        // Check if the question already exists
        const existingQuestion = await Question.findOne({ questionText: newQuestion.questionText });

        if (!existingQuestion) {
            // If it doesn't exist, insert the new question
            await Question.create(newQuestion);
            console.log("New question inserted successfully");
            return res.status(201).json({ message: "New question inserted successfully" });
        } else {
            // If it exists, notify that the question is already in the database
            console.log("Question already exists in the database");
            return res.status(409).json({ message: "Question already exists in the database" });
        }
    } catch (error) {
        console.error("Error inserting question:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = insertQuestion;
