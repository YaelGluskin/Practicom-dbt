const asyncHandler = require('express-async-handler'); // Import the express-async-handler module
const pool = require('../db'); // Import the pool object from the db module

// Create
const createArticle = asyncHandler(async (req, res) => { // Controller function to create a new article in the database
    // console.log("1. createArticle: ", req.body);
    try { // Try to execute the following code block
        const { title, summary, content, image_url, local_image_path, option } = req.body; // Destructure the title, summary, content, image_url, local_image_path, and option from the request body

        const newArticle = await pool.query( // Execute the query to insert a new article into the database
            `INSERT INTO "article" (title, summary, content, image_url, local_image_path, option)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [title, summary, content, image_url, local_image_path, option] // Pass the title, summary, content, image_url, local_image_path, and option as parameters to the query
        );

        res.json(newArticle.rows[0]); // Return the newly created article as JSON
        console.log(image_url); // Log the image URL to the console
        console.log("2. createArticle: ", newArticle.rows[0]); // Log the newly created article to the console
    } catch (err) { // Catch any errors and log them to the console
        console.error(err.message);
        res.status(500).send("Server error"); // Return a server error response
    }
});

// Read all
const getAllArticles = asyncHandler(async (req, res) => { // Controller function to get all articles from the database
    // console.log("getAllArticles: -", req.body); // Log the request body to the console for debugging purposes
    try { // Try to execute the following code block
        const allArticles = await pool.query('SELECT * FROM "article"'); // Get all articles from the database
        res.json(allArticles.rows); // Return the articles as JSON
    } catch (err) { // Catch any errors and log them to the console
        console.error(err.message); // Log the error message to the console
        res.status(500).send("Server error"); // Return a server error response
    }
});

// Read by Option
const getArticlesByOption = asyncHandler(async (req, res) => {
    // console.log("get: -", req.params);
    try {
        const { option } = req.params; // Destructure the option from the request parameters
        // console.log("get: ", option);
        const allArticles = await pool.query('SELECT * FROM "article" WHERE option = $1', [option]); // Get all articles by option
        res.json(allArticles.rows); // Return the articles as JSON
    } catch (err) { // Catch any errors and log them to the console
        console.error(err.message); // Log the error message to the console
        res.status(500).send("Server error"); // Return a server error response
    }
});

// Read by ID
const getArticleById = asyncHandler(async (req, res) => {
    // console.log("getArticleById: -", req.params);
    try {
        const { id } = req.params;
        // console.log("getArticleById: ", {id});
        const article = await pool.query('SELECT * FROM "article" WHERE article_id = $1', [id]); // Get a specific article by its ID

        if (article.rows.length === 0) { // Check if the article was not found
            return res.status(404).json({ error: "Article not found" }); // Return a 404 error response
        }

        res.json(article.rows[0]); // Return the article as JSON
    } catch (err) { // Catch any errors and log them to the console
        console.error(err.message); // Log the error message to the console
        res.status(500).send("Server error"); // Return a server error response
    }
});

// Update
const updateArticle = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { title, summary, content, image_url, local_image_path, option } = req.body;

        const updateArticle = await pool.query(
            `UPDATE "article" SET title = $1, summary = $2, content = $3, image_url = $4, local_image_path = $5, option = $6, updated_at = CURRENT_TIMESTAMP WHERE article_id = $7`,
            [title, summary, content, image_url, local_image_path, option, id]
        );

        res.json("Article was updated!");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Delete
const deleteArticle = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const deleteArticle = await pool.query('DELETE FROM "article" WHERE article_id = $1', [id]);

        if (deleteArticle.rowCount === 0) {
            return res.status(404).json({ error: "Article not found" });
        }

        res.json("Article was deleted!");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = {
    createArticle, // Controller function to create a new article in the database
    getAllArticles, // Controller function to get all articles from the database
    getArticlesByOption,
    getArticleById, // Controller function to get a specific article by its ID from the database
    updateArticle, // Controller function to update an existing article in the database
    deleteArticle // Controller function to delete an article from the database
};
