import express from 'express';
const app = express();
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import * as assetRouter from './server/assets-router.mjs';
import { schema, createRow, retrievePastQuestions, retrieveLastQuestion, deleteTable, openOrClosed, updateQuestion, retrieveBankQuestions, retrievePastTitles }  from './Models/data-model.js';
import { v4 as uuidv4 } from 'uuid';

app.use(express.json());

app.use("/formsubmission", (req,res) => {
  console.log(req.body);
  let id = uuidv4().toString().replace(/-/g, '')
  console.log(id)
  let question_status = "open";
  console.log('labquestions', id, req.body.moduleCode, req.body.practical, req.body.problem, req.body.location, req.body.username, req.body.date, question_status)
    createRow('labquestions', id, req.body.moduleCode, req.body.practical, req.body.problem, req.body.location, req.body.username, req.body.date, question_status, req.body.linkedPractical, req.body.title)
    console.log("form submitted", req.body);
    res.status(200).json({message: "The form was submitted"});
});

app.post('/openOrClosed', async (req, res) => {
  console.log('Open or closed', req.body);
  let OpenorClosed = await openOrClosed('labquestions', req.body.username);
  console.log(OpenorClosed);
  //Check if this is correct.
  if (openOrClosed == "open") {
    res.send({askAnotherQuestion: false})
  } else {
    res.send({askAnotherQuestion: true})
  }
})




app.get("/retrievequestions", async (req, res) => {
  console.log("Its started")
  let retrieved = await retrievePastQuestions('labquestions')
  console.log(retrieved)
  res.json({retrieved})
  console.log("sent!")
})

app.get("/retrievejustasked", async(req, res) => {
  console.log("starting to retrieve last question")
  let retrieve = await retrieveLastQuestion('labquestions')
  console.log(retrieve);
  res.json({retrieve})
})


app.get('/getUserId', (req, res) => {
  res.json({id1: uuidv4(), id2: uuidv4()});
})

// app.get('/cslabs', (req, res) => {
//   console.log(req.params, req.body, req.status)
//   res.json({message: 'I am in cslabs'})
// });

app.delete('/delete', async (req, res) => {
  await deleteTable('labquestions');
  res.json('success')
})

app.put('/updateQuestion', async(req, res) => {
  console.log(req.body);
  let update = await updateQuestion('labquestions', req.body, req.body, req.body, req.body, req.body)
  console.log("update Question",update);
  
})

app.get('/retrieveBankQuestions', (req, res) => {
  let bankRetrieve = retrieveBankQuestions('questionbank');
  res.json(bankRetrieve)
})

app.get('/retrievepastquestiontitles', async (req, res) => {
  let titles = await retrievePastTitles('labquestions');
  res.json(titles);
})



app.use("/", express.static(path.join(__dirname, "public")));
app.use("/src", assetRouter.router);

app.get("/*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});





//const { PORT = 5000 } = process.env;
const PORT = 5000;

app.listen(PORT, () => {
  console.log();
  console.log(`  App running in port ${PORT}`);
  console.log();
  console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});