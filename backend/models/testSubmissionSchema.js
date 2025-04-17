const mongoose = require('mongoose');


const testSubmissionSchema = new mongoose.Schema({
  score: { type: Number, required: true },
  testId:{type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: Boolean, default: false }
},{
  timestamps: true  
});


const TestSubmission = mongoose.model('TestSubmission', testSubmissionSchema);

module.exports = TestSubmission;
