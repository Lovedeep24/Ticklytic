const mongoose = require('mongoose');
const Question = require('../models/questionsSchema');

const insertQuestion = async (req, res) => {
    const newQuestion = req.body; // Expecting a single question object
    if(!newQuestion)
    {
        res.status(404).message("no question found");
        return 
    }
    try {
            await Question.create(newQuestion);
            console.log("New question inserted successfully");
            return res.status(201).json({ message: "New question inserted successfully" });
        
    } catch (error) {
        console.error("Error inserting question:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = insertQuestion;
