import React from "react";
import { Container } from "@mui/material";
import SubmittedQuestion from "./Components/SubmittedQuestion";
import SendAnotherQuestion from "./Components/SendAnotherQuestion";

const QuestionSubmitted = () => {
  return (
    <>
      <Container>
        <h1>You have submitted your question</h1>
        <p>Expected Wait time: </p>
        <p>No. in the queue: </p>
        <SubmittedQuestion />
        <SendAnotherQuestion />
      </Container>
    </>
  );
};

export default QuestionSubmitted;
