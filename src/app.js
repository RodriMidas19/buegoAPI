const express = require("express");
const router = require("./routes/router");
const cors = require("cors");
const app = express();
const whitelist = [
  "http://localhost:3000",
  "http://localhost:3333",
  "https://www.buego.pt",
  "https://www.buego.pt/"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback("Not allowed by CORS");
    }
  },
};

// Enable CORS middleware before defining the routes
app.use(cors(corsOptions));

// Parse incoming JSON data
app.use(express.json());

// Use your defined router
app.use(router);
module.exports = { app };
