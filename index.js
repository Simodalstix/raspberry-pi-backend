const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(express.json());

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: "db",
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

app.get("/posts", async (req, res) => {
  const result = await pool.query("SELECT * FROM posts");
  res.json(result.rows);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
