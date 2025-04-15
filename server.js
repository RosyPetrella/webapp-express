const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.FRONT_URL || "http://localhost:5173",
  })
);

app.use(express.json());

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Movies API server is running!");
});

app.use(serverError);

app.use(notFound);
