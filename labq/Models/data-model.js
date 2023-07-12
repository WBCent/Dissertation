//https://www.computerhope.com/issues/ch002076.htm#db.js

import db from '../Database/db.js'

export var schema = {
    "labquestions": [
        "question_id", "module", "practical", "problem", "pc_location", "username", "question_time"
    ]
}


export function createRow(table, question_id, module, practical, linked_question_id, problem_title, problem, pc_location, username, question_time, question_status) {
    let sql = `INSERT INTO ${table} (question_id, module, practical, linked_question_id, problem_title, problem, pc_location, username, question_time, question_status)
               VALUES("${question_id}", "${module}", "${practical}", "${linked_question_id}","${problem_title}", "${problem}", "${pc_location}", "${username}", "${question_time}", "${question_status}");`
    db.run(sql)
}


export async function retrievePastQuestions(table) {
    let sqlretrieve = `SELECT * FROM ${table};`

    //Need to use promise here
    let questions = await new Promise((resolve, reject) => {
        db.all(sqlretrieve, (error, rows) => {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                resolve(rows)
            }
        })
    })
    return questions
}


export async function retrieveLastQuestion(table) {
    let sqllast = `SELECT * FROM ${table} LIMIT 1`;

    let last = await new Promise((resolve, reject) => {
        db.all(sqllast, (error, rows) => {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                console.log(rows)
                resolve(rows)
            }
        })
    })
    return last;
}


export async function deleteTable(table) {
    let sqlDelete = `DROP TABLE IF EXISTS ${table};`

    let table_delete = await new Promise((resolve, reject) => {
        console.log('deleting table')
        db.run(sqlDelete, (error) => {
            if (error) {
                console.log(error)
                reject(error)
            }
        })
    })
    return table_delete;
}


export const openOrClosed = async (table, username) => {
    let sqlOpen = `SELECT question_status FROM ${table} WHERE username="${username}" LIMIT 1`

    let open = await new Promise((resolve, reject) => {
        db.all(sqlOpen, (error, rows) => {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                resolve(rows)
            }
        })
    })

    return open;
}

export const updateQuestion = async (table, question_id, module, practical, linkedPractical, title, problem, pc_location) => {
    let sqlUpdate = `UPDATE ${table} SET module="${module}", practical="${practical}", problem="${linkedPractical}", problem="${title}", problem="${problem}", pc_location="${pc_location}" WHERE question_id="${question_id}"`

    let update = await new Promise((resolve, reject) => {
        db.all(sqlUpdate, (error, rows) => {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                resolve(rows)
            }
        })
    })
    return update

}

export const retrievePastTitles = async (table) => {
    let sqlTitles = `SELECT question_id, problem_title FROM ${table}`

    let title = await new Promise((resolve, reject) => {
        db.all(sqlTitles, (error, rows) => {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                resolve(rows)
            }
        })
    })

    return title;
}




export const retrieveBankQuestions = async (table) => {
    let sqlBankRetrieve = `SELECT * FROM ${table}`;
    let bankRetrieve = await new Promise((resolve, reject) => {
        db.all(sqlBankRetrieve, (error, rows) => {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                resolve(rows)
            }
        })
    })

    return bankRetrieve;
}

export const cancelRequest = async (table, reason, question_id) => {
    let sqlCancelRequest = `UPDATE ${table} SET question_status="closed", reason_for_cancellation="${reason}"  WHERE question_id="${question_id}"`

    let cancelRequest = await new Promise((resolve, reject) => {
        db.all(sqlCancelRequest, (error, rows) => {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                resolve(rows)
            }

        })
    })
    return cancelRequest
}


export const saveSolution = async (table, question_id, solution) => {
    let sqlSaveSolution = `UPDATE ${table} SET solution="${solution}" WHERE question_id="${question_id}";`
    let saveStudentSolution = await new Promise((resolve, reject) => {
        db.all(sqlSaveSolution, (error, rows) => {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                resolve(rows)
            }
        })
    })
    return saveStudentSolution;

}

export const saveQA = async (table, bank_id, bank_module, bank_question, bank_answer) => {
    let sqlSaveQA = `INSERT INTO ${table} (bank_id, bank_module, bank_question, bank_answer)
                            VALUES ("${bank_id}", "${bank_module}", "${bank_question}", "${bank_answer}")`

    let saveIntoQuestionBank = await new Promise((resolve, reject) => {
        db.all(sqlSaveQA, (error, rows) => {
            if(error) {
                console.log(error)
                reject(error)
            } else {
                resolve(rows)
            }
        })
    })

    return saveIntoQuestionBank
}

export const saveTeacher = async (table, username, course_level, manning_lab_mon, manning_lab_tue, manning_lab_wed, manning_lab_thu, manning_lab_fri) => {
    let sqlSaveTeacher = `INSERT INTO ${table} (username, course_level, manning_lab_mon, manning_lab_tue, manning_lab_wed, manning_lab_thu, manning_lab_fri)
                                VALUES ("${username}", "${course_level}", "${manning_lab_mon}", "${manning_lab_tue}", "${manning_lab_wed}", "${manning_lab_thu}", "${manning_lab_fri}")`

    let saveTeacherDB = await new Promise((resolve, reject) => {
        db.all(sqlSaveTeacher, (error, rows) => {
            if(error) {
                console.log(error)
                reject(error)
            } else {
                resolve(rows)
            }
        })
    })
    return saveTeacherDB
}




export const retrieveTeach = async(table) => {
    let sqlRetrieveEducators = `SELECT * FROM ${table};`

    let retrieveEducators = await new Promise((resolve, reject) => {
        db.all(sqlRetrieveEducators, (error, rows) => {
            if(error) {
                console.log(error)
                reject(error)
            } else {
                resolve(rows)
            }
        })
    })
    return retrieveEducators;
}

export const theOldSwitcheroo = async (question_id) => {
    // First it inserts into the database the copied variables
    // then it deletes the row from the labquestions table

    let sqlget = `SELECT * FROM labquestions WHERE question_id="${question_id}";`

    let sqlDeleteOld = `DELETE FROM labquestions WHERE question_id="${question_id}"`


    let switcheroo = await new Promise((resolve, reject) => {
        db.all(sqlget, async (error, rows) => {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                console.log(rows)
                let sqlSwitcheroo = `INSERT INTO old_labquestions (question_id, module, practical, linked_question_id, problem_title, problem, pc_location, username, question_time, question_status)
                VALUES ("${rows[0].question_id}", "${rows[0].module}", "${rows[0].practical}", "${rows[0].linked_question_id}", "${rows[0].problem_title}", "${rows[0].problem}", "${rows[0].pc_location}", "${rows[0].username}", "${rows[0].question_time}", "${rows[0].question_status}")`

                let random = await new Promise ((resolve, reject) => {
                    db.all(sqlSwitcheroo, async (error, rows) => {
                        if(error) {
                            console.log(error)
                            reject(error)
                        } else {
                            let deleteTableRow = await new Promise((resolve, reject) => {
                                db.all(sqlDeleteOld, async(error, rows) => {
                                    if(error) {
                                        console.log(error)
                                        reject(error)
                                    } else {
                                        resolve(rows)
                                    }
                                })
                            })
                            resolve(rows)
                        }
                    })
                })
                console.log(random)
                resolve(rows)
            }
        })
    })

    return switcheroo
                         
}