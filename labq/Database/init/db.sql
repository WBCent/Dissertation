CREATE TABLE IF NOT EXISTS educators (
    username VARCHAR(50) NOT NULL,
    course_level VARCHAR(15),
    manning_lab_mon BOOLEAN,
    manning_lab_tue BOOLEAN,
    manning_lab_wed BOOLEAN,
    manning_lab_thu BOOLEAN,
    manning_lab_fri BOOLEAN
);




CREATE TABLE labquestions (
    question_id VARCHAR(32) PRIMARY KEY,
    module VARCHAR(6) NOT NULL,
    practical VARCHAR(900) NOT NULL,
    linked_question_id VARCHAR(33),
    problem_title VARCHAR(300) NOT NULL,
    problem VARCHAR(900) NOT NULL,
    pc_location VARCHAR(7) NOT NULL,
    username VARCHAR(50) NOT NULL,
    question_time VARCHAR(100) NOT NULL,
    question_status VARCHAR(20) NOT NULL,
    reason_for_cancellation VARCHAR(900),
    solution VARCHAR(900)
);



CREATE TABLE IF NOT EXISTS questionbank (
    bank_id VARCHAR (32) PRIMARY KEY,
    bank_module VARCHAR(6) NOT NULL,
    bank_question VARCHAR(100) NOT NULL,
    bank_answer VARCHAR(900) NOT NULL
);


CREATE TABLE IF NOT EXISTS openingTimes (
    mon_open,
    mon_close,
    tue_open, 
    tue_close,
    wed_open,
    wed_close,
    thu_open,
    thu_close,
    fri_open,
    fri_close
);