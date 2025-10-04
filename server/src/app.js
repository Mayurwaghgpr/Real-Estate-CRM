const express = require("express");
const cors = require("cors");
var cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.WHITELIST_ORIGIN.split(","),
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
// Routes
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/user", require("./routes/user.route"));
app.use("/api/leads", require("./routes/leads.route"));
app.use("/api/folloups", require("./routes/followUps.route"));
app.use("/api/properties", require("./routes/properties.route"));
app.use("/api/deals", require("./routes/deals.route"));
app.use("/api/documents", require("./routes/documents.route"));
// app.use("/api/companies", require("./routes/company.route"));

app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error (can use Winston or other loggers too)

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

exports = module.exports = app;
