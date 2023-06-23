import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import useInputValidation from "../FormHook/FormHook";
import {Select, Container} from '@mui/material'

const Question = () => {

  const sendFormData = async (ModuleCode, PracticalInput, ProblemInput, Location) => {
    const sendData = await fetch('http://localhost:7378/formsubmission', {
      method: 'POST',
      body: JSON.stringify(ModuleCode, PracticalInput, ProblemInput, Location),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const returnedData = await sendData.json()
    console.log(returnedData)
  }

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

  const submittingForm = () => {
    if (
      moduleCodeInputIsValid &&
      PracticalInputIsValid &&
      ProblemInputIsValid &&
      LocationInputIsValid
    ) {
      try{
        sendFormData(moduleCodeInputValue, PracticalInputValue, ProblemInputValue, LocationInputValue)
        console.log("success")
        moduleCodeReset();
        PracticalReset();
        ProblemReset();
        LocationReset();
      } catch(err) {
        console.log(err)
      }
    }
  };

  return (
    <Container>
    <Box component="form" onClick={submittingForm}>
        {/* <InputLabel>Module Code</InputLabel>
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
        </Select> */}
        <TextField
          id="Practical"
          fullWidth
          label="Which practical is it related to?"
          value={PracticalInputValue}
          onChange={PracticalInputChange}
          error={PracticalInputError}
          helperText={PracticalInputError && "Enter a valid Practical"}
        />
        <TextField
          id="Problem"
          fullWidth
          label="Describe the problem that you are having. WHat have you tried so far? What happened when you tried it?"
          value={ProblemInputValue}
          onChange={ProblemInputChange}
          error={ProblemInputError}
          helperText={ProblemInputError && "Enter a valid Practical"}
        />
        <TextField
          id="Location"
          fullWidth
          label="Which PC are You WOrking at? There is a label on the front of the PC, teh name will have a PCx- prefix followed by three digits. For example PC7-043"
          value={LocationInputValue}
          onChange={LocationInputChange}
          error={LocationInputError}
          helperText={LocationInputError && "Enter a valid Practical"}
        />
        <button>Submit</button>
    </Box>
    </Container>
  );
};

export default Question;
