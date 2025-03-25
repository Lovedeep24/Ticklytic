const mongoose = require('mongoose');
const testSchema = new mongoose.Schema({
    testName:
    {
        type: String,
        required: [true, "You must add a  test name"]
    },
    description:
    {
        type: String,
        required: [true, "You must add a description"]
    },
    duration:
    {
        type: Number,
        required: [true,"Must give test duration"]
    },
    questions:
    {
        type: [{type:mongoose.Schema.Types.ObjectId,ref:'Question'}],
        required: [true, "You must add questions to the test"]
    },
    createdAt:
    {
        type: Date,
        default: Date.now
    }
});

const Tests = mongoose.model("Tests", testSchema);  
module.exports = Tests;