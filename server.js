const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/api/users", (req, res) => {
  res.json({
    users: [
      {
        name: "Tomas",
        age: 27,
        country: "Germany",
      },
    ],
  });
});

app.listen(port, () => {
  console.log("It works..?");
});

// const http = require("http");

// const hostname = "localhost";
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader;
// });
