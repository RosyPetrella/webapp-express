const router = require("express").Router();
const movieController = require("../controllers/movieController");

router.get("/", movieController.index);

router.get("/:id", movieController.show);

module.exports = router;
