const express = require("express");
const cors = require("cors");
const { signup } = require("./controller/authController");
const app = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const port = 3000 || process.env.PORT;

app.get("/", (req, res) => res.send("Hello World! This is Ondium."));
app.post("/signup", signup);
app.listen(port, () => console.log(`Ondium listening on port ${port}`));
