// routes/questionnaireRoutes.js
const express = require('express');
const { createQuestionnaire, getQuestionnairesByUser, updateQuestionnaire, deleteQuestionnaire } = require('../controllers/questionnaireController');

const router = express.Router();

router.post('/', createQuestionnaire); // Create a new questionnaire
router.get('/:user_id', getQuestionnairesByUser); // Get all questionnaires for a specific user
router.put('/:id', updateQuestionnaire); // Update a specific questionnaire
router.delete('/:id', deleteQuestionnaire); // Delete a specific questionnaire

module.exports = router;
