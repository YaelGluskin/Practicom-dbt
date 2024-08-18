// controllers/questionnaireController.js
const asyncHandler = require('express-async-handler'); // Import the express-async-handler module
const pool = require('../db'); // Import the pool object from the db module

// @desc    Create a new questionnaire
// @route   POST /api/questionnaires
// @access  Private
const createQuestionnaire = asyncHandler(async (req, res) => {
    const { user_id, selectedPreferences, selectedPlace, selectedPurpose, selectedEndurance, startDate, endDate, budget } = req.body;
    console.log(req.body);
    // Assuming selectedPlace is a string with commas, convert it to an array
    const selectedPlaceArray = selectedPlace.split(',').map(item => item.trim());

    const newQuestionnaire = await pool.query(
        `INSERT INTO questionnaire 
         (user_id, selectedPreferences, selectedPlace, selectedPurpose, selectedEndurance, startDate, endDate, budget) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
         RETURNING *`,
        [user_id, selectedPreferences, selectedPlaceArray, selectedPurpose, selectedEndurance, startDate, endDate, budget]
    );

    res.status(201).json(newQuestionnaire.rows[0]);
});

// @desc    Get all questionnaires by user
// @route   GET /api/questionnaires/:user_id
// @access  Private
const getQuestionnairesByUser = asyncHandler(async (req, res) => {
    const { user_id } = req.params;

    const questionnaires = await pool.query(
        'SELECT * FROM questionnaire WHERE user_id = $1',
        [user_id]
    );

    res.status(200).json(questionnaires.rows);
});

// @desc    Update a questionnaire
// @route   PUT /api/questionnaires/:id
// @access  Private
const updateQuestionnaire = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { selectedPreferences, selectedPlace, selectedPurpose, selectedEndurance, startDate, endDate, budget } = req.body;

    const updatedQuestionnaire = await pool.query(
        `UPDATE questionnaire 
         SET selectedPreferences = $1, selectedPlace = $2, selectedPurpose = $3, selectedEndurance = $4, startDate = $5, endDate = $6, budget = $7
         WHERE id = $8 
         RETURNING *`,
        [selectedPreferences, selectedPlace, selectedPurpose, selectedEndurance, startDate, endDate, budget, id]
    );

    res.status(200).json(updatedQuestionnaire.rows[0]);
});

// @desc    Delete a questionnaire
// @route   DELETE /api/questionnaires/:id
// @access  Private
const deleteQuestionnaire = asyncHandler(async (req, res) => {
    const { id } = req.params;

    await pool.query('DELETE FROM questionnaire WHERE id = $1', [id]);

    res.status(204).json({ message: 'Questionnaire deleted successfully' });
});

module.exports = {
    createQuestionnaire,
    getQuestionnairesByUser,
    updateQuestionnaire,
    deleteQuestionnaire,
};
