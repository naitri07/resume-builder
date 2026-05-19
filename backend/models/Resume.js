const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // You can use email or session ID
  personalInfo: {
    fullName: String,
    title: String,
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    website: String,
    summary: String
  },
  education: [{
    degree: String,
    institution: String,
    startDate: String,
    endDate: String
  }],
  experience: [{
    jobTitle: String,
    company: String,
    startDate: String,
    endDate: String,
    description: String
  }],
  skills: [String],
  projects: [{
    name: String,
    description: String,
    link: String
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resume', ResumeSchema);