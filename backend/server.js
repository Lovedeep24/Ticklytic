const express = require('express');
const dotenv = require("dotenv");
const cors=require("cors");
const insertQuestions = require("./Controllers/insertQuestions");
const authRoute=require("./routes/auhtRoute");
const cronJob = require('./sendEmail');
const connectToMongoDb = require('./config/db');

// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const app=express();
app.use(cors());
app.use(express.json());
dotenv.config();
const PORT=process.env.PORT;


cronJob.start(); 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  connectToMongoDb()
  .then(() => {
      console.log('Connected to MongoDB');

  })
});
app.use("",authRoute);


  