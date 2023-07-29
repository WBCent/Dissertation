// import {
//   createRow,
//   retrievePastQuestions,
//   retrieveLastQuestion,
//   deleteTable,
//   openOrClosed,
//   updateQuestion,
//   retrieveBankQuestions,
//   retrievePastTitles,
//   cancelRequest,
//   saveSolution,
//   saveQA,
//   saveTeacher,
//   retrieveTeach,
//   theOldSwitcheroo,
//   saveComment,
//   theOldSwitcherooComments,
//   retrieveAllComments,
//   placeInQueue,
//   setTimes,
//   addTeacher,
//   updatePlaceInQueue,
//   addTeacherToDB,
//   current_date_and_time,
//   countTotalRequests,
//   countTotalUsers,
//   currentModuleRequests,
//   oldModuleRequests,
//   requestsWithSolutions,
//   countEducatorSolved,
//   retrieveQuestionsForTeachers,
//   solveQuestion,
//   times,
//   linkedPracticalTitle,
//   fetchSolution,
//   updateSolution,
//   fetchTeachers,
//   updateComment,
//   fetchComments,
//   solveRequestDB,
//   fetchTimes,
// } from "../Models/data-model.js";
import Mocha from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import chaiAsPromised from "chai-as-promised";
import Sinon from "sinon";
import * as random from "../Models/data-model.js";
const baseURL = "http://localhost:5000";

const should = chai.should();
const expect = chai.expect;

chai.use(chaiAsPromised);
chai.use(chaiHttp);

describe.only("testing form submission link", () => {
  let passingTest = {
    moduleCode: "CS1002",
    practical: "Hello",
    linkedPractical: "N/A",
    title: "asdf",
    problem: "ghjk",
    location: "PC",
    username: "wemb1@st-andrews.ac.uk",
    date: "27/07/2023",
    time: "14:05",
  };



  it("Success", async () => {
    Sinon.mock(random.createRow).resolves(true)
    const response = await chai
      .request(baseURL)
      .post("/formsubmission")
      .send(passingTest);
    response.should.have.status(201);
    response.body.should.be.a("object");
    response.body.should.have.property("message");
    response.body.message.should.equal("The form was submitted");
  });

  it("failure", async () => {
    Sinon.mock(random.createRow).throws(new Error('Please bloody work'))
    const response = await chai
      .request(baseURL)
      .post("/formsubmission")
      .send(passingTest);
    response.should.have.status(400);
    response.body.should.be.a("object");
    response.body.should.have.property("message");
    response.body.message.should.equal("Form Submission Failed");

  })


});
