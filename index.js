const express = require("express");
// To connect with env folder we need to write this 2 line code
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" }); // 'config.env' is path name

const path = require("path");

const morgan = require("morgan");

const bodyparser = require("body-parser");
const db = require("./config/mongoose");
// const session = require("express-session");

const PORT = process.env.PORT || 4000;
const app = express();

//Middlewares
app.use(morgan("tiny"));
app.use(bodyparser.urlencoded({ extended: true })); //body parser which able to catch req.body.anything
// app.use(express.json()); //backend does not undestand json format data so this middleware convert json format into HTTP format to make undestand to backend

//Setting up the template engine
app.set("view engine", "ejs");
app.set("views", path.join((__dirname, "views")));
//Load the static files here..
app.use(express.static(path.join(__dirname, "assets")));

//Routes
app.use("/", require("./routes/router"));

app.listen(PORT, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is running on port: ${PORT}`);
});
