const express = require('express');
const router = express.Router();
const { saveResume, getResume } = require('../controllers/resumeController');

router.post('/save', saveResume);
router.get('/:userId?', getResume);   // ? makes userId optional

module.exports = router;