const express = require("express");
const app = express();

app.get("/",(req,res)=> res.send("Hello Mo FO !!!!!!!"))
app.listen(4111)