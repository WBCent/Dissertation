//https://www.computerhope.com/issues/ch002076.htm#db.js

import db from '../Database/db.js'

export var schema = {
    "labquestions": [
        "question_id", "module", "practical", "problem", "pc_location"
    ]
}

export function createRow (table, question_id, module, practical, problem, pc_location) {
    let sql = `INSERT INTO ${table} (question_id, module, practical, problem, pc_location)
               VALUES("${question_id}", "${module}", "${practical}", "${problem}", "${pc_location}");`
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
