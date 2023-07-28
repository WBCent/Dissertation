const request = require("supertest");
const baseURL = "http://localhost:5000";
// import {
//     createRow,
//     retrievePastQuestions,
//     retrieveLastQuestion,
//     deleteTable,
//     openOrClosed,
//     updateQuestion,
//     retrieveBankQuestions,
//     retrievePastTitles,
//     cancelRequest,
//     saveSolution,
//     saveQA,
//     saveTeacher,
//     retrieveTeach,
//     theOldSwitcheroo,
//     saveComment,
//     theOldSwitcherooComments,
//     retrieveAllComments,
//     placeInQueue,
//     setTimes,
//     addTeacher,
//     updatePlaceInQueue,
//     addTeacherToDB,
//     current_date_and_time,
//     countTotalRequests,
//     countTotalUsers,
//     currentModuleRequests,
//     oldModuleRequests,
//     requestsWithSolutions,
//     countEducatorSolved,
//     retrieveQuestionsForTeachers,
//     solveQuestion,
//     times,
//     linkedPracticalTitle,
//     fetchSolution,
//     updateSolution,
//     fetchTeachers,
//     updateComment,
//     fetchComments,
//     solveRequestDB,
//     fetchTimes,
//   } from "./Models/data-model.js";


//TODO: See testing open or closed; cancelRequest


//Testing Form Submission Input API endpoint:

