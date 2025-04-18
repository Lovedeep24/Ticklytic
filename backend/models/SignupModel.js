const mongoose = require("mongoose");

const SignupSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your Name"],
    },
    email: {
        type: String,
        required: [true, "Please add Email"],
        unique: true // Ensure emails are unique
    },
    password: {
        type: String,
        required: [true, "Please enter Password"],
    },
    role: {
        type: String,
        required: [true, "Please enter Role"],
        default: "User" 
    },
    testHistory: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Tests"
        }
      ]
    },
    {
    timestamps: true  
    });

const User = mongoose.model("User", SignupSchema);
module.exports = User;
