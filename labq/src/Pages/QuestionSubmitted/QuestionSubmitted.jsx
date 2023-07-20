import React from "react";
import { Container } from "@mui/material";
import SubmittedQuestion from "./Components/SubmittedQuestion";
//import SendAnotherQuestion from "./Components/SendAnotherQuestion";
import Analytics from "./Components/Analytics";

const QuestionSubmitted = () => {
  return (
    <>
      <Container>
        <Analytics />
        <SubmittedQuestion />
        {/* <SendAnotherQuestion /> */}
      </Container>
    </>
  );
};

export default QuestionSubmitted;
