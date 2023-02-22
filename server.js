import express from "express";
import { config } from "dotenv";
config("./.env");
import mysql2 from "mysql2";

const app = express();
app.use(express.json());

const pool = mysql2
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  })
  .promise(); // Using .promise() to use async-await in our app

app.get("/api", async (req, res) => {
  return res.status(200).json({ data: "Hello from Express API" });
});

app.get("/api/books", async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM books");
    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

app.post("/api/book", async (req, res) => {
  try {
    const { title, description, cover, price } = req.body;

    await pool.query(
      "INSERT INTO books (`title`, `description`, `cover`, `price`) VALUES (?, ?, ?, ?)",
      [title, description, cover, price]
    );

    return res
      .status(201)
      .json({ success: true, message: "Book added successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

app.put("/api/book/:id", async (req, res) => {
  try {
    const { title, description, cover, price } = req.body;
    const bookId = req.params.id;

    await pool.query(
      "UPDATE books SET `title` = ?, `description` = ?, `cover` = ?, `price` = ? WHERE id = ?",
      [title, description, cover, price, bookId]
    );

    return res
      .status(200)
      .json({ success: true, message: "Book has been updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

app.delete("/api/book/:id", async (req, res) => {
  try {
    const bookId = req.params.id;

    await pool.query("DELETE FROM books WHERE id = ?", [bookId]);

    return res
      .status(200)
      .json({ success: true, message: "Book has been deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

const PORT = 5000;
const server = app.listen(PORT, () =>
  console.log(`Server running on PORT ${PORT}`)
);

// Handling server errors with clean error messages
process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
