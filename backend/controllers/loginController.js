const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const pool = require('../db');

//create 
console.log("!!!!!!!!!!!!!!!!!")
const createUser = asyncHandler(async (req, res) => {
  try {
    const { username, user_password, email } = req.body;

    //encryption the password before insertion to database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user_password, salt);


    console.log('Encrypted password is: ', user_password);
    console.log('Decrypted password is: ', hashedPassword);


    const newUser = await pool.query(
      "INSERT INTO \"loguser\" (username, user_password, email) VALUES($1, $2, $3) RETURNING *",
      [username, hashedPassword, email]
    );

    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//get all

const getAllUsers = asyncHandler(async (req, res) => {
  console.log("getAllUsers")
  try {
    const allUsers = await pool.query('SELECT * FROM loguser');
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// login
const getUserByUsername = asyncHandler(async (req, res) => {
  try {
    const { username, user_password } = req.body;
    const user = await pool.query(
      'SELECT * FROM "loguser" WHERE username = $1',
      [username]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // checking the encrypted password
    const validPassword = await bcrypt.compare(user_password, user.rows[0].user_password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    res.json({ message: 'Login successful', user: user.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query('SELECT * FROM loguser WHERE user_id = $1', [id]);

    if (user.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


//update

const updateUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { username, user_password, email } = req.body;
    
    //encryption before insertion
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user_password, salt);

    const updateUser = await pool.query(
      'UPDATE loguser SET username = $1, user_password = $2, email = $3 WHERE user_id = $4',
      [username, hashedPassword, email, id]
    );

    res.json("User was updated!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//delete

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await pool.query('DELETE FROM loguser WHERE user_id = $1', [id]);

    if (deleteUser.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json("User was deleted!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  updateUser,
  deleteUser
};