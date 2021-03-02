const express = require('express');
const app = express();
require('dotenv').config();

app.use("/api", require('./api/router.js'));

app.use(express.static(__dirname + '/public'));
app.get(/.*/, (req,res)=> res.sendFile(__dirname + '/public/index.html'));  


app.listen(process.env.PORT, ()=>{
    console.log(`http://localhost:${process.env.PORT}`);
})