import sqlite3 from "sqlite3";
import request from "supertest"
import db from "./Database/db-test";
let baseURL = "http://localhost:5000";

//updateQuestion, openORClosed, cancelRequest

let sqlEducators = `
CREATE TABLE IF NOT EXISTS educators (
  username VARCHAR(50) NOT NULL,
  educator_name VARCHAR(50) NOT NULL,
  course_level VARCHAR(15),
  manning_lab_mon INTEGER,
  manning_lab_tue INTEGER,
  manning_lab_wed INTEGER,
  manning_lab_thu INTEGER,
  manning_lab_fri INTEGER
);`;

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

// let SQLInsertLabQuestions = `INSERT INTO labquestions (question_id, module, practical, linked_question_id, problem_title, problem, pc_location, username, question_time, question_date, question_status, solved_by, time_solved, place_in_queue)
// VALUES ('124235kljhsgklah', 'CS1002', 'This is the practical', 'N/A', 'This is the problem title', 'this is my problem', 'PC0-008', 'wemb1@st-andrews.ac.uk', '18:53', '17-08-2023', 'open', 'jh1', '19:50', '1');
// `;
// let SQLInsertLabQuestionsOne = `INSERT INTO labquestions (question_id, module, practical, linked_question_id, problem_title, problem, pc_location, username, question_time, question_date, question_status, solved_by, time_solved, place_in_queue)
// VALUES ('4567898765478', 'CS1002', 'This is the practical', 'N/A', 'This is the problem title', 'this is my problem', 'PC0-008', 'test@st-andrews.ac.uk', '18:53', '17-08-2023', 'open', 'jh1', '19:50', '1');
// `;

// let SQLInsertOldLabQuestions = `INSERT INTO old_labquestions (question_id, module, practical, linked_question_id, problem_title, problem, pc_location, username, question_time, question_date, question_status, solved_by, time_solved)
// VALUES ('asdfasdfas', 'CS1002', 'This is the practical', 'N/A', 'This is the problem title', 'this is my problem', 'PC0-008', 'wemb1@st-andrews.ac.uk', '18:53', '17-08-2023', 'closed', 'jh1', '19:50');
// `;

// let SQLInsertLabQuestionsTwo = `INSERT INTO labquestions (question_id, module, practical, linked_question_id, problem_title, problem, pc_location, username, question_time, question_date, question_status, solved_by, time_solved, place_in_queue)
// VALUES ('lologasdga', 'CS1002', 'This is the practical', 'N/A', 'This is the problem title', 'this is my problem', 'PC0-008', 'justAsked@st-andrews.ac.uk', '18:53', '17-08-2023', 'open', 'jh1', '19:50', '1');
// `;

// let SQLInsertQuestionBank = `INSERT INTO questionbank(bank_id, bank_module, bank_question, bank_answer)
//                               VALUES ('123412341234', 'CS1003', 'bank_question', 'bank_answer')`


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
  // await new Promise((resolve, reject) => {
  //   db.run(SQLInsertLabQuestions, (err, rows) => {
  //     if (err) {
  //       console.log(err);
  //       reject(err);
  //     } else {
  //       resolve(rows);
  //     }
  //   });
  // });
  // await new Promise((resolve, reject) => {
  //   db.run(SQLInsertLabQuestionsOne, (err, rows) => {
  //     if (err) {
  //       console.log(err);
  //       reject(err);
  //     } else {
  //       resolve(rows);
  //     }
  //   });
  // });
  // await new Promise((resolve, reject) => {
  //   db.run(SQLInsertOldLabQuestions, (err, rows) => {
  //     if (err) {
  //       console.log(err);
  //       reject(err);
  //     } else {
  //       resolve(rows);
  //     }
  //   });
  // });
  // await new Promise((resolve, reject) => {
  //   db.run(SQLInsertLabQuestionsTwo, (err, rows) => {
  //     if (err) {
  //       console.log(err);
  //       reject(err);
  //     } else {
  //       resolve(rows);
  //     }
  //   });
  // });
  // await new Promise((resolve, reject) => {
  //   db.run(SQLInsertQuestionBank, (err, rows) => {
  //     if (err) {
  //       console.log(err);
  //       reject(err);
  //     } else {
  //       resolve(rows);
  //     }
  //   });
  // });
});










