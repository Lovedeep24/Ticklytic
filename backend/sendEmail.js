const nodemailer = require('nodemailer');
const { CronJob } = require('cron');
const connectToMongoDb = require('./config/db');
const TestSubmission = require('./models/testSubmissionSchema');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lovedeepbidhan0@gmail.com',
    pass: 'elvc wrvn dlnp pikg'
  }
});

const sendEmail = async (email, subject, text) => {
  const mailOptions = {
    from: 'lovedeepbidhan0@gmail.com', 
    to: email,
    subject: subject,
    text: text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const sendTestResultsEmails = async () => {
  try {
    await connectToMongoDb();
    const submissions = await TestSubmission.find({ status: false })
    .populate('testId')
    .populate('userId');
    console.log(`Found ${submissions.length} test submissions with status false`);
    console.log(submissions);
   
    for (const submission of submissions) 
    {
      const subject = 'Your Test Results';
      const text = `Hello,\n\nThank you for taking the test. Your final score for test ${submission.testId.testName} is ${submission.score} out of ${submission.testId.questions.length}.\n\nBest regards,\n Team Ticklytic.`;
      await sendEmail(submission.userId.email, subject, text);  
      submission.status = true;
      await submission.save();
    }

    console.log('All emails sent successfully');
  } catch (error) {
    console.error('Error fetching test submissions or sending emails:', error);
  }
 
};


const cronJob = new CronJob(
  '0 * * * *', 
  sendTestResultsEmails,
  null,
  true,
  'Asia/Kolkata' 
);

module.exports = cronJob,transporter;
