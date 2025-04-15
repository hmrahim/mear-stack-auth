const express = require("express");
const router = require("./routes/authRouter");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;

app.set("view engine", "ejs");
const middleware = [
  express.urlencoded({ extended: true }),
  express.json(),
  express.static("public"),
  morgan("dev"),
];
const uri = "mongodb://localhost:27017/passportauth";

app.use(middleware);
app.use(router);

const db = mongoose.connect(uri, { useNewUrlParser: true }).then(() => {
  app.listen(port, () => {
    console.log("server is running on prot 5000");
    console.log("database is connected");
  });
});
