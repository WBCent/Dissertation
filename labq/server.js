import express from "express";
const app = express();
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import * as assetRouter from "./server/assets-router.mjs";
import {
  schema,
  createRow,
  retrievePastQuestions,
  retrieveLastQuestion,
  deleteTable,
  openOrClosed,
  updateQuestion,
  retrieveBankQuestions,
  retrievePastTitles,
  cancelRequest,
  saveSolution,
  saveQA,
  saveTeacher,
  retrieveTeach,
  theOldSwitcheroo,
  saveComment,
  theOldSwitcherooComments,
  retrieveAllComments,
  placeInQueue,
  setTimes,
  addTeacher,
  updatePlaceInQueue,
  addTeacherToDB,
  current_date_and_time,
  countTotalRequests,
  countTotalUsers,
  currentModuleRequests,
  oldModuleRequests,
  requestsWithSolutions,
  countEducatorSolved,
  retrieveQuestionsForTeachers,
  solveQuestion,
  times,
  linkedPracticalTitle,
  fetchSolution,
  updateSolution,
  fetchTeachers,
  updateComment,
  fetchComments,
  solveRequestDB,
  fetchTimes,
} from "./Models/data-model.js";
import { v4 as uuidv4 } from "uuid";

app.use(express.json());

app.post("/formsubmission", async (req, res) => {
  console.log(req.body);
  let id = uuidv4().toString().replace(/-/g, "");
  console.log(id);
  let question_status = "open";
  console.log(
    "labquestions",
    id,
    req.body.moduleCode,
    req.body.practical,
    req.body.problem,
    req.body.location,
    req.body.username,
    req.body.time,
    req.body.date,
    question_status
  );
  let formSubmitted = await createRow(
    "labquestions",
    id,
    req.body.moduleCode,
    req.body.practical,
    req.body.linkedPractical,
    req.body.title,
    req.body.problem,
    req.body.location,
    req.body.username,
    req.body.date,
    req.body.time,
    question_status
  );
  console.log("form submitted", formSubmitted);
  res.status(200).json({ message: "The form was submitted" });
});

app.put("/updatequestion", async (req, res) => {
  console.log(req.body);
  let update = await updateQuestion(
    "labquestions",
    req.body.question_id,
    req.body.moduleCode,
    req.body.practical,
    req.body.linkedPractical,
    req.body.title,
    req.body.problem,
    req.body.location
  );
  console.log("update Question", update);
  res.json("success");
});

app.post("/openOrClosed", async (req, res) => {
  console.log("Open or closed", req.body);
  let test = await openOrClosed("labquestions", req.body.user);
  console.log("Open or Closed", test);
  //Check if this is correct.
  console.log(test[0]?.question_status);
  if (test[0]?.question_status == "open") {
    res.json({ askAnotherQuestion: false });
  } else if (test[0]?.question_status == "closed") {
    res.json({ askAnotherQuestion: true });
  } else {
    res.json({ askAnotherQuestion: true });
  }
});

app.put("/cancelrequest", async (req, res) => {
  console.log("Cancel Request 1", req.body);
  console.log("reason", req.body.reason);
  let requestCancellation = await cancelRequest(
    "labquestions",
    req.body.reason,
    req.body.question_id
  );
  let updateRestOfPlaces = await updatePlaceInQueue();
  console.log(requestCancellation);
  res.json("success");
});

//Need to add an endpoint on the staff side that is when the question has been closed it communicates to the backend that the question should be switched DB
app.put("/onclose", async (req, res) => {
  console.log("moving it over", req.body);
  console.log(req.body.question_id);
  let oldSwitcheroo = await theOldSwitcheroo(req.body.question_id);
  let oldSwitcherooComments = await theOldSwitcherooComments(
    req.body.question_id
  );
  console.log(
    "Successfully completed the switcheroo",
    oldSwitcheroo,
    oldSwitcherooComments
  );
  res.json({ success: "sucess" });
});

app.post("/retrievequestions", async (req, res) => {
  let retrievedOld = await retrievePastQuestions(
    "old_labquestions",
    req.body.username
  );
  res.json({ retrievedOld: retrievedOld });
});

