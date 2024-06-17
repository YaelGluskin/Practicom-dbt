const express = require("express");
const app = express();
const cors = require("cors");
//const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//
app.use('/loguser', require('./routes/loginRoutes'))

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log("server has started on port 5001");
  });