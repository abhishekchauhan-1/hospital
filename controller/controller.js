const Userdb = require("../models/user");
//Create and save the new user
module.exports.create = (req, res) => {
  //New user will be added
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  //To save the added user
  user
    .save(user)
    .then((data) => {
      return res.redirect("/");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Unable to create new user",
      });
    });
};

//Retrieve the user data
module.exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    Userdb.findById(id).then((data) => {
      if (!data) {
        res.status(404).send({ message: "Not found" + id });
      } else {
        res.send(data);
      }
    });
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Unable to retrieve the date of user",
        });
      });
  }
};

//Update the user
module.exports.update = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: "Data to update cant not be empty" });
  }
  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cant update the user with id: ${id}.Maybe user not found`,
        });
      } else {
        res.send(data);
      }
    })

    .catch((err) => {
      res.status(500).send({ message: "Error in updating user information" });
    });
};

//Delete the user with specific id only
module.exports.delete = (req, res) => {
  const id = req.params.id;
  Userdb.findByIdAndDelete(id)

    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cant delete the user with id: ${id}.Maybe user not found`,
        });
      } else {
        res.send({ message: "User deleted successfully" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Could not delete user" });
    });
};
