const Resume = require('../models/Resume');

exports.saveResume = async (req, res) => {
  try {
    const { userId = `user_${Date.now()}`, ...resumeData } = req.body;

    const resume = new Resume({
      userId,
      personalInfo: resumeData.personalInfo,
      education: resumeData.education || [],
      experience: resumeData.experience || [],
      skills: resumeData.skills || [],
      projects: resumeData.projects || [],
    });

    const saved = await resume.save();

    res.json({
      success: true,
      message: "Resume saved successfully",
      userId: saved.userId,
      data: saved
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getResume = async (req, res) => {
  try {
    const { userId } = req.params;
    const resume = await Resume.findOne({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: resume || {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};