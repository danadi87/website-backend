const express = require("express");
const morgan = require("morgan");
const PORT = 5005;
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const FRONTEND_URL = process.env.origin || `http://localhost:5173`;

const dbUrl = process.env.MONGO_URL;

const app = express();

const mongoose = require("mongoose");
mongoose
  .connect(dbUrl)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((error) => console.error("Error connecting to Mongo", error));

//Middleware
app.use(cors({ origin: [FRONTEND_URL, "http://localhost:5173"] }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Routes

//user routes
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