app.post("/retrievejustasked", async (req, res) => {
  console.log("starting to retrieve last question", req.body);
  let retrieve = await retrieveLastQuestion("labquestions", req.body.username);
  console.log("retrieving just asked", retrieve);
  res.json({ retrieve });
});

app.get("/getUserId", (req, res) => {
  res.json({ id1: uuidv4(), id2: uuidv4() });
});

// app.get('/cslabs', (req, res) => {
//   console.log(req.params, req.body, req.status)
//   res.json({message: 'I am in cslabs'})
// });

app.delete("/delete", async (req, res) => {
  await deleteTable("labquestions");
  res.json("success");
});

app.post("/retrieveBankQuestions", async (req, res) => {
  let bankRetrieve = await retrieveBankQuestions("questionbank", req.body.moduleCode);
  console.log(bankRetrieve);
  res.json(bankRetrieve);
});

app.get("/retrievepastquestiontitles", async (req, res) => {
  let titles = await retrievePastTitles("old_labquestions");
  res.json(titles);
});

app.post("/savetoquestionbank", async (req, res) => {
  let bank_question = {
    bank_id: uuidv4(),
    bank_module: req.body.moduleCode,
    bank_question: req.body.title,
    bank_answer: req.body.solution,
  };
  let saveFAQ = await saveQA(
    "questionbank",
    bank_question.bank_id,
    bank_question.bank_module,
    bank_question.bank_question,
    bank_question.bank_answer
  );
  console.log(saveFAQ);
  res.json("success");
});

app.post("/addsolution", async (req, res) => {
  console.log("add Solution Body", req.body);
  let array = Object.entries(req.body);
  console.log(array);
  let comments = [];

  for (let i = 0; i < array.length; i++) {
    comments[i] = {
      question_id: array[i][0],
      solution: array[i][1],
    };
  }

  console.log(comments);

  for (let comment in comments) {
    console.log("each comment", comments[comment]);
    await saveSolution(
      "old_labquestions",
      comments[comment].question_id,
      comments[comment].solution
    );
  }
  res.json("success");
});

app.post("/saveteacher", async (req, res) => {
  console.log(req.body);
  let successSavingTeacher = await saveTeacher(
    req.body.username,
    req.body.level,
    req.body.manning_mon,
    req.body.manning_tue,
    req.body.manning_wed,
    req.body.manning_thu,
    req.body.manning_fri
  );
  console.log(successSavingTeacher);
  res.json("success");
});

app.get("/retrieveteachers", async (req, res) => {
  let retrieveTeachers = await retrieveTeach("educators");
  console.log("retrieveTEachers", retrieveTeachers);
  res.json(retrieveTeachers);
});

app.post("/savecomment", async (req, res) => {
  console.log(req.body);
  let comment = await saveComment(
    "comments",
    uuidv4(),
    req.body.main_comment,
    req.body.question_id
  );
  console.log("save comment comment", comment);
  res.json("success");
});

app.get("/retrieveComments", async (req, res) => {
  let comments = await retrieveAllComments();
  console.log("comments", comments);
  res.json({ comments });
});

app.post("/retrieveplaceinqueue", async (req, res) => {
  let queuePlace = await placeInQueue(req.body.question_id);
  console.log("Place in Queue", queuePlace);
  res.json(queuePlace);
});

app.get("/retrievetimes", async (req, res) => {
  let times = await retrieveTimes();
  console.log(times);
});

app.put("/settimes", async (req, res) => {
  console.log(req.body);
  await setTimes(
    "monday",
    req.body.monday.mon_open,
    req.body.monday.mon_close,
    req.body.monday.mon_active
  );
  await setTimes(
    "tuesday",
    req.body.tuesday.tue_open,
    req.body.tuesday.tue_close,
    req.body.tuesday.tue_active
  );
  await setTimes(
    "wednesday",
    req.body.wednesday.wed_open,
    req.body.wednesday.wed_close,
    req.body.wednesday.wed_active
  );
  await setTimes(
    "thursday",
    req.body.thursday.thu_open,
    req.body.thursday.thu_close,
    req.body.thursday.thu_active
  );
  await setTimes(
    "friday",
    req.body.friday.fri_open,
    req.body.friday.fri_close,
    req.body.friday.fri_active
  );
  res.json({ success: true });
});

