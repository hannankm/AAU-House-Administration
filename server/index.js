// app.js

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");

const authRoutes = require("./routes/auth");
const houseRoutes = require("./routes/houseRoutes");

const app = express();

app.use(
  session({
    secret: "xxaa768", // Change this to a secure key
    resave: false,
    saveUninitialized: true,
  })
);

app.use(bodyParser.json());

app.use("/auth", authRoutes);
// app.use("/houses", houseRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
