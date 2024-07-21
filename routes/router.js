const express = require("express");
const router = express.Router();
const User = require("../models/user");
const controller = require("../controller/controller");
const axios = require("axios");

router.get("/", (req, res) => {
  //make get req to the /api/users
  axios.get("http://localhost:5000/api/users").then((response) => {
    res.render("index", { users: response.data });
  });
});

router.get("/add-user", (req, res) => {
  res.render("add_user");
});

router.get("/update-user", (req, res) => {
  axios
    .get("http://localhost:5000/api/users", {
      params: { id: req.query.id },
    })
    .then(function (userData) {
      res.render("update_user", { user: userData.data });
    })
    .catch((err) => {
      res.send(err);
    });
});

//API
router.post("/api/users", controller.create);
router.get("/api/users", controller.find);
router.put("/api/users/:id", controller.update);
router.delete("/api/users/:id", controller.delete);

module.exports = router;
