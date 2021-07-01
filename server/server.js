const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
//test
app.use(express.json());
app.use("/api", require("./router.js"));

app.use(express.static(__dirname + "/public"));
app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));

mongoose.connect(process.env.dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
    console.log("DB connected");
    app.listen(process.env.PORT, () => {
        console.log(`http://localhost:${process.env.PORT}`);
    });
});

