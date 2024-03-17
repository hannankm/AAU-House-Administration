// app.js

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const { sequelize } = require("./models");

const authRoutes = require("./routes/auth");
const houseRoutes = require("./routes/houseRoutes");
const adRoutes = require("./routes/advertisementRoutes");
const houseAdRoutes = require("./routes/houseAdRoutes");
const announcementRoutes = require("./routes/announcements");
const applicationRoutes = require("./routes/application");
const complaintRoutes = require("./routes/complaintRoute");

const app = express();

app.use(
  session({
    secret: "xxaa768", // Change this to a secure key
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cors());

app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/houses", houseRoutes);
app.use("/ads", adRoutes);
app.use("/house-ads", houseAdRoutes);
app.use("/announcements", announcementRoutes);
app.use("/applications", applicationRoutes);
app.use("/complaint", complaintRoutes);

sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log("Server is running on port 5000");
  });
});
