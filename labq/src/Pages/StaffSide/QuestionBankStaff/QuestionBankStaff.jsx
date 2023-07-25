import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  FormLabel,
  Snackbar,
} from "@mui/material";

let questionBankQA = {
  title: "",
  moduleCode: "",
  solution: "",
};

const QuestionBankStaff = () => {
  const [questionValues, setQuestionValues] = useState(questionBankQA);
  const [submitted, setSubmitted] = useState(false)
 
  const handleInputChange = (e) => {
    const { name, value } = e.target; //get the name and value from the input that has been changed
    console.log("changing", name, value);
    setQuestionValues({ ...questionValues, [name]: value }); //set all the other form values to their previous value, and the new one to the changed value
  };

  const isValid = (name) => {
    //all inputs must be filled in
    let valid = questionValues[name] && questionValues[name].trim() != "";
    return valid;
  };

  const sendToQuestionBank = async () => {
    try {
      let FAQsent = await fetch("http://localhost:5000/savetoquestionbank", {
        method: "POST",
        body: JSON.stringify(questionValues),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let response = await FAQsent.json();
      console.log(response);
      setSubmitted(true)
    } catch (err) {
      console.log(err);
    }
  };

  const reset = () => {
    setQuestionValues(questionBankQA); //set all form values to their default value
  };

  const handleClose = () => {
    setSubmitted(false)
  }

  return (
    <>
      <Container>
        <Box component="form" sx={{ mt: 5 }}>
            <FormLabel>What is the FAQ Title</FormLabel>
          <TextField
            id="title"
            name="title"
            fullWidth
            value={questionValues.title}
            onChange={handleInputChange}
            error={!isValid("title")}
          />
          <FormLabel>What is the module code?</FormLabel>
          <Select
            id="moduleCode"
            name="moduleCode"
            fullWidth
            label="Select a module code"
            value={questionValues.moduleCode}
            error={!isValid("moduleCode")}
            onChange={handleInputChange}
          >
            <MenuItem value={"CS1002"}>CS1002</MenuItem>
            <MenuItem value={"CS1003"}>CS1003</MenuItem>
            <MenuItem value={"CS1006"}>CS1006</MenuItem>
            <MenuItem value={"CS1007"}>CS1007</MenuItem>
            <MenuItem value={"CS2001"}>CS2001</MenuItem>
            <MenuItem value={"CS2101"}>CS2101</MenuItem>
            <MenuItem value={"CS2002"}>CS2002</MenuItem>
            <MenuItem value={"CS2003"}>CS2003</MenuItem>
            <MenuItem value={"CS2006"}>CS2006</MenuItem>
          </Select>
          <FormLabel>What is the answer to the question?</FormLabel>
          <TextField
            id="solution"
            name="solution"
            fullWidth
            multiline={true}
            rows={5}
            value={questionValues.solution}
            onChange={handleInputChange}
            error={!isValid("solution")}
          />

          <Button variant="contained" onClick={() => {sendToQuestionBank(); reset()}} sx={{mt: 5}}>Save Question</Button>
          {/* Taken from MUI documentation: https://mui.com/material-ui/react-snackbar/ */}
          <Snackbar open={submitted} autoHideDuration={4000} onClose={handleClose} message="FAQ Submitted" />
          {/* End of taken from MUI documentation */}
        </Box>
      </Container>
    </>
  );
};

export default QuestionBankStaff;