afterAll(async() => {
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
    let sqlReadLabQuestions = `SELECT * FROM labquestions WHERE username='wemb1@st-andrews.ac.uk';`;
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
        place_in_queue: 1,
        practical: "This is the practical",
        problem: "this is my problem",
        problem_title: "This is the problem title",
        question_date: "17-08-2023",
        question_id: "124235kljhsgklah",
        question_status: "closed",
        question_time: "18:53",
        reason_for_cancellation: null,
        solution: null,
        solved_by: "jh1",
        time_solved: "19:50",
        username: "wemb1@st-andrews.ac.uk",
      },
    ]);
  });
});

describe("testing form submission", () => {
  test("success", async() => {
    let sqlReadDatabase = `SELECT * FROM labquestions WHERE username="wemb1@st-andrews.ac.uk"`
    let passingTest = {
      moduleCode: "CS1003",
      practical: "This is the practical",
      linkedPractical: "N/A",
      title: "This is the title",
      problem: "This is the problem",
      location: "PC",
      username: "wemb1@st-andrews.ac.uk",
      date: "2023-07-31",
      time: "17:05:23"      
    }
    let response = await request(baseURL).post("/formsubmission").send(passingTest);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("The form was submitted")
    let DBCheck = await new Promise((resolve, reject) => {
      db.all(sqlReadDatabase, (err, rows) => {
        if(err) {
          console.log(err)
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
    
    let questionID = await new Promise((resolve, reject) => {
      db.all(`SELECT question_id FROM labquestions WHERE username="wemb1@st-andrews.ac.uk"`, (err, rows) => {
        if(err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
     })
    expect(DBCheck).toEqual([{
     question_id: questionID[0]['question_id'],
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
      place_in_queue: 1,      
    }])
  })

  test("failure", async() => {
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
    }

    let response = await request(baseURL).post("/formsubmission").send(failingTest);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Form Submission Failed")
  })
})


describe("Testing /updatequestion", () => {
  test("success", async () => {
    let sqlGetID = `SELECT question_id FROM labquestions LIMIT 1;`

    let id = await new Promise((resolve, reject) => {
      db.run(sqlGetID, (err, rows) => {
        if(err) {
          console.log(err)
          reject(err)
        } else {
          resolve(rows);
        }
      })
    })
    let passingTest = {
      question_id: id,
      moduleCode: "CS1004",
      practical: "This is a practical",
      linkedPractical: "N/A",
      title: "This is a title",
      problem: "asdf",
      location: "The same",
    }
    let response = await request(baseURL).put("/updatequestion").send(passingTest)
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("success")
  })
  //Failure will never throw an error as UPDATE statements do not throw errors
  // test("failure", async () => {
  //   let sqlGetID = `SELECT question_id FROM labquestions LIMIT 1;`

  //   let id = await new Promise((resolve, reject) => {
  //     db.run(sqlGetID, (err, rows) => {
  //       if(err) {
  //         console.log(err)
  //         reject(err)
  //       } else {
  //         resolve(rows);
  //       }
  //     })
  //   })
  //   let failingTest = {
  //     question_id: id,
  //     moduleCode: null,
  //     practical: null,
  //     linkedPractical: null,
  //     title: null,
  //     problem: null,
  //     location: null,
  //   }
  //   let response = await request(baseURL).put("/updatequestion").send(failingTest)
  //   expect(response.status).toBe(400);
  //   expect(response.body.message).toBe("Question Failed to Update")
  // })

})

// describe.only("Testing openOrClosed", () => {
//   test("can't ask another question", async() => {
//     let passingTest = {
//       user: 'wemb1@st-andrews.ac.uk'
//     }
//     let response = await request(baseURL).post("/openOrClosed").send(passingTest)
//     expect(response.status).toBe(100)
//     expect(response.body.askAnotherQuestion).toBe(false)
//   })

//   test("can't ask another question and username not found", async() => {
//     let test = {
//       user: '123124124qw4q'
//     }
//     let response = await request(baseURL).post("/openOrClosed").send(test)
//     expect(response.status).toBe(401)
//     expect(response.body.askAnotherQuestion).toBe(true)
//   })

//   test("can ask another question and username is found", async() => {
//     let test = {
//       user: 'test@st-andrews.ac.uk',
//     }
//     let response = await request(baseURL).post("/openOrClosed").send(test)
//     expect(response.status).toBe(100)
//     expect(response.body.askAnotherQuestion).toBe(false)
//   })
// })


// describe.only("Testing /cancelRequest", () => {
//   test("Success", async() => {
//     let cancel = {
//       question_id: '124235kljhsgklah',
//       reason: 'asdf'
//     }
//     let response = await request(baseURL).put("/cancelrequest").send(cancel)
//     expect(response.status).toBe(200)
//     expect(response.body.message).toBe("Success")
//   })

//   test("failure", async() => {
//     let cancel = {
//       question_id: null,
//       reason: 'asdf'
//     }
//     let response = await request(baseURL).put("/cancelrequest").send(cancel)
//     expect(response.status).toBe(400)
//     expect(response.body.message).toBe("failed")
//   })
// })


// describe.only("testing onclose", () => {
//   test("Succcess", async() => {
//     let test = {
//       question_id: '124235kljhsgklah',
//     }
//     let response = await request(baseURL).put("/onclose").send(test);
//     expect(response.status).toBe(200);
//     expect(response.body.success).toBe("sucess")
//   })

//   test("Failure", async() => {
//     let test = {
//     }
//     let response = await request(baseURL).put("/onclose").send(test);
//     expect(response.status).toBe(500);
//     expect(response.body.success).toBe("failed")
//   })
// })


describe("Testing retrievequestions", () => {
  test("Success", async () => {
    let test = {
      username: 'wemb1@st-andrews.ac.uk'
    }
    let response = await request(baseURL).post("/retrievequestions").send(test);
    expect(response.status).toBe(200)
    expect(response.body.retrievedOld).toEqual([
      {
        linked_question_id: "N/A",
        module: "CS1002",
        pc_location: "PC0-008",
        practical: "This is the practical",
        problem: "this is my problem",
        problem_title: "This is the problem title",
        question_date: "17-08-2023",
        question_id: "asdfasdfas",
        question_status: "closed",
        question_time: "18:53",
        reason_for_cancellation: null,
        solution: null,
        solved_by: "jh1",
        time_solved: "19:50",
        username: "wemb1@st-andrews.ac.uk",
      },
    ])
  })

  // test("failure", async () => {
  //   let test = {
  //     username: null
  //   }
  //   let response = await request(baseURL).post("/retrievequestions").send(test);
  //   expect(response.status).toBe(400)
  //   expect(response.body.retrievedOld).toEqual("failed")
  // })
})


describe("Testing retrieve just asked", () => {
  test("Success", async () => {
    let test = {
      username: 'justAsked@st-andrews.ac.uk'
    }
    let response = await request(baseURL).post("/retrievejustasked").send(test)
    expect(response.status).toBe(200)
    expect(response.retrieve).toEqual(

    )
  })
})


describe("Testing retrieveBankQuestions", () => {
  test("Success", async() => {
    let test = {
      moduleCode: "CS1003"
    }
    let response = await request(baseURL).post("/retrieveBankQuestions").send(test)
    expect(response.status).toBe(200)
    expect(response.body).toEqual([{
      bank_id: '123412341234', 
      bank_module: 'CS1003', 
      bank_question: 'bank_question', 
      bank_answer: 'bank_answer'
  }])
  })
})

describe("testing savetoquestionbank", () => {
  test("success", async() => {
    let test = {
      moduleCode: '1234',
      title: 'This',
      solution: 'solution'
    }
    let response = await request(baseURL).post("/savetoquestionbank").send(test)
    expect(response.status).toBe(200);
    expect(response.body).toBe("success")
  })
})

describe("testing add solution", () => {
  test("success", async() => {
    let test = {
      asdfasdfasdgasd: 'solution'
    }
    let response = await request(baseURL).post("/addsolution").send(test)
    expect(response.status).toBe(200);
    expect(response.body).toBe("success")
  })
})

describe("save teacher", () => {
  test("success", async() => {
    let test = {
      username: 'testTeacher@st-andrews.ac.uk',
      level: 'CS1000',
      manning_mon: true,
      manning_tue: false,
      manning_wed: true,
      manning_thu: true,
      manning_fri: true,
    }
    let response = await request(baseURL).post("/saveteacher").send(test)
    expect(response.status).toBe(200);
    expect(response.body).toBe("success")
  })
})

// describe("testing retrieveTeachers", () => {
//   test("success", async() => {
//     let response = await request(baseURL).get("/retrieveteachers")
//     expect(response.status).toBe(200)
//     expect(response.body).toEqual([{
//       username: 'testTeacher@st-andrews.ac.uk',
//       level: 'CS1000',
//       manning_mon: true,
//       manning_tue: false,
//       manning_wed: true,
//       manning_thu: true,
//       manning_fri: true,
//     }])
//   })
// })

describe("testing save comment", () => {
  test("Success", async() => {
    let test = {
      question_id: '124235kljhsgklah',
      main_comment: "This is the comment"
    }
    let response = await request(baseURL).post("/savecomment").send(test)
    expect(response.status).toBe(200);
    expect(response.body).toEqual("success")
  })
})

// describe("testing retrieve comments", () => {
//   test("Success", async() => {
//     let response = await request(baseURL).post("/retrieveComments")
//     expect(response.status).toBe(200);
//     expect(response.body.comments).toEqual()
//   })
// })

describe("testing retrieve place in queue", () => {
  test("Success", async() => {
    let test = {
      question_id: '124235kljhsgklah'
    }
    let response = await request(baseURL).post("/retrieveplaceinqueue").send(test);
    expect(response.status).toBe(200)
    expect(response.body[0].place_in_queue).toBe(1)
  })
})

// describe("testing retrieve times", () => {
//   test("retrieve times", () => {

//   })
// })


// describe("testing set Times", () => {

// })

// describe("Add teacher", () => {

// })

// describe("add teacher to db", () => {

// })

// describe("testing total number of requests", () => {

// })

// describe("testing requests per module", () => {

// })
// describe("testing requests with solutions", () => {

// })

// describe("testing requests per educator", () => {

// })

// describe.only("testing solve questions", () => {
//   test("Success", async() => {

//   })
// })

// describe("testing fetch wait times")

// describe.only("testing linked practical title", () => {
//   test("Success", async () => {
//     let testing = {
//       test: 'lologasdga'
//     }
//     let response = await request(baseURL).post("/linkedpracticaltitle").send(testing)
//     expect(response.status).toBe(200)
//     expect(response.body).toEqual("This is the problem title")
//   })
// })

// desribe("test fetch solution", () => {
//   test("Success", async() => {
//     let response = await request(baseURL).get("/fetchsolution")
//     expect(response.status).toBe(200)
//     expect(response.body).toEqual('aswdf')
//   })
// })

describe("testing update solution", () => {
  test("Success", async() => {
    let test = {
      lologasdga: 'This is updating the solution'
    }
    let response = await request(baseURL).put("/updatesolution").send(test)
    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
  })
})


// describe.only("test fetch teachers", () => {
//   test("Success", async() => {
//     let response = await request(baseURL).get("/fetchteachers")
//     expect(response.status).toBe(200)
//     expect(response.body).toEqual([])
//   })

// })

describe("testing submit edited comment", () => {
  test("success", async() => {
    let comment = {
      question_id: 'lologasdga',
      main_comment: 'This is the updated comment'
    }
    let response = await request(baseURL).put("/submiteditedcomment").send(comment)
    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
  })
})

// describe.only("testing fetch comments", () => {
//   test("success", async() => {
//     let array = ['lologasdga']
//     let response = await request(baseURL).post("/fetchcomments").send(array)
//     expect(response.status).toBe(200);
//     expect(response.body).toBe();
//   })
// })

// describe("testing solved Requests", () => {
//   test("Success", async() => {
//     let test = {
//       question_id: 'lologasdga',
//       solution: 'This is the solution',
//     }
//     let response = await request(baseURL).put("/solvedrequest").send(test);
//     expect(response.status).toBe(200);
//     expect(response.body.success).toBe("success")
//   })
// })

// describe("testing fetch open and close times", () => {

// })