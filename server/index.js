require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const router = require("./router");
const errorMiddleware = require("./middlewares/error-middleware");

const PORT = process.env.PORT || 5000;
const DB_HOST = process.env.DB_HOST;

const app = express();
app.use(logger("tiny"));
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(DB_HOST);
    app.listen(PORT, () => console.log(`Server start on PORT = ${PORT}`));
  } catch (error) {
    console.log(e);
  }
};

start();
