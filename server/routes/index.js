var express = require("express");
var router = express.Router();
const db = require("../sequelize/models");

db.sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/movies", function (req, res) {
  db.movies.findAll().then((movies) => {
    res.status(200).send(movies);
  });
});

module.exports = router;
