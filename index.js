const express = require("express");
const mongoDBConnection = require("./db/db");
require("dotenv").config();
const app = express();
app.use(express.json());

app.use("/test", (req, res) => {
  res.send("hello1");
});

app.use("/student", require("./routes/index"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  mongoDBConnection();
  console.log(`app running on port ${PORT}`);
});
