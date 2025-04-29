const express = require("express");
const { login, signup } = require("../Controllers/authController");
const findQuestion= require("../Controllers/questionController");
const submitTest= require("../Controllers/submitTest");
const submissioncheck=require('../Controllers/submissionCheck')
const validateQuestion=require('../Middlewares/validateQuestion');
const validateToken = require("../Middlewares/validateToken");
const authorizeRole = require("../Middlewares/authorizeRole")
const insertQuestion = require("../Controllers/insertQuestions");
// const forgotPassword = require("../Controllers/forgotPassword");
// const resetPassword = require("../Controllers/resetPassword");
const createTest=require('../Controllers/createTests');
const addquestionToTest=require('../Controllers/quesToTest');
const allTests=require('../Controllers/allTests');
const questions=require('../Controllers/showTest');
const fetchUsersData=require('../Controllers/usersInfo');
const deleteTest = require("../Controllers/deleteTest");
// const tests = require("../Controllers/createTests");
const router = express.Router();

router.post("/login", login);
router.post("/signup",signup);
router.get("/questions", findQuestion);
router.get("/fetchUsers", validateToken,authorizeRole('Admin'),fetchUsersData);
router.post("/insertquestions",validateToken,authorizeRole('Admin'),insertQuestion);
router.post("/createTest", validateToken,authorizeRole('Admin'),createTest);
router.patch("/:testid/ques-to-test",validateToken,authorizeRole('Admin'), addquestionToTest);
router.get("/tests",validateToken, allTests);
router.get("/tests/:testId/questions", validateToken,authorizeRole('User'),questions);
router.post('/submitTest',validateToken,authorizeRole('User'), submitTest);
router.get('/submissions',validateToken,authorizeRole('Admin'), submissioncheck );
router.delete('/deleteTest',validateToken,authorizeRole('Admin'), deleteTest );
// router.post('/forget-password', forgotPassword);
// router.get('/reset-password', resetPassword );

module.exports = router;
