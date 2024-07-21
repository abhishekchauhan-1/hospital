require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASEURL);
const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () =>
  console.log("Succsessfully connected with database.....")
);
module.exports = db;
