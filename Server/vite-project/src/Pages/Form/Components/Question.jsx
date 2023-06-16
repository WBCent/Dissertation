import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import inputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import useInputValidation from "../FormHook/FormHook";

const Question = () => {
  const {
    value: moduleCodeInputValue,
    valid: moduleCodeInputIsValid,
    error: moduleCodeInputError,
    userInputCahnge: moduleCodeInputChange,
    clickedChange: moduleCodeClickedChange,
    reset: moduleCodeReset,
  } = useInputValidation((value) => value);

  const {
    value: PracticalInputValue,
    valid: PracticalInputIsValid,
    error: PracticalInputError,
    userInputCahnge: PracticalInputChange,
    clickedChange: PracticalClickedChange,
    reset: PracticalReset,
  } = useInputValidation((value) => value);

  const {
    value: ProblemInputValue,
    valid: ProblemInputIsValid,
    error: ProblemInputError,
    userInputCahnge: ProblemInputChange,
    clickedChange: ProblemClickedChange,
    reset: ProblemReset,
  } = useInputValidation((value) => value);

  const {
    value: LocationInputValue,
    valid: LocationInputIsValid,
    error: LocationInputError,
    userInputCahnge: LocationInputChange,
    clickedChange: LocationClickedChange,
    reset: LocationReset,
  } = useInputValidation((value) => value);

  let Time = new Date();

  const submittingForm = (event) => {
    event.preventDefault();

    if (
      moduleCodeInputIsValid &&
      PracticalInputIsValid &&
      ProblemInputIsValid &&
      LocationInputIsValid
    ) {
    }
  };

  return (
    <box>
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
          fullwidth
          label="Which practical is it related to?"
        />
        <TextField
          id="Problem"
          fullwidth
          label="Describe the problem that you are having. WHat have you tried so far? What happened when you tried it?"
        />
        <TextField
          id="Location"
          fullwidth
          label="Which PC are You WOrking at? There is a label on the front of the PC, teh name will have a PCx- prefix followed by three digits. For example PC7-043"
        />
        <button>Submit</button>
      </form>
    </box>
  );
};

export default Question;