describe.only("testing /formsubmission", () => {
  const passingTest = {
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

  test("Testing for successful send", async () => {
    // createRow.mockResolvedValue()


    const response = await request(baseURL)
      .post("/formsubmission")
      .send(passingTest);
    expect(response.statusCode).toBe(201);
    expect(response._body.message).toBe("The form was submitted");
  });

  const failingTest = {
    moduleCode: 'CS2001',
    practical: '"null"',
    linkedPractical: "N/A",
    title: 'null',
    problem: "'null",
    location: "PC",
    username: "wemb1@st-andrews.ac.uk",
    date: "27/07/2023",
    time: "14:05",
  }

  test("Testing for failure send", async () => {
    const response = await request(baseURL)
      .post("/formsubmission")
      .send(failingTest);
    expect(response.statusCode).toBe(400);
    expect(response._body.message).toBe("Form Submission Failed");
  });
});


// describe("Testing /updatequestion", () => {

//     const passingTest = {
//         moduleCode: "CS1002",
//         practical: "Hello",
//         linkedPractical: "N/A",
//         title: "asdf",
//         problem: "ghjk",
//         location: "PC",
//       };


//     test("/updatequestion success", async () => {
//         const response = await request(baseURL).put("/updatequestion").send(passingTest)
//         expect(response.statusCode).toBe(200)
//         expect(response._body.message).toBe("success")
//     })

//     const failingTest = {
//         moduleCode: 'CS2001',
//         practical: '"null"',
//         linkedPractical: "N/A",
//         title: 'null',
//         problem: "'null",
//         location: "PC",
//       }

//       test("/updatequestion failure", async () => {
//         const response = await request(baseURL).put("/updatequestion").send(failingTest)
//         expect(response.statusCode).toBe(400)
//         expect(response._body.message).toBe("Question Failed to Update")
//     })


// })




// describe("Testing /openOrClosed", () => {

//     const passing = {
//         user: "wemb1@st-andrews.ac.uk"
//     }
    
//     test("/openOrClosed for can ask again", async () => {
//         const response = await request(baseURL).post("/openOrClosed").send(passing)
//         expect(response.statusCode).toBe(100)
//         expect(response._body.askAnotherQuestion).not.toBeTruthy()
//     })

//     const failingOne = {
//         user: "random"
//     }

//     test("/openOrClosed for can't ask again question status is closed", async () => {
//         const response = await request(baseURL).post("/openOrClosed").send(failingOne)
//         expect(response.statusCode).toBe(401)
//         expect(response._body.askAnotherQuestion).toBeTruthy()
//     })

//     //Need to come up with a new test for this!
//     const failingTwo = {
//         user: "wemb1@st-andrews.ac.uk"
//     }

//     test("/openOrClosed for can't ask again question status is unknown", async () => {
//         const response = await request(baseURL).post("/openOrClosed").send(failingTwo)
//         expect(response.statusCode).toBe(401)
//         expect(response._body.askAnotherQuestion).toBeTruthy()        
//     })

// })



// describe("Testing /cancelRequest", () => {
//     const success ={
//         reason: "Leaving Labs",
//         question_id: "83adf81d20d641d59c1a085bd74c692d"
//     }

//     test("Successful request that cancels", async () => {
//         const response = await request(baseURL).put("/cancelrequest").send(success)
//         expect(response.statusCode).toBe(200)
//         expect(response._body.message).toBe("Success")        
//     })

//     // const failure = {
//     //     reason: "'null'",
//     //     question_id: "'sdfghjk'"
//     // }

//     // test("Failure for request that cancels", async () => {
//     //     const response = await request(baseURL).put("/cancelrequest").send(failure)
//     //     expect(response.statusCode).toBe(400)
//     //     expect(response._body.message).toBe("failed")        
//     // })
// })



// describe("Testing /oneclose", () => {
//   const success = {
//     question_id: "83adf81d20d641d59c1a085bd74c692d"
//   }

//   test("Success", async () => {
//     const response = await request(baseURL).put("/onclose").send(success)
//     expect(response.statusCode).toBe(200)
//     expect(response._body.success).toBe("sucess")
//   })
// })



// // describe.only("Testing /retrievequestions", () => {
// //     const success={
// //         username: "wemb1@st-andrews.ac.uk"
// //     }

// //     test("test that it retrieves more than one question", async () => {
// //         const response = await request(baseURL).post("/retrievequestions").send(success)
// //         expect(response.statusCode).toBe(200)
// //         expect(Array.isArray(response._body.retrieveOld)).toBe(true)
// //     })

// //     const failure = []

// //     test("test that the fail condition works", async () => {
// //         const response = await request(baseURL).post("/retrievequestions").send(failure)
// //         expect(response.statusCode).toBe(400)
// //         expect(response._body.retrieveOld).toBe("failed")
// //     })


// // })



// // describe("Testing retrievejustasked", () => {
// //     const successful = {
// //         username: "wemb1@st-andrews.ac.uk"
// //     }

// //     test("successful", async() => {
// //         const response = await request(baseURL).post("/retrievejustasked").send(successful)
// //         expect(response.statusCode).toBe(200)
// //         expect(response._body.retrieve).toBe()
// //     })

// //     const failure = {

// //     }

// //     test("failure", async() => {
// //         const response = await request(baseURL).post("/retrievejustasked").send(successful)
// //         expect(response.statusCode).toBe(200)
// //         expect(response._body.retrieve).toBe()
// //     })
// // })



// // describe.only("testing retrieveBankQuestions", () => {
// //     const success ={
// //         moduleCode: 'CS1007'
// //     }
// //     test("success", async () => {
// //         const response = await request(baseURL).post("/retrieveBankQuestions").send(success)
// //         expect(response.statusCode).toBe(200)
// //         expect(Array.isArray(response._body.bankRetrieve)).toBe(true)
// //     })

// //     const failure = ''

// //     test("failure", async () => {
// //         const response = await request(baseURL).post("/retrieveBankQuestions").send(failure)
// //         expect(response.statusCode).toBe(400)
// //         expect(response._body.success).toBe("failed")
// //     })

// // })


// // describe.only("retrieve past question titles", () => {
// //     test("success", async () => {
// //         const response = await request(baseURL).get("/retrievepastquestiontitles")
// //         expect(response.statusCode).toBe(200)
// //         expect(Array.isArray(response._body.titles)).toBe(true)
// //     })
// // })

// describe("testing save to question bank", () => {
    
//     test("success", async () => {

//         let success = {
//             moduleCode: 'CS1007',
//             title: 'asdf',
//             solution: 'asdf'
//         }

//         const response = await request(baseURL).post("/savetoquestionbank").send()
//         expect(response.statusCode).toBe(200)
//         expect(response._body).toBe('success')
//     })
// })

// describe("add solution tests", () => {
//     let array = [{
//         question_id: '83adf81d20d641d59c1a085bd74c692d',
//         solution: 'This is the solution to the problem'
//     }]
//     test("success", async () => {
//             const response = await request(baseURL).post("/addsolution").send(array)
//         expect(response.statusCode).toBe(200)
//         expect(response._body).toBe('success')
//     })
// })

// describe("save teacher tests", () => {
//     let success = {
//         username: 'wemb1@st-andrews.ac.uk',
//         level: '',
//         manning_mon: false,
//         manning_tue: false,
//         manning_wed: false,
//         manning_thu: false,
//         manning_fri: false
//     }

//     test("success", async () => {
//         const response = await request(baseURL).post("/saveteacher").send(success)
//         expect(response.statusCode).toBe(200)
//         expect(response._body).toBe('success')
//     })
// })

// // describe("retrieve teachers test", () => {
// //     test("success", async() => {
// //         const response = await request(baseURL).get("/retrieveteachers")
// //         expect(response.statusCode).toBe(200)
// //         expect(response._body.retrieveTeachers).toBe()
// //     })
// // })

// describe("save Comments", () => {
//     test("success", async () => {
//         let successful = {
//             question_id: '83adf81d20d641d59c1a085bd74c692d',
//             main_comment: "This is a comment"
//         }

//         const response = await request(baseURL).post("/savecomment").send(successful)
//         expect(response.statusCode).toBe(200)
//         expect(response._body).toBe('success')
//     })
// })


// // describe.only("retrieveComments", () => {
// //     test("success", async () => {
// //         const response = await request(baseURL).get("/retrieveComments")
// //         expect(response.statusCode).toBe(200)
// //         expect(response._body.comments).toBe()
// //     })
// // })



// // describe.only("retrieve place in queue", () => {
// //     let success = {
// //         question_id: '16323d51c4b747989e34e8c727b1c915',
// //     }
// //     test("success", async () => {
// //         const response = await request(baseURL).post("/retrieveplaceinqueue").send(success)
// //         expect(response.statusCode).toBe(200)
// //         expect(typeof response._body.queuePlace).toBe("number")
// //     })
// // })


// // describe("retrieve times", () => {
// //     test("success", async () => {
// //         const response = await request(baseURL).get("/retrievetimes")
// //         expect(response.statusCode).toBe(200)
// //         expect(response._body.success).toBe(true)
// //     })
// // })


// // describe("set times", () => {
// //     test("success")
// // })


// // describe("add teacher", () => {
    
// // })


// // describe("add teacher to db", () => {
    
// // })

// // describe("no of requests", () => {
// //     test("success", async() => {
// //         const response = await request(baseURL).get("/noofrequests")
// //         expect(response.statusCode).toBe(200)
// //         expect(response._body.totalRequests).toBe()
// //         expect(response._body.totalStudents).toBe()
// //         expect(response._body.requests_per_student).toBe()
// //     })
// // })

// // describe("requests per module", () => {
// //     test("success", async () => {
// //         const response = await request(baseURL).post("/requestspermodule").send();

// //     })
// // })


// // describe("requests with solutions", () => {
// //     test("success", async () => {
// //         const response = await request(baseURL).get("/requestsWithSolutions")
// //         expect(response.statusCode).toBe(200)
// //         expect(response._body.solvedRequests).toBe()
// //         expect(response._body.solvedRequests).toBe()
// //     })
// // })

// // describe("requests per educator", () => {
// //     test("success", async () => {
// //         const response = await request(baseURL).post("/requestspereducator").send({educatorValue: 'wemb1@st-andrews.ac.uk'})
// //         expect(response.statusCode)
// //         expect(response._body.solvedByEducator)
    
// //     })
// // })


// describe("solve questions", () => {
//     test("success", async () => {
//         const response = await request(baseURL).post("/solvequestions").send({
//             educator_name: 'John Smith',
//             question_id: '16323d51c4b747989e34e8c727b1c915'
//         })
//         expect(response.statusCode).toBe(200)
//         expect(response._body.success).toBe(true)
//     })
// })


// // describe.only("fetch wait time", () => {
// //     test("Success", async () => {
// //         const response = await request(baseURL).get("/fetchwaittime")
// //         expect(response.statusCode).toBe(200)
// //         expect(typeof response._body.avgTimeWaited).toBe("object")
// //         expect(response._body.avgTimeWaited).toBeGreaterThanOrEqual(0)
// //     })
// // })


// // describe.only("linked Practical Title", () => {
// //     test("success", async() => {
// //         const response = await request(baseURL).post("/linkedpracticaltitle").send({
// //             test: '16323d51c4b747989e34e8c727b1c915'
// //         })
// //         expect(response.statusCode).toBe(200)
// //         expect(typeof  response._body.linkedTitle).toBe("string")
// //     })
// // })


// // describe("fetch solution", () => {
// //     test("success", async () => {
// //         const response = await request(baseURL).post("/fetchSolution").send({
// //             question_id: '16323d51c4b747989e34e8c727b1c915'
// //         })
// //         expect(response.statusCode).toBe(200)
// //         expect(response._body.solutionDB).toBe()
// //     })
// // })


// describe("Update Solution", () => {
//     test("success" ,async () => {
//         const response = await request(baseURL).put("/updatesolution").send({
//             '16323d51c4b747989e34e8c727b1c915': 'new solution' 
//         })
//         expect(response.statusCode).toBe(200)
//         expect(response._body.success).toBe(true)
//     })
// })



// // describe.only("fetch teachers", () => {
// //     test("success", async () => {
// //         const response = await request(baseURL).get("/fetchteachers")
// //         expect(response.statusCode).toBe(200)
// //         expect(Array.isArray(response._body.teacherUsernames)).toBe(true)
// //     })
// // })



// describe("submit edited comment", () => {
//     test("success", async() => {
//         const response = await request(baseURL).put("/submiteditedcomment").send({
//             question_id: '16323d51c4b747989e34e8c727b1c915',
//             main_comment: 'Hello there this is a comment'
//         })
//         expect(response.status).toBe(200)
//         expect(response._body.success).toBe(true)
//     })
// })



// // describe("fetch comments", () => {
// //     test("success", async() => {
// //         const response = await request(baseURL).post("/fetchcomments")
// //     })
// //     expect(response.statusCode).toBe(200)
// //     expect(Array.isArray(response._body.comments)).toBe(true)
// // })


// describe("solved requests", () => {
//     test("success", async() => {
//         const response = await request(baseURL).put("/solvedrequest").send({
//             question_id: '16323d51c4b747989e34e8c727b1c915',
//             solution: 'asdfasdfas'
//         })
//         expect(response.status).toBe(200)
//         expect(response._body.success).toBe("success")
//     })
// })

// describe("fetch Open and Close Times", () => {
//     test("success", async () => {
//         const response = await request(baseURL).get("/fetchOpenAndCloseTimes")
//         expect(response.statusCode).toBe(200)
//         expect(response._body.fetchedTimes).toBe()    
//     })
// })


