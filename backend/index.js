const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;

app.get("/", (req, res) => res.send("Hello World! This is Ondium."));

app.listen(port, () => console.log(`Ondium listening on port ${port}`));
