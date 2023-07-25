import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  FormLabel,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import authAccess from "../../../Context/auth-access.jsx";
import edit from "../../../Context/edit.jsx";
import event from "material/src/element/event.js";
import { useEffect } from "react";
// First off need to pass what has been written to the current page so that it is evident in the text fields
// Secondly Build form
// Thirdly Validate the form
// Fourth need to send the form to update the line.

let titlesAndIds = [];


const EditSubmittedQuestion = ({ values, retrieveJustAsked }) => {
  const [loading, setLoading] = useState(true)
  let {
    editOpen,
    setEditOpen,
    loadingEdit,
    setLoadingEdit,
    loadingRetrieveEdit,
    setLoadingRetrieveEdit,
  } = useContext(edit);
  const [editedValues, setEditedValues] = useState(values);
  let navigate = useNavigate();
  let { accessToken, setAccessToken, username, setUsername } =
    useContext(authAccess);
  // console.log(props)
  const handleInputChange = (e) => {
    const { name, value } = e.target; //get the name and value from the input that has been changed
    // console.log("changing", name, value);
    setEditedValues({ ...editedValues, [name]: value }); //set all the other form values to their previous value, and the new one to the changed value
  };

  useEffect(() => {
    setLoadingRetrieveEdit(true);
  });

  const isValid = (name) => {
    //all inputs must be filled in
    let valid = editedValues[name] && editedValues[name].trim() != "";
    //some inputs have additional validation
    if (name == "location" && valid) {
      valid = editedValues[name].substring(0, 2).toLowerCase() == "pc";
    }
    return valid;
  };

  const reset = () => {
    // console.log("resetting values", editedValues, props.values[0]);
    setEditedValues("PC"); //set all form values to their default value
  };


  useEffect(() => {
    fetchTitles().then(() => {
      setLoading(false);
      console.log(loading);
    });
  }, [titlesAndIds]);


  const fetchTitles = async () => {
    let titlesAndID = await fetch(
      "http://localhost:5000/retrievepastquestiontitles"
    );
    let response = await titlesAndID.json();
    console.log(response);
    titlesAndIds = response;
    console.log(titlesAndIds);
  };

  const handleSubmit = async () => {
    // event.preventDefault(); //make sure the form does not submit
    // console.log("submitting form", editedValues); //check what values we are submitting (for debug only)
    if (
      isValid("moduleCode") &&
      isValid("practical") &&
      isValid("linkedPractical") &&
      isValid("title") &&
      isValid("problem") &&
      isValid("location")
    ) {
      try {
        // console.log(accessToken, username)
        console.log("trying to submit form data", editedValues);
        editedValues.username = username;
        // console.log(editedValues)
        await sendFormData();
        console.log("success");
        // reset();
        setLoadingRetrieveEdit(false);
        let randomOne = await retrieveJustAsked(true);
        console.log(randomOne);
        await redirectSubmit();
      } catch (err) {
        console.log("error", err);
      }
    } else {
      console.log("something is not valid");
    }
  };

  const sendFormData = async () => {
    // console.log("sending", JSON.stringify(editedValues));
    const sendData = await fetch("http://localhost:5000/updatequestion", {
      method: "PUT",
      body: JSON.stringify(editedValues),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // const returnedData = await sendData.json();
    // console.log(sendData);
    // Placing asked question into session storage.
    return sendData;
  };

  //redirect on button click to the question submitted page:
  const redirectSubmit = async () => {
    setEditOpen(false);
  };

  return (
    <Box component="form" sx={{ m: 1 }}>
      <FormLabel>Which Module is the question related to?</FormLabel>
      <Select
        id="moduleCode"
        name="moduleCode"
        fullWidth
        value={editedValues.moduleCode}
        error={!isValid("moduleCode")}
        onChange={handleInputChange}
        // defaultValue={values.moduleCode}
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
      <FormLabel>Which practical is the question related to?</FormLabel>

      <TextField
        id="practical"
        name="practical"
        fullWidth
        value={editedValues.practical}
        onChange={handleInputChange}
        error={!isValid("practical")}
        helperText={!isValid("practical") && "Enter a valid Practical"}
        // defaultValue={values.practical}
      />
      <FormLabel>
        Do any of your past questions relate to this question?
      </FormLabel>
      <Select
        id="linkedPractical"
        name="linkedPractical"
        fullWidth
        value={editedValues.linkedPractical}
        error={!isValid("linkedPractical")}
        onChange={handleInputChange}
        // defaultValue={values.linkedPractical}
      >
        <MenuItem value={"N/A"}>N/A</MenuItem>
        {loading == false ? (
              titlesAndIds.map((obj) => (
                <MenuItem value={obj.question_id}>{obj.module}: {obj.problem_title}</MenuItem>
              ))
            ) : (
              <p>Loading</p>
            )}
      </Select>
      <FormLabel>What is the title of your problem?</FormLabel>
      <TextField
        id="title"
        name="title"
        fullWidth
        value={editedValues.title}
        onChange={handleInputChange}
        error={!isValid("title")}
        helperText={!isValid("title") && "Enter a valid problem title"}
        // defaultValue={values.title}
      />
      <FormLabel>
        Describe your problem in detail. What have you tried so far? What has
        happened when you tried it?
      </FormLabel>
      <TextField
        id="problem"
        name="problem"
        fullWidth
        value={editedValues.problem}
        onChange={handleInputChange}
        error={!isValid("problem")}
        helperText={!isValid("problem") && "Enter a valid problem description"}
        // defaultValue={values.problem}
      />
      <FormLabel>
        Which PC are You Working at? There is a label on the front of the PC,
        the name will have a PCx- prefix followed by three digits. For example
        PC7-043
      </FormLabel>
      <TextField
        id="location"
        name="location"
        fullWidth
        value={editedValues.location}
        onChange={handleInputChange}
        error={!isValid("location")}
        helperText={!isValid("location") && "Enter a valid PC location"}
        // defaultValue={values.location}
      />
      <Button
        sx={{mt: 4}}
        onClick={() => {
          setLoadingRetrieveEdit(true);
          handleSubmit();
        }}
        variant="contained"
      >
        Submit
      </Button>
    </Box>
  );
};

export default EditSubmittedQuestion;
