CREATE TABLE IF NOT EXISTS labquestions (
    question_id VARCHAR(32) PRIMARY KEY,
    module VARCHAR(6) NOT NULL,
    practical VARCHAR(900) NOT NULL,
    problem VARCHAR(900) NOT NULL,
    pc_location VARCHAR(7) NOT NULL
);

