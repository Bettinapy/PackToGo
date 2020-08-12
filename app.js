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


const users = require("./routes/api/users");
const User = require("./models/User");
const bodyParser = require('body-parser');
const passport = require('passport');

const carrierPosts = require("./routes/api/carrier_posts");
const shipperPosts = require("./routes/api/shipper_posts");


mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

// body parser
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());



app.use(passport.initialize());
require('./config/passport')(passport);

// routes
app.use("/api/users",users);
app.use("/api/carrier_posts",carrierPosts);
app.use("/api/shipper_posts",shipperPosts);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));