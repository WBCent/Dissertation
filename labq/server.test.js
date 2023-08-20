import sqlite3 from "sqlite3";
import request from "supertest";
import db from "./Database/db-test";
let baseURL = "http://localhost:5000";

//updateQuestion, openORClosed, cancelRequest

let sqlEducators = `
CREATE TABLE IF NOT EXISTS educators (
  username VARCHAR(50) NOT NULL,
  educator_name VARCHAR(50),
  course_level VARCHAR(15),
  manning_lab_mon INTEGER,
  manning_lab_tue INTEGER,
  manning_lab_wed INTEGER,
  manning_lab_thu INTEGER,
  manning_lab_fri INTEGER
);`;

let SQLInsertEducators = `INSERT INTO educators (username, course_level, educator_name)
                          VALUES ("testTeacher@st-andrews.ac.uk", "N/A", "Perry the platapus")`;

let sqlLabQuestions = `

CREATE TABLE if NOT EXISTS labquestions (
  question_id VARCHAR(32) PRIMARY KEY ,
  module VARCHAR(6) NOT NULL,
  practical VARCHAR(900) NOT NULL,
  linked_question_id VARCHAR(33),
  problem_title VARCHAR(300) NOT NULL,
  problem VARCHAR(900) NOT NULL,
  pc_location VARCHAR(7) NOT NULL,
  username VARCHAR(50) NOT NULL,
  question_time VARCHAR(50) NOT NULL,
  question_date VARCHAR (50) NOT NULL,
  question_status VARCHAR(20) NOT NULL,
  solved_by VARCHAR(50),
  time_solved VARCHAR(10),
  reason_for_cancellation VARCHAR(900),
  solution VARCHAR(900),
  place_in_queue INTEGER
);
`;

let SQLInsertLabQuestions = `INSERT INTO labquestions (question_id, module, practical, linked_question_id, problem_title, problem, pc_location, username, question_time, question_date, question_status, solved_by, time_solved, place_in_queue)
VALUES ('124235kljhsgklah', 'CS1002', 'This is the practical', 'N/A', 'This is the problem title', 'this is my problem', 'PC0-008', 'updateQuestionTest@st-andrews.ac.uk', '18:53', '17-08-2023', 'open', 'jh1', '19:50', '1');
`;
let SQLInsertLabQuestionsOne = `INSERT INTO labquestions (question_id, module, practical, linked_question_id, problem_title, problem, pc_location, username, question_time, question_date, question_status, solved_by, time_solved, place_in_queue)
VALUES ('4567898765478', 'CS1002', 'This is the practical', 'N/A', 'This is the problem title', 'this is my problem', 'PC0-008', 'test@st-andrews.ac.uk', '18:53', '17-08-2023', 'open', 'jh1', '19:50', '2');
`;

let SQLInsertOldLabQuestions = `INSERT INTO old_labquestions (question_id, module, practical, linked_question_id, problem_title, problem, pc_location, username, question_time, question_date, question_status, solved_by, time_solved)
VALUES ('asdfasdfas', 'CS1002', 'This is the practical', 'N/A', 'This is the problem title', 'this is my problem', 'PC0-008', 'wemb1@st-andrews.ac.uk', '18:53', '17-08-2023', 'closed', 'jh1', '19:50');
`;

let SQLInsertLabQuestionsFour = `INSERT INTO labquestions(question_id, module, practical, linked_question_id, problem_title, problem, pc_location, username, question_time, question_date, question_status, solved_by, time_solved, place_in_queue)
                                  VALUES('QTWERQWET', 'CS1002', 'This is the practical', 'N/A', 'This is the problem title', 'this is my problem', 'PC0-008', 'placeInQueue@st-andrews.ac.uk', '18:53', '17-08-2023', 'closed', 'jh1', '19:50', 4)`;

let SQLInsertLabQuestionsTwo = `INSERT INTO labquestions (question_id, module, practical, linked_question_id, problem_title, problem, pc_location, username, question_time, question_date, question_status, solved_by, time_solved, place_in_queue)
VALUES ('lologasdga', 'CS1002', 'This is the practical', 'N/A', 'This is the problem title', 'this is my problem', 'PC0-008', 'justAsked@st-andrews.ac.uk', '18:53', '17-08-2023', 'open', 'jh1', '19:50', '3');
`;

let SQLInsertLabQuestionsthree = `INSERT INTO old_labquestions (question_id, module, practical, linked_question_id, problem_title, problem, pc_location, username, question_time, question_date, question_status, solved_by, time_solved)
VALUES ('lkjhgf', 'CS1002', 'This is the practical', 'N/A', 'This is the problem title', 'this is my problem', 'PC0-008', 'retrievequestions@st-andrews.ac.uk', '18:53', '17-08-2023', 'closed', 'jh1', '19:50');
`;

