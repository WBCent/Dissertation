//https://www.computerhope.com/issues/ch002076.htm#db.js

import db from '../Database/db.js'

export var schema = {
    "labquestions": [
        "question_id", "module", "practical", "problem", "pc_location", "username", "question_time"
    ]
}

export function createRow (table, question_id, module, practical, problem, pc_location, username, question_time, status) {
    console.log(table, question_id, module, practical, problem, pc_location, username, question_time, status)
    let sql = `INSERT INTO ${table} (question_id, module, practical, problem, pc_location, username, question_time, question_status)
               VALUES("${question_id}", "${module}", "${practical}", "${problem}", "${pc_location}", "${username}", "${question_time}", "${status}");`
    db.run(sql)
}


export async function retrievePastQuestions(table) {
    let sqlretrieve = `SELECT * FROM ${table};`

    //Need to use promise here
    let questions =  await new Promise((resolve, reject) => {
        db.all(sqlretrieve, (error, rows) => {
            if(error) {
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

    let last =  await new Promise((resolve, reject) => {
        db.all(sqllast, (error, rows) => {
            if(error) {
                console.log(error)
                reject(error)
            } else {
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
            if(error) {
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
        db.all(sqlOpen, (error, rows)=> {
            if(error) {
                console.log(error)
                reject(error)
            } else {
                resolve(rows)
            }
        })
    })

    return open;
}

export const updateQuestion = async (table, question_id, module, practical, problem, pc_location) => {
    let sqlUpdate = `UPDATE ${table} SET module="${module}", practical="${practical}", problem="${problem}", module="${pc_location}" WHERE question_id="${question_id}"`

    let update = await new Promise((resolve, reject) => {
        db.all(sqlUpdate, (error, rows) => {
            if(error) {
                console.log(error)
                reject(error)
            } else {
                resolve(rows)
            }
        })
    })
    return update

}