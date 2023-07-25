import React from "react";
import { Container } from "@mui/material";
import SubmittedQuestion from "./Components/SubmittedQuestion";
import Analytics from "./Components/Analytics";

const QuestionSubmitted = () => {
  return (
    <>
      <Container>
        <Analytics />
        <SubmittedQuestion />
      </Container>
    </>
  );
};

export default QuestionSubmitted;
