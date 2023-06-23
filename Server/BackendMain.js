const express = require('express');
const app = express();
const path = require("path")
app.use(express.static('vite-project'))
app.use(express.json())


app.post("/formsubmission", (req, res) => {
    console.log(req);
    return "hello there William";
})




app.listen(7378, () => console.log(`Listening on 7378`));