const mongoose = require('mongoose');

const questionsSchema = new mongoose.Schema({
    questionText: 
    {
        type: String,
        required: [true, "You must add a question"]
    },
    options: 
    {
        type: [String], 
        required: [true, "You must give options"]
    },
    correctOption:
    {
        type: Number,
        required: [true, "You must give one correct option"]
    }
});

const Question = mongoose.model("Question", questionsSchema);

module.exports = Question;