let SQLInsertLabQuestionFive = `INSERT INTO labquestions (question_id, module, practical, linked_question_id, problem_title, problem, pc_location, username, question_time, question_date, question_status, solved_by, time_solved, place_in_queue)
VALUES ('mnbvcxz', 'CS1002', 'This is the practical', 'N/A', 'This is the problem title', 'this is my problem', 'PC0-008', 'saveComment@st-andrews.ac.uk', '18:53', '17-08-2023', 'open', 'jh1', '19:50', '5');
`;

let SQLInsertTimesMon = `INSERT INTO openingTimes(day_of_the_week, opening_time, closing_time, active)
                          VALUES ('monday', "", "", false);`;

let SQLInsertTimesTue = `INSERT INTO openingTimes(day_of_the_week, opening_time, closing_time, active)
  VALUES ('tuesday', "", "", false)`;

let SQLInsertTimesWed = `INSERT INTO openingTimes(day_of_the_week, opening_time, closing_time, active)
  VALUES ('wednesday', "", "", false)`;
let SQLInsertTimesThu = `INSERT INTO openingTimes(day_of_the_week, opening_time, closing_time, active)
  VALUES ('thursday', "", "", false)`;
let SQLInsertTimesFri = `INSERT INTO openingTimes(day_of_the_week, opening_time, closing_time, active)
  VALUES ('friday', "", "", false)`;

let SQLInsertQuestionBank = `INSERT INTO questionbank(bank_id, bank_module, bank_question, bank_answer)
                              VALUES ('123412341234', 'CS1003', 'bank_question', 'bank_answer');`;

let SQLInsertLabQuestionsSix = `INSERT INTO labquestions (question_id, module, practical, linked_question_id, problem_title, problem, pc_location, username, question_time, question_date, question_status, solved_by, time_solved, place_in_queue)
VALUES ('popoiuytr', 'CS1002', 'This is the practical', 'N/A', 'This is the problem title', 'this is my problem', 'PC0-008', 'testingSolvedRequests@st-andrews.ac.uk', '18:53', '17-08-2023', 'open', 'jh1', '19:50', '6');
`;



let sqlComments = `
CREATE TABLE IF NOT EXISTS comments (
  comment_id VARCHAR(32) PRIMARY KEY,
  main_comment VARCHAR(900) NOT NULL,
  question_id VARCHAR(32) NOT NULL,
  FOREIGN KEY (question_id) REFERENCES labquestions (question_id)
);
`;

let sqlOldLabQuestions = `
CREATE TABLE IF NOT EXISTS old_labquestions (
  question_id VARCHAR(35) PRIMARY KEY,
  module VARCHAR(6) NOT NULL,
  practical VARCHAR(900) NOT NULL,
  linked_question_id VARCHAR(32),
  problem_title VARCHAR(300) NOT NULL,
  problem VARCHAR(900) NOT NULL,
  pc_location VARCHAR(7) NOT NULL,
  username VARCHAR(50) NOT NULL,
  question_time VARCHAR(50) NOT NULL,
  question_date VARCHAR(50) NOT NULL,
  question_status VARCHAR(20) NOT NULL,
  solved_by VARCHAR(50),
  time_solved VARCHAR(10),
  reason_for_cancellation VARCHAR(900),
  solution VARCHAR(900)
);

`;

let sqlQuestionBank = `
CREATE TABLE IF NOT EXISTS questionbank (
  bank_id VARCHAR (32) PRIMARY KEY,
  bank_module VARCHAR(6) NOT NULL,
  bank_question VARCHAR(100) NOT NULL,
  bank_answer VARCHAR(900) NOT NULL
);
`;

let sqlOpeningTimes = `
CREATE TABLE IF NOT EXISTS openingTimes (
  day_of_the_week VARCHAR(10) PRIMARY KEY,
  opening_time TIMESTAMP,
  closing_time TIMESTAMP,
  active INTEGER
);
`;

let sqlOldComments = `
CREATE TABLE IF NOT EXISTS old_comments (
  comment_id VARCHAR(32) PRIMARY KEY,
  main_comment VARCHAR(900) NOT NULL,
  question_id VARCHAR(32) NOT NULL,
  FOREIGN KEY (question_id) REFERENCES old_labquestions (question_id)
);

`;

let sqlAddComment = `INSERT INTO comments (comment_id, main_comment, question_id)
                     VALUES ('lologasdga', 'random', 'lologasdga')`

let sqlDeleteLabQuestions = `DROP TABLE IF EXISTS labquestions;`;

let sqlDeleteEducators = `DROP TABLE IF EXISTS educators;`;

let sqlDeleteQuestionBank = `DROP TABLE IF EXISTS questionbank;`;

let sqlDeleteOldLabQuestions = `DROP TABLE IF EXISTS old_labquestions;`;

let sqlDeleteComments = `DROP TABLE IF EXISTS comments;`;

let sqlDeleteOpeningTimes = `DROP TABLE IF EXISTS openingTimes;`;

let sqlDeleteOldComments = `DROP TABLE IF EXISTS old_comments;`;

