//https://www.computerhope.com/issues/ch002076.htm#db.js

import db from "../Database/db.js";

export var schema = {
  labquestions: [
    "question_id",
    "module",
    "practical",
    "problem",
    "pc_location",
    "username",
    "question_time",
  ],
};

export async function createRow(
  table,
  question_id,
  module,
  practical,
  linked_question_id,
  problem_title,
  problem,
  pc_location,
  username,
  question_date,
  question_time,
  question_status
) {
  let sql = `INSERT INTO ${table} (question_id, module, practical, linked_question_id, problem_title, problem, pc_location, username, question_date, question_time, question_status, place_in_queue)
               VALUES("${question_id}", "${module}", "${practical}", "${linked_question_id}","${problem_title}", "${problem}", "${pc_location}", "${username}", "${question_date}", "${question_time}", "${question_status}", (SELECT IFNULL(MAX(place_in_queue), 0) + 1 FROM labquestions));`; //Place in queue was taken from the following link:https://stackoverflow.com/questions/6982173/sqlite-auto-increment-non-primary-key-field

  let insert = await new Promise((resolve, reject) => {
    db.run(sql, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
  return insert;
}

export async function retrievePastQuestions(table, username) {
  let sqlretrieve = `SELECT * FROM ${table} WHERE username="${username}";`;

  //Need to use promise here
  let questions = await new Promise((resolve, reject) => {
    db.all(sqlretrieve, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
  return questions;
}

export async function retrieveLastQuestion(table, username) {
  let sqllast = `SELECT * FROM ${table} WHERE username="${username}";`;

  let last = await new Promise((resolve, reject) => {
    db.all(sqllast, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log(rows);
        resolve(rows);
      }
    });
  });
  return last;
}

export async function deleteTable(table) {
  let sqlDelete = `DROP TABLE IF EXISTS ${table};`;

  let table_delete = await new Promise((resolve, reject) => {
    console.log("deleting table");
    db.run(sqlDelete, (error) => {
      if (error) {
        console.log(error);
        reject(error);
      }
    });
  });
  return table_delete;
}

export const openOrClosed = async (table, username) => {
  let sqlOpen = `SELECT question_status FROM ${table} WHERE username="${username}" LIMIT 1`;

  let open = await new Promise((resolve, reject) => {
    db.all(sqlOpen, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });

  return open;
};

export const updateQuestion = async (
  table,
  question_id,
  module,
  practical,
  linkedPractical,
  title,
  problem,
  pc_location
) => {
  let sqlUpdate = `UPDATE ${table} SET module="${module}", practical="${practical}", linked_question_id="${linkedPractical}", problem_title="${title}", problem="${problem}", pc_location="${pc_location}" WHERE question_id="${question_id}";`;

  let update = await new Promise((resolve, reject) => {
    db.all(sqlUpdate, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
  return update;
};

export const retrievePastTitles = async (table) => {
  let sqlTitles = `SELECT question_id, problem_title FROM ${table}`;

  let title = await new Promise((resolve, reject) => {
    db.all(sqlTitles, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });

  return title;
};

export const retrieveBankQuestions = async (table) => {
  let sqlBankRetrieve = `SELECT * FROM ${table}`;
  let bankRetrieve = await new Promise((resolve, reject) => {
    db.all(sqlBankRetrieve, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });

  return bankRetrieve;
};

export const cancelRequest = async (table, reason, question_id) => {
  let sqlCancelRequest = `UPDATE ${table} SET question_status="closed", reason_for_cancellation="${reason}"  WHERE question_id="${question_id}";`;

  let cancelRequest = await new Promise((resolve, reject) => {
    db.all(sqlCancelRequest, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
  return cancelRequest;
};

export const saveSolution = async (table, question_id, solution) => {
  let sqlSaveSolution = `UPDATE ${table} SET solution="${solution}" WHERE question_id="${question_id}";`;
  let saveStudentSolution = await new Promise((resolve, reject) => {
    db.all(sqlSaveSolution, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
  return saveStudentSolution;
};

export const saveQA = async (
  table,
  bank_id,
  bank_module,
  bank_question,
  bank_answer
) => {
  let sqlSaveQA = `INSERT INTO ${table} (bank_id, bank_module, bank_question, bank_answer)
                            VALUES ("${bank_id}", "${bank_module}", "${bank_question}", "${bank_answer}")`;

  let saveIntoQuestionBank = await new Promise((resolve, reject) => {
    db.all(sqlSaveQA, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });

  return saveIntoQuestionBank;
};

export const saveTeacher = async (
  username,
  course_level,
  manning_lab_mon,
  manning_lab_tue,
  manning_lab_wed,
  manning_lab_thu,
  manning_lab_fri
) => {
  let sqlSaveTeacher = `UPDATE educators SET course_level="${course_level}", manning_lab_mon="${manning_lab_mon}", manning_lab_tue="${manning_lab_tue}", manning_lab_wed="${manning_lab_wed}", manning_lab_thu="${manning_lab_thu}", manning_lab_fri="${manning_lab_fri}" WHERE username="${username}";`;

  let saveTeacherDB = await new Promise((resolve, reject) => {
    db.all(sqlSaveTeacher, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
  return saveTeacherDB;
};

export const addTeacher = async (username) => {
  let sqlAddTeacher = `INSERT INTO educators (username, course_level, manning_lab_mon, manning_lab_tue, manning_lab_wed, manning_lab_thu, manning_lab_fri)
                          VALUES ("${username}", null, null, null, null, null, null)`;
  let addTeacher = await new Promise((resolve, reject) => {
    db.all(sqlAddTeacher, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
  return addTeacher;
};

export const retrieveTeach = async (table) => {
  let sqlRetrieveEducators = `SELECT * FROM ${table};`;

  let retrieveEducators = await new Promise((resolve, reject) => {
    db.all(sqlRetrieveEducators, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
  return retrieveEducators;
};

export const theOldSwitcheroo = async (question_id) => {
  // First it inserts into the database the copied variables
  // then it deletes the row from the labquestions table

  let sqlget = `SELECT * FROM labquestions WHERE question_id="${question_id}";`;

  let sqlDeleteOld = `DELETE FROM labquestions WHERE question_id="${question_id}"`;

  let switcheroo = await new Promise((resolve, reject) => {
    db.all(sqlget, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });

  console.log("switch", switcheroo);

  let sqlSwitcheroo = `INSERT INTO old_labquestions (question_id, module, practical, linked_question_id, problem_title, problem, pc_location, username, question_time, question_status, reason_for_cancellation, question_date, solved_by, time_solved)
                VALUES ("${switcheroo[0].question_id}", "${switcheroo[0].module}", "${switcheroo[0].practical}", "${switcheroo[0].linked_question_id}", "${switcheroo[0].problem_title}", "${switcheroo[0].problem}", "${switcheroo[0].pc_location}", "${switcheroo[0].username}", "${switcheroo[0].question_time}", "${switcheroo[0].question_status}", "${switcheroo[0].reason_for_cancellation}", "${switcheroo[0].question_date}", "${switcheroo[0].solved_by}", "${switcheroo[0].time_solved}")`;

  console.log("sqlSwitcheroo", sqlSwitcheroo);

  let random = await new Promise((resolve, reject) => {
    db.all(sqlSwitcheroo, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });

  console.log("random", random);

  let deleteTableRow = await new Promise((resolve, reject) => {
    db.all(sqlDeleteOld, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });

  console.log(deleteTableRow);
};

export const theOldSwitcherooComments = async (question_id) => {
  // First it inserts into the database the copied variables
  // then it deletes the row from the labquestions table

  let sqlBoolean = `SELECT EXISTS (SELECT * FROM comments WHERE question_id="${question_id}");`;

  let exists = await new Promise((resolve, reject) => {
    db.all(sqlBoolean, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });

  console.log(
    "If exists",
    exists[0][
      `EXISTS (SELECT * FROM comments WHERE question_id="${question_id}")`
    ]
  );

  if (
    exists[0][
      `EXISTS (SELECT * FROM comments WHERE question_id="${question_id}")`
    ] != 0
  ) {
    let sqlget = `SELECT * FROM comments WHERE question_id="${question_id}";`;

    let sqlDeleteOld = `DELETE FROM comments WHERE question_id="${question_id}"`;

    let switcheroo = await new Promise((resolve, reject) => {
      db.all(sqlget, (error, rows) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve(rows);
          return rows;
        }
      });
    });

    console.log("switcheroo", switcheroo);

    let sqlSwitcheroo = `INSERT INTO old_comments (comment_id, main_comment, question_id)
                             VALUES ("${switcheroo[0].comment_id}", "${switcheroo[0].main_comment}", "${switcheroo[0].question_id}")`;

    let random = await new Promise((resolve, reject) => {
      db.all(sqlSwitcheroo, (error, rows) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve(rows);
        }
      });
    });

    let deleteTableRow = await new Promise((resolve, reject) => {
      db.all(sqlDeleteOld, (error, rows) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve(rows);
        }
      });
    });
  }
};

export const saveComment = async (
  table,
  comment_id,
  main_comment,
  question_id
) => {
  let sqlSaveComment = `INSERT INTO ${table} (comment_id, main_comment, question_id)
                          VALUES ("${comment_id}", "${main_comment}", "${question_id}");`;

  let commentSaver = await new Promise((resolve, reject) => {
    db.all(sqlSaveComment, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
  return commentSaver;
};

export const retrieveAllComments = async () => {
  let sqlRetrieveCommentsNew = `SELECT * FROM comments;`;
  let sqlRetrieveCommentsOld = `SELECT * FROM old_comments;`;

  let commentsNew = await new Promise((resolve, reject) => {
    db.all(sqlRetrieveCommentsNew, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("rows", rows);
        resolve(rows);
      }
    });
  });

  let commentsOld = await new Promise((resolve, reject) => {
    db.all(sqlRetrieveCommentsOld, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });

  let comments = commentsNew.concat(commentsOld);

  return comments;
};

export const placeInQueue = async (question_id) => {
  let sqlQueue = `SELECT place_in_queue FROM labquestions WHERE question_id="${question_id}";`;

  let queue = await new Promise((resolve, reject) => {
    db.all(sqlQueue, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });

  return queue;
};

export const setTimes = async (
  day_of_the_week,
  opening_time,
  closing_time,
  active
) => {
  let sqlTime = `UPDATE openingTimes SET opening_time="${opening_time}", closing_time="${closing_time}", active="${active}" WHERE day_of_the_week="${day_of_the_week}"`;
  let Time = await new Promise((resolve, reject) => {
    db.all(sqlTime, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
  return Time;
};

export const retrieveTimes = async () => {
  let sqlretrieveTimes = `SELECT * FROM openingTimes;`;

  let retrieveTimes = await new Promise((resolve, reject) => {
    db.all(sqlretrieveTimes, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });

  return retrieveTimes;
};

export const updatePlaceInQueue = async () => {
  let sqlUpdatePlace = `UPDATE labquestions SET place_in_queue=(place_in_queue - 1)`;

  let updatePlace = await new Promise((resolve, reject) => {
    db.all(sqlUpdatePlace, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
  return updatePlace;
};

export const addTeacherToDB = async (
  username,
  educator_name,
  course_level,
  manning_lab_mon,
  manning_lab_tue,
  manning_lab_wed,
  manning_lab_thu,
  manning_lab_fri
) => {
  let sqlAddTeacherToDB = `INSERT INTO educators (username, educator_name, course_level, manning_lab_mon, manning_lab_tue, manning_lab_wed, manning_lab_thu, manning_lab_fri)
                            VALUES("${username}", "${educator_name}", "${course_level}", "${manning_lab_mon}", "${manning_lab_tue}", "${manning_lab_wed}", "${manning_lab_thu}", "${manning_lab_fri}")`;

  let teacherIntoDB = await new Promise((resolve, reject) => {
    db.all(sqlAddTeacherToDB, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
  return teacherIntoDB;
};

export const countTotalRequests = async (start_time, question_date) => {
  let sqlCurrentRequests = `SELECT COUNT(*) FROM labquestions;`;
  let sqlPastRequests = `SELECT COUNT(*) FROM old_labquestions WHERE question_time > "${start_time}" AND question_date=="${question_date}"`;

  let currentRequests = await new Promise((resolve, reject) => {
    db.all(sqlCurrentRequests, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });

  let oldcurrentrequests = await new Promise((resolve, reject) => {
    db.all(sqlPastRequests, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });

  return { currentCount: currentRequests, oldCount: oldcurrentrequests };
};

export const countTotalUsers = async (start_time, question_date) => {
  let sqlCurrentRequests = `SELECT username FROM labquestions;`;
  let sqlPastRequests = `SELECT username FROM old_labquestions WHERE question_time > "${start_time}" AND question_date=="${question_date}" GROUP BY username`;

  let currentstudents = await new Promise((resolve, reject) => {
    db.all(sqlCurrentRequests, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });

  let oldcurrentstudents = await new Promise((resolve, reject) => {
    db.all(sqlPastRequests, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });

  return { currentCount: currentstudents, oldCount: oldcurrentstudents };
};

export const current_date_and_time = async () => {
  //get date function taken from: https://www.w3schools.com/jsref/jsref_getday.asp
  const daysOfTheWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const d = new Date();
  let day_of_the_week = daysOfTheWeek[d.getDay()];
  console.log("day of the week", day_of_the_week);
  let sqlRetrieveDateandTime = `SELECT * FROM openingTimes WHERE day_of_the_week="${day_of_the_week}"`;

  let currentDate = await new Promise((resolve, reject) => {
    db.all(sqlRetrieveDateandTime, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
  return currentDate;
};

export const currentModuleRequests = async (moduleCode) => {
  let sqlModuleRequests = `SELECT COUNT(*) FROM labquestions WHERE module="${moduleCode}";`;

  let moduleRequests = await new Promise((resolve, reject) => {
    db.all(sqlModuleRequests, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });

  return moduleRequests;
};

export const oldModuleRequests = async (
  moduleCode,
  question_date,
  question_time
) => {
  let sqlOldModuleRequests = `SELECT COUNT(*) FROM old_labquestions WHERE module="${moduleCode}" AND question_date="${question_date}" AND question_time > "${question_time}"`;

  let oldModuleRequests = await new Promise((resolve, reject) => {
    db.all(sqlOldModuleRequests, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });

  return oldModuleRequests;
};

export const requestsWithSolutions = async (question_date, question_time) => {
  let sqlRequestsWithSolutions = `SELECT COUNT(*) FROM old_labquestions WHERE question_date="${question_date}" AND question_time > "${question_time}" AND question_status="solved";`;

  let solved = await new Promise((resolve, reject) => {
    db.all(sqlRequestsWithSolutions, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });

  return solved;
};

export const countEducatorSolved = async (educator_name, date, time) => {
  let sqlCountEducatorSolved = `SELECT COUNT(*) FROM old_labquestions WHERE question_date="${date}" AND question_time="${time}" AND question_status=solved AND solved_by="${educator_name}";`;

  let totalEducatorSolved = await new Promise((resolve, reject) => {
    db.all(sqlCountEducatorSolved, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
  return totalEducatorSolved;
};

export const retrieveQuestionsForTeachers = async () => {
  let sql = `SELECT * FROM labquestions`;

  let questions = await new Promise((resolve, reject) => {
    db.all(sql, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });

  return questions;
};

export const solveQuestion = async (
  educator_name,
  time_solved,
  question_id
) => {
  let sqlSolve = `UPDATE labquestions SET question_status="solved", solved_by="${educator_name}", time_solved="${time_solved}" WHERE question_id="${question_id}";`;

  let solve = await new Promise((resolve, reject) => {
    db.all(sqlSolve, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });

  return solve;
};

export const times = async (date) => {
  let sqlTimeDiff = `SELECT question_time, time_solved FROM old_labquestions WHERE question_status="solved"`;

  let diffTimes = await new Promise((resolve, reject) => {
    db.all(sqlTimeDiff, (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
  return diffTimes;
};
