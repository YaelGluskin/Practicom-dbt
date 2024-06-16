const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create 

app.post("/loguser", async (req, res) => {
    try {
      const { username, user_password, email } = req.body;
      const newUser = await pool.query(
        "INSERT INTO \"loguser\" (username, user_password, email) VALUES($1, $2, $3) RETURNING *",
        [username, user_password, email]
      ); 
  
      res.json(newUser.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  
  //get all
  
  app.get("/loguser", async (req, res) => {
    try {
      const allUsers = await pool.query('SELECT * FROM loguser');
      res.json(allUsers.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  
  //get 
  
  app.get("/loguser/:id", async (req, res) => {
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
  
  app.put("/loguser/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { username, user_password, email } = req.body;
      const updateUser = await pool.query(
        'UPDATE loguser SET username = $1, user_password = $2, email = $3 WHERE user_id = $4',
        [username, user_password, email, id]
      );
  
      res.json("User was updated!");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  
  //delete
  
  app.delete("/loguser/:id", async (req, res) => {
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


app.listen(5001, () => {
    console.log("server has started on port 5001");
  });