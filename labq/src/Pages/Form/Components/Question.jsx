import {useState} from "react";
import {Box, Button, Container, MenuItem, Select, TextField} from '@mui/material';

const defaultValues = {
    moduleCode: "",
    practical: "",
    problem: "",
    location: "",
};

const Question = () => {
    const [formValues, setFormValues] = useState(defaultValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target; //get the name and value from the input that has been changed
        console.log("changing", name, value);
        setFormValues({...formValues, [name]: value}); //set all the other form values to their previous value, and the new one to the changed value
    };

    const isValid = (name) => {
        //all inputs must be filled in
        let valid = formValues[name] && formValues[name].trim() != "" ;
        //some inputs have additional validation
        if (name == "location" && valid) {
            valid = formValues[name].substring(0,2).toLowerCase() == "pc";
        }
        return valid; 
    }

    const reset = () => {
        console.log("resetting values", formValues, defaultValues);
        setFormValues(defaultValues); //set all form values to their default value
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); //make sure the form does not submit
        console.log("submitting form", formValues); //check what values we are submitting (for debug only)
        if (
            isValid("moduleCode") &&
            isValid("practical") &&
            isValid("problem") &&
            isValid("location")
        ) {
            try{
                console.log("trying to submit form data", formValues);
                await sendFormData(formValues)
                console.log("success")
                reset();
                console.log("finished resets");
            } catch(err) {
                console.log("error", err);
            }
        }
        else {
            console.log("something is not valid");
        }
    };

  const sendFormData = async (formValues) => {
    console.log("sending", JSON.stringify(formValues));
    const sendData = await fetch('http://localhost:5000/formsubmission', {
      method: 'POST',
      body: JSON.stringify(formValues),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const returnedData = await sendData.json()
    console.log(returnedData)
  }

  return (
    <Container>
    <Box component="form" sx={{m: 1}}>
        <Select id="moduleCode" name="moduleCode"
            fullWidth
            label="Select a module code"
            value={formValues.moduleCode}
            error={!isValid("moduleCode")}
            onChange={handleInputChange}>
          <MenuItem value={'CS1002'}>CS1002</MenuItem>
          <MenuItem value={'CS1003'}>CS1003</MenuItem>
          <MenuItem value={'CS1006'}>CS1006</MenuItem>
          <MenuItem value={'CS1007'}>CS1007</MenuItem>
          <MenuItem value={'CS2001'}>CS2001</MenuItem>
          <MenuItem value={'CS2101'}>CS2101</MenuItem>
          <MenuItem value={'CS2002'}>CS2002</MenuItem>
          <MenuItem value={'CS2003'}>CS2003</MenuItem>
          <MenuItem value={'CS2006'}>CS2006</MenuItem>
        </Select>
        <TextField
          id="practical" name="practical"
          fullWidth
          label="Which practical is it related to?"
          value={formValues.practical}
          onChange={handleInputChange}
          error={!isValid("practical")}
          helperText={!isValid("practical") && "Enter a valid Practical"}
        />
        <TextField
          id="problem" name="problem"
          fullWidth
          label="Describe the problem that you are having. WHat have you tried so far? What happened when you tried it?"
          value={formValues.problem}
          onChange={handleInputChange}
          error={!isValid("problem")}
          helperText={!isValid("problem") && "Enter a valid problem description"}
        />
        <TextField
          id="location" name="location"
          fullWidth
          label="Which PC are You WOrking at? There is a label on the front of the PC, teh name will have a PCx- prefix followed by three digits. For example PC7-043"
          value={formValues.location}
          onChange={handleInputChange}
          error={!isValid("location")}
          helperText={!isValid("location") && "Enter a valid PC location"}
        />
        <Button onClick={handleSubmit} variant="contained">Submit</Button>
    </Box>
    </Container>
  );
};

export default Question;
