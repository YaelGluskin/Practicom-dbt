const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "etig2134",
  host: "localhost",
  port: 5432,
  database: "usersoflogin"
});

module.exports = pool;