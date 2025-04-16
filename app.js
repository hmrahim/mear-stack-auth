const express = require("express");
const router = require("./routes/authRouter");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const passport = require("passport");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors")

app.set("view engine", "ejs");
const middleware = [
  express.urlencoded({ extended: true }),
  express.json(),
  express.static("public"),
  cors()
  
];
app.use(passport.initialize());
require("./config/passport");
app.use(middleware);
app.use(router);



app.get("/", (req, res) => {
  res.send("hello world");
});


app.get('/profile', passport.authenticate('jwt', { session: false }),(req,res)=> {
  res.status(200).send({
    id:req.user._id,
    email:req.user.email
});
});

const db = mongoose
  .connect(process.env.DBURI, { useNewUrlParser: true })
  .then(() => {
    app.listen(port, () => {
      console.log("server is running on prot 5000");
      console.log("database is connected");
    });
  });
