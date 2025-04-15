const express = require("express");
const cors = require("cors");
const app = express();
const moviesRouter = require("./routers/movies");
const serverError = require("./middleware/serverError");
const notFound = require("./middleware/notFound");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/api/movies", moviesRouter);
console.log("Movies router registered");

app.get("/api/test", (req, res) => {
  res.json({ message: "Test route working" });
});

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Movies API server is running!");
});
app.use(express.static("public"));
app.use(notFound);
app.use(serverError);
