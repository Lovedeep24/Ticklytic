const nodemailer = require('nodemailer');
const { CronJob } = require('cron');
const connectToMongoDb = require('./config/db');
const TestSubmission = require('./models/testSubmissionSchema');

// Create a transport for sending emails using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lovedeepbidhan0@gmail.com',
    pass: 'elvc wrvn dlnp pikg' // Replace with your Gmail password or app password
  }
});

const sendEmail = async (email, subject, text) => {
  const mailOptions = {
    from: 'lovedeepbidhan0@gmail.com', // Replace with your Gmail address
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
    // Connect to MongoDB
    await connectToMongoDb();

    const submissions = await TestSubmission.find({ status: false });
    console.log(`Found ${submissions.length} test submissions with status false`);


    // Send email for each submission
    for (const submission of submissions) {
      const subject = 'Your Test Results';
      const text = `Hello,\n\nThank you for taking the test. Your final score is ${submission.finalScore} out of ${submission.totalQuestions}.\n\nBest regards,\nThe Test Team Ticklytic.`;
      await sendEmail(submission.email, subject, text);
      
      submission.status = true;
      await submission.save();
    
    }

    console.log('All emails sent successfully');
  } catch (error) {
    console.error('Error fetching test submissions or sending emails:', error);
  }
 
};

// Create and start the cron job
const cronJob = new CronJob(
  '0 * * * *', 
  sendTestResultsEmails,
  null,
  true, // Start the job right now
  'Asia/Kolkata' // Indian time zone
);

module.exports = cronJob,transporter;
