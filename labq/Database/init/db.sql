CREATE TABLE IF NOT EXISTS educators (
    username VARCHAR(50) NOT NULL,
    educator_name VARCHAR(50),
    course_level VARCHAR(15),
    manning_lab_mon INTEGER,
    manning_lab_tue INTEGER,
    manning_lab_wed INTEGER,
    manning_lab_thu INTEGER,
    manning_lab_fri INTEGER
);


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



CREATE TABLE if NOT EXISTS comments (
    comment_id VARCHAR(32) PRIMARY KEY,
    main_comment VARCHAR(900) NOT NULL,
    question_id VARCHAR(32) NOT NULL,
    FOREIGN KEY (question_id) REFERENCES labquestions (question_id)
);



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




CREATE TABLE IF NOT EXISTS questionbank (
    bank_id VARCHAR (32) PRIMARY KEY,
    bank_module VARCHAR(6) NOT NULL,
    bank_question VARCHAR(100) NOT NULL,
    bank_answer VARCHAR(900) NOT NULL
);


CREATE TABLE IF NOT EXISTS openingTimes (
    day_of_the_week VARCHAR(10) PRIMARY KEY,
    opening_time VARCHAR(5),
    closing_time VARCHAR(5),
    active INTEGER
);


CREATE TABLE IF NOT EXISTS old_comments (
    comment_id VARCHAR(32) PRIMARY KEY,
    main_comment VARCHAR(900) NOT NULL,
    question_id VARCHAR(32) NOT NULL,
    FOREIGN KEY (question_id) REFERENCES old_labquestions (question_id)
);


INSERT INTO openingTimes (day_of_the_week, opening_time, closing_time, active)
VALUES ("monday", "09:30", "18:30", 0);


INSERT INTO openingTimes (day_of_the_week, opening_time, closing_time, active)
VALUES ("tuesday", "09:30", "18:30", 0);


INSERT INTO openingTimes (day_of_the_week, opening_time, closing_time, active)
VALUES ("wednesday", "09:30", "18:30", 0);


INSERT INTO openingTimes (day_of_the_week, opening_time, closing_time, active)
VALUES ("thursday", "09:30", "18:30", 0);


INSERT INTO openingTimes (day_of_the_week, opening_time, closing_time, active)
VALUES ("friday", "09:30", "18:30", 0);


INSERT INTO educators(username, educator_name, course_level, manning_lab_mon, manning_lab_tue, manning_lab_wed, manning_lab_thu, manning_lab_fri)
VALUES ("asdf@st-andrews.ac.uk", "William Beressi", "CS1000", 1, 1, 1, 0, 1);

INSERT INTO educators(username, educator_name, course_level, manning_lab_mon, manning_lab_tue, manning_lab_wed, manning_lab_thu, manning_lab_fri)
VALUES ("qwer@st-andrews.ac.uk", "William Beressi", "CS1000", 1, 1, 1, 0, 1);

INSERT INTO educators(username, educator_name, course_level, manning_lab_mon, manning_lab_tue, manning_lab_wed, manning_lab_thu, manning_lab_fri)
VALUES ("zxcv@st-andrews.ac.uk", "William Beressi", "CS1000", 1, 1, 1, 1, 1);

INSERT INTO educators(username, educator_name, course_level, manning_lab_mon, manning_lab_tue, manning_lab_wed, manning_lab_thu, manning_lab_fri)
VALUES ("fghj@st-andrews.ac.uk", "William Beressi", "CS1000", 0, 0, 0, 0, 0);

INSERT INTO educators(username, educator_name, course_level, manning_lab_mon, manning_lab_tue, manning_lab_wed, manning_lab_thu, manning_lab_fri)
VALUES ("tyui@st-andrews.ac.uk", "William Beressi", "CS1000", 0, 1, 0, 1, 1);

INSERT INTO educators(username, educator_name, course_level, manning_lab_mon, manning_lab_tue, manning_lab_wed, manning_lab_thu, manning_lab_fri)
VALUES ("6780@st-andrews.ac.uk", "William Beressi", "CS1000", 1, 1, 0, 0, 1);