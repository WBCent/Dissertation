const express = require('express');
const app = express();

app.use(express.static('./vite-project/src/main.jsx'))


app.post("/formsubmission", (req, res) => {
    
})




app.listen(7378, () => console.log(`Listening on 3000`));