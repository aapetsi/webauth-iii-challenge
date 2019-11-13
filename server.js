require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const users = require("./routes/api/users");

const app = express();

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes middleware
app.use("/api/users", users);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server is running on port ${port}`));
