import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import useInputValidation from "../FormHook/FormHook";
import {Select, Container} from '@mui/material'

const Question = () => {



  const {
    value: moduleCodeInputValue,
    valid: moduleCodeInputIsValid,
    error: moduleCodeInputError,
    userInputChange: moduleCodeInputChange,
    clickedChange: moduleCodeClickedChange,
    reset: moduleCodeReset,
  } = useInputValidation((value) => value.trim() !== "");

  const {
    value: PracticalInputValue,
    valid: PracticalInputIsValid,
    error: PracticalInputError,
    userInputChange: PracticalInputChange,
    clickedChange: PracticalClickedChange,
    reset: PracticalReset,
  } = useInputValidation((value) => value.trim() !== "");

  const {
    value: ProblemInputValue,
    valid: ProblemInputIsValid,
    error: ProblemInputError,
    userInputChange: ProblemInputChange,
    clickedChange: ProblemClickedChange,
    reset: ProblemReset,
  } = useInputValidation((value) => value.trim() !== "");

  const {
    value: LocationInputValue,
    valid: LocationInputIsValid,
    error: LocationInputError,
    userInputChange: LocationInputChange,
    clickedChange: LocationClickedChange,
    reset: LocationReset,
  } = useInputValidation((value) => value.trim() !== "");

  let Time = new Date();

  const submittingForm = (event) => {
    event.preventDefault();

    if (
      moduleCodeInputIsValid &&
      PracticalInputIsValid &&
      ProblemInputIsValid &&
      LocationInputIsValid
    ) {
      console.log("hello")
    }
  };

  return (
    <Container>
    <Box component="form">
      <form onSubmit={submittingForm}>
        <InputLabel>Module Code</InputLabel>
        <Select id="Module-Code">
          <MenuItem>CS</MenuItem>
          <MenuItem>CS</MenuItem>
          <MenuItem>CS</MenuItem>
          <MenuItem>CS</MenuItem>
          <MenuItem>CS</MenuItem>
          <MenuItem>CS</MenuItem>
          <MenuItem>CS</MenuItem>
          <MenuItem>CS</MenuItem>
          <MenuItem>CS</MenuItem>
          <MenuItem>CS</MenuItem>
          <MenuItem>CS</MenuItem>
          <MenuItem>CS</MenuItem>
          <MenuItem>CS</MenuItem>
          <MenuItem>CS</MenuItem>
          <MenuItem>CS</MenuItem>
          <MenuItem>CS</MenuItem>
          <MenuItem>CS</MenuItem>
          <MenuItem>CS</MenuItem>
          <MenuItem>CS</MenuItem>
          <MenuItem>CS</MenuItem>
          <MenuItem>CS</MenuItem>
          <MenuItem>CS</MenuItem>
          <MenuItem>CS</MenuItem>
        </Select>
        <TextField
          id="Practical"
          fullWidth
          label="Which practical is it related to?"
        />
        <TextField
          id="Problem"
          fullWidth
          label="Describe the problem that you are having. WHat have you tried so far? What happened when you tried it?"
        />
        <TextField
          id="Location"
          fullWidth
          label="Which PC are You WOrking at? There is a label on the front of the PC, teh name will have a PCx- prefix followed by three digits. For example PC7-043"
        />
        <button>Submit</button>
      </form>
    </Box>
    </Container>
  );
};

export default Question;
