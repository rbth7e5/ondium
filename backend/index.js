const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Hello World! This is Ondium."));

app.listen(port, () => console.log(`Ondium listening on port ${port}`));