app.post("/addTeacher", async (req, res) => {
  console.log("addTeacher", req.body);
  let add = await addTeacher(req.body.username);
  console.log(add);
  res.send({ success: "success" });
});

app.post("/addteachertodb", async (req, res) => {
  console.log("addteachertodb", req.body);
  let addTeacher = await addTeacherToDB(
    req.body.username,
    req.body.name,
    req.body.level,
    req.body.monday,
    req.body.tuesday,
    req.body.wednesday,
    req.body.thursday,
    req.body.friday
  );
  res.send({ success: "success" });
});

app.get("/noofrequests", async (req, res) => {
  let testDate = new Date();
  let date = `${testDate.getFullYear()}-${testDate.getMonth()}-${testDate.getDate()}`;
  let current = await current_date_and_time();
  console.log("current", current, date);
  let eachTableRequests = await countTotalRequests(
    current[0]["opening_time"],
    date
  );
  console.log("total requests", eachTableRequests);
  let totalRequests =
    eachTableRequests.currentCount[0]["COUNT(*)"] +
    eachTableRequests.oldCount[0]["COUNT(*)"];
  console.log("total Requests", totalRequests);
  let students = await countTotalUsers(current, date);
  console.log("students", students);
  let concatStudents = students.currentCount.concat(students.oldCount);
  console.log("Concatenated students", concatStudents);
  for (let i = concatStudents.length - 1; i > 0; i--) {
    for (let j = concatStudents.length - 2; j > -1; j--) {
      if (concatStudents[i].username == concatStudents[j].username) {
        concatStudents.splice(j, 1);
      }
    }
  }
  console.log(concatStudents);
  let totalStudents = concatStudents.length;
  let requests_per_student = totalRequests / totalStudents;
  res.json({ totalRequests, totalStudents, requests_per_student });
});

app.post("/requestspermodule", async (req, res) => {
  console.log(req.body);
  let testDate = new Date();
  let date = `${testDate.getFullYear()}-${testDate.getMonth()}-${testDate.getDate()}`;
  let current = await current_date_and_time();
  console.log("current", current, date);
  let currentRequests = await currentModuleRequests(req.body.formValues);
  let oldRequests = await oldModuleRequests(
    req.body.formValues,
    date,
    current[0].opening_time
  );
  console.log("currentRequests", currentRequests);
  console.log("oldRequests by Module", oldRequests);
  let totalRequestsByModule =
    currentRequests[0]["COUNT(*)"] + oldRequests[0]["COUNT(*)"];
  console.log("total Requests by Module", totalRequestsByModule);
  res.json({ totalRequestsByModule });
});

app.get("/requestsWithSolutions", async (req, res) => {
  let testDate = new Date();
  let date = `${testDate.getFullYear()}-${testDate.getMonth()}-${testDate.getDate()}`;
  let current = await current_date_and_time();
  let solvedRequests = await requestsWithSolutions(date, current);
  let eachTableRequests = await countTotalRequests(
    current[0]["opening_time"],
    date
  );
  let totalRequests =
    eachTableRequests.currentCount[0]["COUNT(*)"] +
    eachTableRequests.oldCount[0]["COUNT(*)"];
  let solvedPercent = solvedRequests / totalRequests;
  res.json({ solvedRequests, solvedPercent });
});

app.post("/requestspereducator", async (req, res) => {
  console.log("requests per educator", req.body);
  let testDate = new Date();
  let date = `${testDate.getFullYear()}-${testDate.getMonth()}-${testDate.getDate()}`;
  let current = await current_date_and_time();
  let solvedCountByEducator = await countEducatorSolved(
    req.body.educatorValue,
    date,
    current
  );
  console.log("Should be zero", solvedCountByEducator);
  res.json({ solvedCountByEducator });
});

app.get("/retrieveqsforteacher", async (req, res) => {
  let questionsRetrieved = await retrieveQuestionsForTeachers();
  console.log("questions for teachers", questionsRetrieved);
  res.json(questionsRetrieved);
});

