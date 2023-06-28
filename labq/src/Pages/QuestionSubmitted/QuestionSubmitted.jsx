import React from "react";
import { Container } from "@mui/material";
import SubmittedQuestion from "./Components/SubmittedQuestion";

const QuestionSubmitted = () => {
  return (
    <>
      <Container>
        <h1>You have submitted your question</h1>
        <p>Expected Wait time: </p>
        <p>No. in the queue: </p>
        <SubmittedQuestion />
      </Container>
    </>
  );
};

export default QuestionSubmitted;
