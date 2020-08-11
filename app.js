const mongoose = require("mongoose");
const express = require('express');
const app = express();
const db = require("./config/keys").mongoURI;
const path = require("path");

// tell our server to load the static build folder in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

// added by george for user-auth-backend 8-10-2020
const users = require("./routes/api/users");
const User = require("./models/User");
const bodyParser = require('body-parser');
const passport = require('passport');
// finished by george for user-auth-backend 8-10-2020

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

// added by george for user-auth-backend 8-10-2020
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
// finished by george for user-auth-backend 8-10-2020


//app.get("/", (req, res) => res.send("Hello World"));

// added by george for user-auth-backend 8-10-2020
app.use(passport.initialize());
require('./config/passport')(passport);

app.use("/api/users",users);
// finished by george for user-auth-backend 8-10-2020

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));