//Written with help from ChatGPT: https://chat.openai.com/ and // https://www.sqlitetutorial.net/sqlite-nodejs/connect/
beforeAll(async () => {
  console.log("setting up DB");
  await new Promise((resolve, reject) => {
    console.log("adding to labquestions");
    db.run(sqlLabQuestions, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  await new Promise((resolve, reject) => {
    db.run(sqlOldLabQuestions, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  await new Promise((resolve, reject) => {
    db.run(sqlQuestionBank, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  await new Promise((resolve, reject) => {
    db.run(sqlOpeningTimes, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  await new Promise((resolve, reject) => {
    db.run(sqlOldComments, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  await new Promise((resolve, reject) => {
    db.run(sqlEducators, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  await new Promise((resolve, reject) => {
    db.run(sqlComments, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  await new Promise((resolve, reject) => {
    db.run(SQLInsertLabQuestions, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  await new Promise((resolve, reject) => {
    db.run(SQLInsertLabQuestionsthree, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  await new Promise((resolve, reject) => {
    db.run(SQLInsertLabQuestionsOne, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  await new Promise((resolve, reject) => {
    db.run(SQLInsertOldLabQuestions, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  await new Promise((resolve, reject) => {
    db.run(SQLInsertLabQuestionsTwo, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  await new Promise((resolve, reject) => {
    db.run(SQLInsertQuestionBank, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  await new Promise((resolve, reject) => {
    db.run(SQLInsertLabQuestionsFour, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  await new Promise((resolve, reject) => {
    db.run(SQLInsertEducators, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  await new Promise((resolve, reject) => {
    db.run(SQLInsertLabQuestionFive, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  await new Promise((resolve, reject) => {
    db.run(SQLInsertTimesMon, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  await new Promise((resolve, reject) => {
    db.run(SQLInsertTimesTue, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  await new Promise((resolve, reject) => {
    db.run(SQLInsertTimesWed, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  await new Promise((resolve, reject) => {
    db.run(SQLInsertTimesThu, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  await new Promise((resolve, reject) => {
    db.run(SQLInsertTimesFri, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  await new Promise((resolve, reject) => {
    db.run(sqlAddComment, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  await new Promise((resolve, reject) => {
    db.run(SQLInsertLabQuestionsSix, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
});

afterAll(async () => {
  await new Promise((resolve, reject) => {
    db.run(sqlDeleteLabQuestions, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  await new Promise((resolve, reject) => {
    db.run(sqlDeleteEducators, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  await new Promise((resolve, reject) => {
    db.run(sqlDeleteQuestionBank, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  await new Promise((resolve, reject) => {
    db.run(sqlDeleteOldComments, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  await new Promise((resolve, reject) => {
    db.run(sqlDeleteOldLabQuestions, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  await new Promise((resolve, reject) => {
    db.run(sqlDeleteComments, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  await new Promise((resolve, reject) => {
    db.run(sqlDeleteOpeningTimes, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
});

//End of written with help from ChatGPT

describe("testing read functions", () => {
  test("Testing read labquestions works correctly", async () => {
    console.log("starting tests");
    let sqlReadLabQuestions = `SELECT * FROM labquestions WHERE username='test@st-andrews.ac.uk';`;
    expect(
      await new Promise((resolve, reject) => {
        db.all(sqlReadLabQuestions, (error, rows) => {
          if (error) {
            console.log(error);
            reject(error);
          } else {
            resolve(rows);
          }
        });
      })
    ).toEqual([
      {
        linked_question_id: "N/A",
        module: "CS1002",
        pc_location: "PC0-008",
        place_in_queue: 2,
        practical: "This is the practical",
        problem: "this is my problem",
        problem_title: "This is the problem title",
        question_date: "17-08-2023",
        question_id: "4567898765478",
        question_status: "open",
        question_time: "18:53",
        reason_for_cancellation: null,
        solution: null,
        solved_by: "jh1",
        time_solved: "19:50",
        username: "test@st-andrews.ac.uk",
      },
    ]);
  });
});

describe("testing form submission", () => {
  test("success", async () => {
    let sqlReadDatabase = `SELECT * FROM labquestions WHERE username="wemb1@st-andrews.ac.uk"`;
    let passingTest = {
      moduleCode: "CS1003",
      practical: "This is the practical",
      linkedPractical: "N/A",
      title: "This is the title",
      problem: "This is the problem",
      location: "PC",
      username: "wemb1@st-andrews.ac.uk",
      date: "2023-07-31",
      time: "17:05:23",
    };
    let response = await request(baseURL)
      .post("/formsubmission")
      .send(passingTest);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("The form was submitted");
    let DBCheck = await new Promise((resolve, reject) => {
      db.all(sqlReadDatabase, (err, rows) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    let questionID = await new Promise((resolve, reject) => {
      db.all(
        `SELECT question_id FROM labquestions WHERE username="wemb1@st-andrews.ac.uk"`,
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
    expect(DBCheck).toEqual([
      {
        question_id: questionID[0]["question_id"],
        module: "CS1003",
        practical: "This is the practical",
        linked_question_id: "N/A",
        problem_title: "This is the title",
        problem: "This is the problem",
        pc_location: "PC",
        username: "wemb1@st-andrews.ac.uk",
        question_date: "2023-07-31",
        question_time: "17:05:23",
        question_status: "open",
        reason_for_cancellation: null,
        solution: null,
        solved_by: null,
        time_solved: null,
        place_in_queue: 7,
      },
    ]);
  });

  test("failure", async () => {
    let failingTest = {
      moduleCode: null,
      practical: null,
      linkedPractical: null,
      title: null,
      problem: null,
      location: null,
      username: null,
      date: null,
      time: null,
    };

    let response = await request(baseURL)
      .post("/formsubmission")
      .send(failingTest);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Form Submission Failed");
  });
});

describe("Testing /updatequestion", () => {
  test("success", async () => {
    let sqlGetID = `SELECT question_id FROM labquestions WHERE username="updateQuestionTest@st-andrews.ac.uk";`;

    let id = await new Promise((resolve, reject) => {
      db.all(sqlGetID, (err, rows) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    console.log("This is the id", id);
    let passingTest = {
      question_id: id[0]["question_id"],
      moduleCode: "CS1004",
      practical: "This is a practical",
      linkedPractical: "N/A",
      title: "This is a title",
      problem: "asdf",
      location: "The same",
    };
    let response = await request(baseURL)
      .put("/updatequestion")
      .send(passingTest);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("success");
    let SQLDBcheck = `SELECT module, practical, linked_question_id, problem_title, problem, pc_location FROM labquestions WHERE question_id="${id[0]["question_id"]}";`;
    let updatedQuestionDBCheck = await new Promise((resolve, reject) => {
      db.all(SQLDBcheck, (err, rows) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    expect(updatedQuestionDBCheck).toEqual([
      {
        module: "CS1004",
        practical: "This is a practical",
        linked_question_id: "N/A",
        problem_title: "This is a title",
        problem: "asdf",
        pc_location: "The same",
      },
    ]);
  });
  //Failure will never throw an error as UPDATE statements do not throw errors
  test("failure", async () => {
    let sqlGetID = `SELECT question_id FROM labquestions WHERE username="updateQuestionTest@st-andrews.ac.uk";`;
    let id = await new Promise((resolve, reject) => {
      db.all(sqlGetID, (err, rows) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    console.log("This is the failing test id", id);
    let failingTest = {
      question_id: id[0]["question_id"],
      moduleCode: null,
      practical: null,
      linkedPractical: null,
      title: null,
      problem: null,
      location: null,
    };
    let response = await request(baseURL)
      .put("/updatequestion")
      .send(failingTest);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Question Failed to Update");
  });
});

describe("Testing openOrClosed", () => {
  test("can't ask another question", async () => {
    let passingTest = {
      user: "updateQuestionTest@st-andrews.ac.uk",
    };
    let response = await request(baseURL)
      .post("/openOrClosed")
      .send(passingTest);
    expect(response.status).toBe(200);
    expect(response.body.askAnotherQuestion).toBe(false);
  });

  test("can't ask another question and username not found", async () => {
    let test = {
      user: "123124124qw4q",
    };
    let response = await request(baseURL).post("/openOrClosed").send(test);
    expect(response.status).toBe(200);
    expect(response.body.askAnotherQuestion).toBe(true);
  });
});

describe("Testing /cancelRequest", () => {
  test("Success", async () => {
    let cancel = {
      question_id: "124235kljhsgklah",
      reason: "asdf",
    };
    let response = await request(baseURL).put("/cancelrequest").send(cancel);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Success");
    let SQLDBcheck = `SELECT reason_for_cancellation from labquestions WHERE question_id="124235kljhsgklah";`;
    let cancelRequestDBCheck = await new Promise((resolve, reject) => {
      db.all(SQLDBcheck, (err, rows) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    expect(cancelRequestDBCheck).toEqual([
      {
        reason_for_cancellation: "asdf",
      },
    ]);
  });

  //Cannot get an Update SQLITE statement to make an error even if question is not found
});

describe("testing onclose", () => {
  test("Succcess", async () => {
    let test = {
      question_id: "124235kljhsgklah",
    };
    let response = await request(baseURL).put("/onclose").send(test);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe("sucess");
    let sqlDBTest = `SELECT * from old_labquestions WHERE question_id="${test.question_id}"`;
    let sqlDBTestOne = `SELECT * from labquestions WHERE question_id="${test.question_id}"`;
    let sqlDBTestComments = `SELECT * FROM comments WHERE question_id="${test.question_id}";`;
    let sqlDBTestOldComments = `SELECT * FROM old_comments WHERE question_id="${test.question_id}";`;
    let old_labquestions = await new Promise((resolve, reject) => {
      db.all(sqlDBTest, (err, rows) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    let labquestions = await new Promise((resolve, reject) => {
      db.all(sqlDBTestOne, (err, rows) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    let comments = await new Promise((resolve, reject) => {
      db.all(sqlDBTestComments, (err, rows) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    let old_comments = await new Promise((resolve, reject) => {
      db.all(sqlDBTestOldComments, (err, rows) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    expect(old_labquestions).toEqual([
      {
        question_id: "124235kljhsgklah",
        module: "CS1004",
        practical: "This is a practical",
        linked_question_id: "N/A",
        problem_title: "This is a title",
        problem: "asdf",
        pc_location: "The same",
        username: "updateQuestionTest@st-andrews.ac.uk",
        question_time: "18:53",
        question_date: "17-08-2023",
        question_status: "closed",
        solved_by: "jh1",
        time_solved: "19:50",
        reason_for_cancellation: "asdf",
        solution: "null",
      },
    ]);
    expect(labquestions).toEqual([]);
    expect(comments).toEqual([]);
    expect(old_comments).toEqual([]);
  });
  //Failure case is already tested for on the data-model, see theOldSwitcheroo
});

describe("Testing retrievequestions", () => {
  test("Success", async () => {
    let test = {
      username: "retrievequestions@st-andrews.ac.uk",
    };
    let response = await request(baseURL).post("/retrievequestions").send(test);
    expect(response.status).toBe(200);
    expect(response.body.retrievedOld).toEqual([
      {
        linked_question_id: "N/A",
        module: "CS1002",
        pc_location: "PC0-008",
        practical: "This is the practical",
        problem: "this is my problem",
        problem_title: "This is the problem title",
        question_date: "17-08-2023",
        question_id: "lkjhgf",
        question_status: "closed",
        question_time: "18:53",
        reason_for_cancellation: null,
        solution: null,
        solved_by: "jh1",
        time_solved: "19:50",
        username: "retrievequestions@st-andrews.ac.uk",
      },
    ]);
  });

  //SQLite error does not return error if not found
});

describe("Testing retrieve just asked", () => {
  test("Success", async () => {
    let test = {
      username: "justAsked@st-andrews.ac.uk",
    };
    let response = await request(baseURL).post("/retrievejustasked").send(test);
    expect(response.status).toBe(200);
    expect(response.body.retrieve).toEqual([
      {
        question_id: "lologasdga",
        module: "CS1002",
        practical: "This is the practical",
        linked_question_id: "N/A",
        problem_title: "This is the problem title",
        problem: "this is my problem",
        pc_location: "PC0-008",
        username: "justAsked@st-andrews.ac.uk",
        question_time: "18:53",
        question_date: "17-08-2023",
        question_status: "open",
        solved_by: "jh1",
        time_solved: "19:50",
        place_in_queue: 3,
        reason_for_cancellation: null,
        solution: null,
      },
    ]);
  });
});

describe("Testing retrieveBankQuestions", () => {
  test("Success", async () => {
    let test = {
      moduleCode: "CS1003",
    };
    let response = await request(baseURL)
      .post("/retrieveBankQuestions")
      .send(test);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        bank_id: "123412341234",
        bank_module: "CS1003",
        bank_question: "bank_question",
        bank_answer: "bank_answer",
      },
    ]);
  });
});

describe("testing savetoquestionbank", () => {
  test("success", async () => {
    let test = {
      moduleCode: "1234",
      title: "This",
      solution: "solution",
    };
    let response = await request(baseURL)
      .post("/savetoquestionbank")
      .send(test);
    expect(response.status).toBe(200);
    expect(response.body).toBe("success");
  });
});

describe("testing add solution", () => {
  test("success", async () => {
    let test = {
      asdfasdfas: "This should not be null",
    };
    let response = await request(baseURL).post("/addsolution").send(test);
    expect(response.status).toBe(200);
    expect(response.body).toBe("success");
    let sqlAdd = `SELECT solution FROM old_labquestions WHERE question_id="asdfasdfas";`;
    let result = await new Promise((resolve, reject) => {
      db.all(sqlAdd, (err, rows) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    console.log(result);
    expect(result).toEqual([{ solution: "This should not be null" }]);
  });
});

describe("save teacher", () => {
  test("success", async () => {
    let test = {
      username: "testTeacher@st-andrews.ac.uk",
      user: "Perry the Platapus",
      level: "CS1000",
      manning_mon: 1,
      manning_tue: 0,
      manning_wed: 1,
      manning_thu: 1,
      manning_fri: 1,
    };
    let response = await request(baseURL).post("/saveteacher").send(test);
    expect(response.status).toBe(200);
    expect(response.body).toBe("success");
    let sqlSaveTeacherCheck = `SELECT * FROM educators WHERE username="testTeacher@st-andrews.ac.uk";`;
    let check = await new Promise((resolve, reject) => {
      db.all(sqlSaveTeacherCheck, (err, rows) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    expect(check).toEqual([
      {
        username: "testTeacher@st-andrews.ac.uk",
        educator_name: "Perry the Platapus",
        course_level: "CS1000",
        manning_lab_mon: 1,
        manning_lab_tue: 0,
        manning_lab_wed: 1,
        manning_lab_thu: 1,
        manning_lab_fri: 1,
      },
    ]);
  });
});

describe("testing retrieveTeachers", () => {
  test("success", async () => {
    let response = await request(baseURL).get("/retrieveteachers");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        username: "testTeacher@st-andrews.ac.uk",
        educator_name: "Perry the Platapus",
        course_level: "CS1000",
        manning_lab_mon: 1,
        manning_lab_tue: 0,
        manning_lab_wed: 1,
        manning_lab_thu: 1,
        manning_lab_fri: 1,
      },
    ]);
  });
});

describe("testing save comment", () => {
  test("Success", async () => {
    let test = {
      question_id: "mnbvcxz",
      main_comment: "This is the comment",
    };
    let response = await request(baseURL).post("/savecomment").send(test);
    expect(response.status).toBe(200);
    expect(response.body).toEqual("success");
    let sqlTest = `SELECT main_comment FROM comments WHERE question_id="mnbvcxz";`;
    let check = await new Promise((resolve, reject) => {
      db.all(sqlTest, (err, rows) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    console.log(check);
    expect(check).toEqual([
      {
        main_comment: "This is the comment",
      },
    ]);
  });
});

describe("testing retrieve comments", () => {
  test("Success", async () => {
    let response = await request(baseURL).get("/retrieveComments");
    expect(response.status).toBe(200);
    expect(response.body.comments[0].main_comment).toEqual(
      "random"
    );
  });
});

describe("testing retrieve place in queue", () => {
  test("Success", async () => {
    let test = {
      question_id: "QTWERQWET",
    };
    let response = await request(baseURL)
      .post("/retrieveplaceinqueue")
      .send(test);
    expect(response.status).toBe(200);
    expect(response.body[0]["place_in_queue"]).toBe(4);
  });
});

describe("testing set Times", () => {
  test("Success", async () => {
    let test = {
      monday: {
        mon_open: "09:00",
        mon_close: "09:30",
        mon_active: true,
      },
      tuesday: {
        tue_open: "09:00",
        tue_close: "09:30",
        tue_active: true,
      },
      wednesday: {
        wed_open: "09:00",
        wed_close: "09:30",
        wed_active: true,
      },
      thursday: {
        thu_open: "09:00",
        thu_close: "09:30",
        thu_active: true,
      },
      friday: {
        fri_open: "09:00",
        fri_close: "09:30",
        fri_active: true,
      },
    };
    let response = await request(baseURL).put("/settimes").send(test);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    let sqlTest = `SELECT * FROM openingTimes`;
    let result = await new Promise((resolve, reject) => {
      db.all(sqlTest, (err, rows) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    expect(result).toEqual([
      {
        day_of_the_week: "monday",
        opening_time: "09:00",
        closing_time: "09:30",
        active: "true",
      },
      {
        day_of_the_week: "tuesday",
        opening_time: "09:00",
        closing_time: "09:30",
        active: "true",
      },
      {
        day_of_the_week: "wednesday",
        opening_time: "09:00",
        closing_time: "09:30",
        active: "true",
      },
      {
        day_of_the_week: "thursday",
        opening_time: "09:00",
        closing_time: "09:30",
        active: "true",
      },
      {
        day_of_the_week: "friday",
        opening_time: "09:00",
        closing_time: "09:30",
        active: "true",
      },
    ]);
  });
});

//Need to ensure that this actually recieves something
describe("testing retrieve times", () => {
  test("Success", async () => {
    let response = await request(baseURL).get("/retrievetimes");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      {
        day_of_the_week: "monday",
        opening_time: "09:00",
        closing_time: "09:30",
        active: "true",
      },
      {
        day_of_the_week: "tuesday",
        opening_time: "09:00",
        closing_time: "09:30",
        active: "true",
      },
      {
        day_of_the_week: "wednesday",
        opening_time: "09:00",
        closing_time: "09:30",
        active: "true",
      },
      {
        day_of_the_week: "thursday",
        opening_time: "09:00",
        closing_time: "09:30",
        active: "true",
      },
      {
        day_of_the_week: "friday",
        opening_time: "09:00",
        closing_time: "09:30",
        active: "true",
      },
    ]);
  });
});

// Check that the /addteacher api is needed
describe("Add teacher", () => {
  test("success", async () => {
    let test = {
      username: "hello@st-andrews.ac.uk",

    }
    let response = await request(baseURL).post("/addTeacher").send(test)
    expect(response.status).toBe(200)
    expect(response.body.success).toEqual("success")
    let SQLCommand = `SELECT username FROM educators WHERE username="${test.username}";`
    let check = await new Promise((resolve, reject) => {
      db.all(SQLCommand, (err, rows) => {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
    expect(check).toEqual([{ username: 'hello@st-andrews.ac.uk' }])
  })
})

describe("add teacher to db", () => {
  test("Success", async () => {
    let test = {
      username: "potential@st-andrews.ac.uk",
      name: "potential",
      level: "CS1000 & CS2000",
      monday: 1,
      tuesday: 1,
      wednesday: 1,
      thursday: 0,
      friday: 1,
    };
    let response = await request(baseURL).post("/addteachertodb").send(test);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe("success");
    let sqlTest = `SELECT * FROM educators WHERE username="${test.username}"`;
    let DBCheck = await new Promise((resolve, reject) => {
      db.all(sqlTest, (err, rows) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    expect(DBCheck).toEqual([
      {
        username: "potential@st-andrews.ac.uk",
        educator_name: "potential",
        course_level: "CS1000 & CS2000",
        manning_lab_mon: 1,
        manning_lab_tue: 1,
        manning_lab_wed: 1,
        manning_lab_thu: 0,
        manning_lab_fri: 1,
      },
    ]);
  });
});

describe("testing total number of requests", () => {
  test("success", async () => {
    let response = await request(baseURL).get("/noofrequests")
    //get date function taken from: https://www.w3schools.com/jsref/jsref_getday.asp
    const daysOfTheWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const d = new Date();
    console.log(d.getDay(), "This is the current number day")
    let day_of_the_week = daysOfTheWeek[d.getDay()];
    console.log("day of the week", day_of_the_week);
    if (day_of_the_week == 'saturday' || day_of_the_week == 'sunday') {
      expect(response.status).toBe(200)
      expect(response.body.totalRequests).toEqual('N/A')
      expect(response.body.totalStudents).toEqual('N/A')
      expect(response.body.requests_per_student).toEqual('N/A')
    } else {
      expect(response.status).toBe(200)
      expect(response.body.totalRequests).toEqual(6)
      expect(response.body.totalStudents).toEqual(2)
      expect(response.body.requests_per_student).toEqual(3)
    }
  })
})

describe("testing requests per module", () => {
  test("success", async () => {
    let test = {
      formValues: 'CS1003'
    }
    let response = await request(baseURL).post("/requestspermodule").send(test)
    //get date function taken from: https://www.w3schools.com/jsref/jsref_getday.asp
    const daysOfTheWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const d = new Date();
    console.log(d.getDay(), "This is the current number day")
    let day_of_the_week = daysOfTheWeek[d.getDay()];
    console.log("day of the week", day_of_the_week);
    if (day_of_the_week == 'saturday' || day_of_the_week == 'sunday') {
      expect(response.status).toBe(200)
      expect(response.body.totalRequestsByModule).toEqual("N/A")
    } else {
      expect(response.status).toBe(200)
      expect(response.body.totalRequestsByModule).toEqual(1)
    }
  })
})

describe("testing requests with solutions", () => {
  test("success", async () => {
    let response = await request(baseURL).get("/requestsWithSolutions")
    //get date function taken from: https://www.w3schools.com/jsref/jsref_getday.asp
    const daysOfTheWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const d = new Date();
    console.log(d.getDay(), "This is the current number day")
    let day_of_the_week = daysOfTheWeek[d.getDay()];
    console.log("day of the week", day_of_the_week);
    if (day_of_the_week == 'saturday' || day_of_the_week == 'sunday') {
      expect(response.status).toBe(200)
      expect(response.body.solvedRequests).toEqual('n/a')
      expect(response.body.solvedPercent).toEqual('n/a')
    } else {
      expect(response.status).toBe(200)
      expect(response.body.solvedRequests).toEqual([{ 'COUNT(*)': 0 }])
      expect(response.body.solvedPercent).toEqual(null)
    }




  })
})

describe("testing requests per educator", () => {
  test("success", async () => {
    let test = {
      educatorValue: 'jh1'
    }
    let response = await request(baseURL).post("/requestspereducator").send(test)
    //get date function taken from: https://www.w3schools.com/jsref/jsref_getday.asp
    const daysOfTheWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const d = new Date();
    console.log(d.getDay(), "This is the current number day")
    let day_of_the_week = daysOfTheWeek[d.getDay()];
    console.log("day of the week", day_of_the_week);
    if (day_of_the_week == 'saturday' || day_of_the_week == 'sunday') {
      expect(response.status).toBe(200)
      expect(response.body.solvedCountByEducator).toEqual('N/A')
    } else {
      expect(response.status).toBe(200)
      expect(response.body.solvedCountByEducator).toEqual([{ 'COUNT(*)': 0 }])
    }
  })
})

describe("testing solve questions", () => {
  test("Success", async () => {
    let test = {
      question_id: '4567898765478'
    }
    let response = await request(baseURL).post("/solvequestions").send(test)
    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
    let sqlDBTest = `SELECT question_id, module, practical, linked_question_id, problem_title, problem, pc_location, username, question_time, question_date, question_status, solved_by, reason_for_cancellation, solution from old_labquestions WHERE question_id="${test.question_id}"`;
    let sqlDBTestOne = `SELECT * from labquestions WHERE question_id="${test.question_id}"`;
    let sqlDBTestComments = `SELECT * FROM comments WHERE question_id="${test.question_id}";`;
    let sqlDBTestOldComments = `SELECT * FROM old_comments WHERE question_id="${test.question_id}";`;
    let old_labquestions = await new Promise((resolve, reject) => {
      db.all(sqlDBTest, (err, rows) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    let labquestions = await new Promise((resolve, reject) => {
      db.all(sqlDBTestOne, (err, rows) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    let comments = await new Promise((resolve, reject) => {
      db.all(sqlDBTestComments, (err, rows) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    let old_comments = await new Promise((resolve, reject) => {
      db.all(sqlDBTestOldComments, (err, rows) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    expect(old_labquestions).toEqual([{
      question_id: "4567898765478",
      module: "CS1002",
      practical: "This is the practical",
      linked_question_id: "N/A",
      problem_title: "This is the problem title",
      problem: "this is my problem",
      pc_location: "PC0-008",
      username: "test@st-andrews.ac.uk",
      question_time: "18:53",
      question_date: "17-08-2023",
      question_status: "solved",
      solved_by: "undefined",
      reason_for_cancellation: "null",
      solution: 'null'
    }]);
    expect(labquestions).toEqual([]);
    expect(comments).toEqual([]);
    expect(old_comments).toEqual([]);
  })
})

describe("testing fetch wait times", () => {
  test("Success", async () => {
    let response = await request(baseURL).get("/fetchwaittime")
    expect(response.status).toBe(200)
    expect(response.body.avgTimeWaited).toEqual(null)
  })
})

describe("testing linked practical title", () => {
  test("Success", async () => {
    let testing = {
      test: 'asdfasdfas'
    }
    let response = await request(baseURL).post("/linkedpracticaltitle").send(testing)
    expect(response.status).toBe(200)
    expect(response.body).toEqual([{ "problem_title": "This is the problem title" }])
  })
})

describe("test fetch solution", () => {
  test("Success", async () => {
    let test = {
      question_id: "asdfasdfas"
    }
    let response = await request(baseURL).post("/fetchsolution").send(test)
    expect(response.status).toBe(200)
    expect(response.body).toEqual([{ "solution": "This should not be null" }])
  })
})

describe("testing update solution", () => {
  test("Success", async () => {
    let test = {
      lologasdga: "This is updating the solution",
    };
    let response = await request(baseURL).put("/updatesolution").send(test);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    let SQLTest = `SELECT solution FROM old_labquestions WHERE question_id="lologasdga"`
  });
});

describe("test fetch teachers", () => {
  test("Success", async () => {
    let response = await request(baseURL).get("/fetchteachers")
    expect(response.status).toBe(200)
    expect(response.body).toEqual([{ username: 'testTeacher@st-andrews.ac.uk' }, { username: 'hello@st-andrews.ac.uk' }, { username: 'potential@st-andrews.ac.uk' },])
  })

})

describe("testing submit edited comment", () => {
  test("success", async () => {
    let comment = {
      question_id: "lologasdga",
      main_comment: "This is the updated comment",
    };
    let response = await request(baseURL)
      .put("/submiteditedcomment")
      .send(comment);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    let SQLTest = `SELECT main_comment FROM comments WHERE question_id="lologasdga";`
    let check = await new Promise((resolve, reject) => {
      db.all(SQLTest, (err, rows) => {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
    expect(check).toEqual([{ main_comment: "This is the updated comment" }])
  });
});

describe("testing fetch comments", () => {
  test("success", async () => {
    let array = ['lologasdga']
    let response = await request(baseURL).post("/fetchcomments").send(array)
    expect(response.status).toBe(200);
    expect(response.body[0].main_comment).toBe("This is the updated comment");
  })
})

describe("testing solved Requests", () => {
  test("Success", async () => {
    let test = {
      question_id: 'popoiuytr',
      solution: 'This is the solution',
    }
    let response = await request(baseURL).put("/solvedrequest").send(test);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe("success")
    let SQLTest = `SELECT solution FROM old_labquestions WHERE question_id="popoiuytr"`
    let check = await new Promise((resolve, reject) => {
      db.all(SQLTest, (err, rows) => {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
    expect(check).toEqual([{ solution: 'This is the solution' }])
  })
})

describe("testing fetch open and close times", () => {
  test("Success", async () => {
    let response = await request(baseURL).get("/fetchOpenAndCloseTimes")
    expect(response.status).toBe(200)
    expect(response.body).toEqual([
      {
        day_of_the_week: "monday",
        opening_time: "09:00",
        closing_time: "09:30",
        active: "true",
      },
      {
        day_of_the_week: "tuesday",
        opening_time: "09:00",
        closing_time: "09:30",
        active: "true",
      },
      {
        day_of_the_week: "wednesday",
        opening_time: "09:00",
        closing_time: "09:30",
        active: "true",
      },
      {
        day_of_the_week: "thursday",
        opening_time: "09:00",
        closing_time: "09:30",
        active: "true",
      },
      {
        day_of_the_week: "friday",
        opening_time: "09:00",
        closing_time: "09:30",
        active: "true",
      },
    ])
  })
})
