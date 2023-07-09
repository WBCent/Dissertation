CREATE TABLE IF NOT EXISTS labquestions (
    question_id VARCHAR(32) PRIMARY KEY,
    module VARCHAR(6) NOT NULL,
    practical VARCHAR(900) NOT NULL,
    linked_question_id VARCHAR(33),
    problem_title VARCHAR(300) NOT NULL,
    problem VARCHAR(900) NOT NULL,
    pc_location VARCHAR(7) NOT NULL,
    username VARCHAR(50) NOT NULL,
    question_time VARCHAR(100) NOT NULL,
    question_status VARCHAR(20) NOT NULL 
);



CREATE TABLE IF NOT EXISTS questionbank (
    bank_id VARCHAR (32) PRIMARY KEY,
    bank_module VARCHAR(6) NOT NULL,
    bank_question VARCHAR(100) NOT NULL,
    bank_answer VARCHAR(900) NOT NULL
)