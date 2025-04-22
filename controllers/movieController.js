const connection = require("../database/db");

function index(req, res) {
  console.log("Attempting to fetch all movies");
  const sql = "SELECT * FROM movies";
  const sqlReviews = "SELECT * FROM reviews WHERE movie_id = ?";

  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res
        .status(500)
        .json({ message: "Database error", error: err.message });
    }
    console.log(`Found ${results.length} movies`);
    res.json(results);
  });
}

function show(req, res) {
  const id = Number(req.params.id);
  const sql = "SELECT * FROM movies WHERE id = ?";
  const sqlReviews = "SELECT * FROM reviews WHERE movie_id = ?";

  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const movie = results[0];

    connection.query(sqlReviews, [id], (err, reviews) => {
      if (err) return res.status(500).json({ error: err.message });
      movie.reviews = reviews;
      res.json(movie);
    });
  });
}

function createReview(req, res) {
  const movieId = Number(req.params.id);
  const { vote, text, name } = req.body;

  if (!vote || !text || !name) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const sql = `
    INSERT INTO reviews (movie_id, vote, text, name)
    VALUES (?, ?, ?, ?)
  `;

  connection.query(sql, [movieId, vote, text, name], (err, result) => {
    if (err) {
      console.error("Error inserting review:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res
      .status(201)
      .json({ message: "Review added", reviewId: result.insertId });
  });
}

module.exports = { index, show, createReview };
