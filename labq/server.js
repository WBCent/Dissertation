import express from 'express';
const app = express();
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import * as assetRouter from './server/assets-router.mjs';
import { schema, createRow, retrievePastQuestions, retrieveLastQuestion, deleteTable, openOrClosed, updateQuestion, retrieveBankQuestions, retrievePastTitles, cancelRequest, saveSolution, saveQA, saveTeacher, retrieveTeach, theOldSwitcheroo }  from './Models/data-model.js';
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

app.put("/updatequestion", async(req, res) => {
  console.log(req.body);
  let update = await updateQuestion('labquestions', req.body.question_id, req.body.moduleCode, req.body.practical, req.body.linkedPractical, req.body.title, req.body.problem, req.body.location)
  console.log("update Question",update);
  res.json('success')
})

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

app.put("/cancelrequest", async(req, res) => {
  console.log(req.body)
  let requestCancellation = await cancelRequest('labquestions',req.body.reason, req.body.question_id.questionID);
  console.log(requestCancellation)
  res.json("success")
})

//Need to add an endpoint on the staff side that is when the question has been closed it communicates to the backend that the question should be switched DB
app.put("/onclose", async (req, res) => {
  console.log("moving it over", req.body);
  console.log(req.body.question_id.questionID)
  let oldSwitcheroo = await theOldSwitcheroo(req.body.question_id.questionID)
  console.log('Successfully completed the switcheroo', oldSwitcheroo)
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



app.get('/retrieveBankQuestions', (req, res) => {
  let bankRetrieve = retrieveBankQuestions('questionbank');
  res.json(bankRetrieve)
})

app.get('/retrievepastquestiontitles', async (req, res) => {
  let titles = await retrievePastTitles('labquestions');
  res.json(titles);
})



app.post('/savetoquestionbank', async (req, res) => {
  let bank_question = {
    bank_id: uuidv4(),
    bank_module: req.body.moduleCode,
    bank_question: req.body.title,
    bank_answer: req.body.solution
  }
  let saveFAQ = await saveQA('questionbank', bank_question.bank_id, bank_question.bank_module, bank_question.bank_question, bank_question.bank_answer)
  console.log(saveFAQ);
  res.json('success');
})

app.put("/addsolution", async(req, res) => {
  let solution = await saveSolution('labquestions', req.body.question_id, req.body.solution);
  console.log(solution)
  res.json('success')
})



app.post("/saveteacher", async(req, res) => {
  console.log(req.body)
  let successSavingTeacher = await saveTeacher('educators', 'wemb1', req.body.username, req.body.manning_lab_mon, req.body.manning_lab_tue, req.body.manning_lab_wed, req.body.manning_lab_thu, req.body.manning_lab_fri)
  console.log(successSavingTeacher);
  res.json('success')
})

app.get("/retrieveteachers", async (req, res) => {
  let retrieveTeachers = await retrieveTeach('educators')
  console.log(retrieveTeachers);
  res.json('success')
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