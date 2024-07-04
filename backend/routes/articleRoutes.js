const express = require('express');
const router = express.Router();
const {
  createArticle,
  getAllArticles,
  getArticlesByOption,
  getArticleById,
  updateArticle,
  deleteArticle
} = require('../controllers/articleController');

// Create a new article
router.post('/newArticle', createArticle);

// Get all articles
router.get('/', getAllArticles);

// Get a specific article by ID
router.get('/:id/', getArticleById);

// Get all articles by option
router.get('/option/:option', getArticlesByOption);

// Update a specific article by ID
router.put('/:id', updateArticle);

// Delete a specific article by ID
router.delete('/:id', deleteArticle);

module.exports = router;
