require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const fetch = require("node-fetch");
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) =>
  res.send("Hello, use (/todos) for todos and (/user/(0-10)) for user.")
);

app.use("/", require("./routes/route"));

app.listen(port, () => {
  console.log(`Server is running on Port : http://localhost:${port}`);
});