app.post("/solvequestions", async (req, res) => {
  console.log(req.body);
  let testDate = new Date();
  let time = `${testDate.getHours()}:${testDate.getMinutes()}:${testDate.getSeconds()}`;
  let solved = await solveQuestion(
    req.body.educator_name,
    time,
    req.body.question_id
  );
  console.log(solved);
  let oldSwitcheroo = await theOldSwitcheroo(req.body.question_id);
  let oldSwitcherooComments = await theOldSwitcherooComments(
    req.body.question_id
  );
  res.json({ success: true });
});

app.get("/fetchwaittime", async (req, res) => {
  let testDate = new Date();
  let date = `${testDate.getFullYear()}-${testDate.getMonth()}-${testDate.getDate()}`;
  let checkOne = await times(date);
  console.log(checkOne);
  let differencesArray = [];
  let started_time;
  let finished_time;
  let difference;
  let question_time_solved;
  let question_time_started;
  checkOne.map(
    (obj) => (
      (question_time_started = obj.question_time.split(":")),
      console.log("question time started", question_time_started),
      (started_time =
        question_time_started[0] * 60 * 60 +
        question_time_started[1] * 60 +
        question_time_started[2]),
      console.log("started Time", started_time),
      (question_time_solved = obj.time_solved.split(":")),
      console.log("solved time", question_time_solved),
      (finished_time =
        question_time_solved[0] * 60 * 60 +
        question_time_solved[1] * 60 +
        question_time_solved[2]),
      console.log("Finished Time", finished_time),
      (difference = finished_time - started_time),
      differencesArray.push(difference)
    )
  );
  console.log("Differences array", differencesArray);
  let totalTimeWaited = 0;
  for (let i = 0; i < differencesArray.length; i++) {
    totalTimeWaited += differencesArray[i];
  }
  let avgTotalTimeWaited = totalTimeWaited / differencesArray.length;
  let avgTimeWaited = avgTotalTimeWaited / 60;
  console.log(Math.round(avgTimeWaited));
  res.json({avgTimeWaited})
});

app.post("/linkedpracticaltitle", async (req, res) => {
  console.log(
    "Hello there this is to get the linked practical title",
    req.body
  );
  let linkedTitle = await linkedPracticalTitle(req.body.test);
  console.log("linkedTitle", linkedTitle);
  res.json(linkedTitle);
});


app.post('/fetchsolution', async (req, res) => {
  let solutionDB = await fetchSolution(req.body.question_id)
  res.json(solutionDB)
})

app.put('/updatesolution', async(req, res) => {
  console.log(req.body);
  console.log("add Solution Body", req.body);
  let array = Object.entries(req.body);
  console.log(array);
  let comments = [];

  for (let i = 0; i < array.length; i++) {
    comments[i] = {
      question_id: array[i][0],
      solution: array[i][1],
    };
  }

  console.log(comments);

  for (let comment in comments) {
    let updatedSolution = await updateSolution(comments[comment].question_id, comments[comment].solution)
  }
  res.json({success: true})
})

app.get('/fetchteachers', async(req, res) => {
  let teacherUsernames = await fetchTeachers()
  console.log(teacherUsernames);
  res.json(teacherUsernames)
})

app.put('/submiteditedcomment', async(req, res) => {
  console.log(req.body);
  let successfulComment = await updateComment(req.body.main_comment, req.body.question_id)
  res.json({success: true})
})

app.post("/fetchcomments", async(req, res) => {
  console.log(req.body[0], "username")
  let comments = await fetchComments(req.body[0])
  res.json(comments);
})

app.put("/solvedrequest", async(req, res) => {
  console.log(req.body, "Solved Requests")
  let solveRequest = await solveRequestDB(req.body.question_id, req.body.solution)
  let updateRestOfPlaces = await updatePlaceInQueue();
  let oldSwitcheroo = await theOldSwitcheroo(req.body.question_id);
  let oldSwitcherooComments = await theOldSwitcherooComments(
    req.body.question_id
  );
  res.json({success: 'success'})
})

app.get("/fetchOpenAndCloseTimes", async (req, res) => {
  let fetchedTimes = await fetchTimes();
  res.json(fetchedTimes)
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
