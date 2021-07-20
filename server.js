const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const postsRoutes = require("./backend/routes/posts");

const app = express();

require("dotenv").config();

mongoose
  .connect(
    "mongodb+srv://stelios:N6GvTOnXjVUO07iM@cluster0.zn5oj.mongodb.net/mean-crud?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection failed");
  });

const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/posts", postsRoutes);

app.listen(port, () => {
  console.log(`Listening on port: ${port}..`);
});
