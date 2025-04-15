const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./database/db");
const moviesRouter = require("./routers/movies");
const serverError = require("./middleware/serverError");
const notFound = require("./middleware/notFound");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONT_URL || "http://localhost:3000",
  })
);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Movies API server is running!");
});

app.use("/api/movies", moviesRouter);

app.use(serverError);
app.use(notFound);

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
