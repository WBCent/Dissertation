import { useState } from "react";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import authAccess from "../../../Context/auth-access.jsx";
import { useEffect } from "react";
import edit from "../../../Context/edit.jsx";
import { useLayoutEffect } from "react";
// import useAccessToken from "../../../FunctionComponents/AccessTokenHooks/CheckIfLoggedIn";

const defaultValues = {
  moduleCode: "",
  practical: "",
  linkedPractical: "",
  title: "",
  problem: "",
  location: "",
  username: "",
  date: null,
};

let check = {
  user: "",
};

let titlesAndIds = [];

//write a custom hook component useAccessToken that returns the access token, call it from the main body of the function

const Question = (props) => {
  const [formValues, setFormValues] = useState(defaultValues);
  let navigate = useNavigate();
  const [closed, setClosed] = useState(false);
  let { accessToken, setAccessToken, username, setUsername } =
    useContext(authAccess);
  let { editOpen, setEditOpen, loadingEdit, setLoadingEdit } = useContext(edit);
  const [loading, setLoading] = useState(true);

  const fetchTitles = async () => {
    let titlesAndID = await fetch(
      "http://localhost:5000/retrievepastquestiontitles"
    );
    let response = await titlesAndID.json();
    console.log(response);
    titlesAndIds = response;
    console.log(titlesAndIds);
  };

  useEffect(() => {
    fetchTitles().then(() => {
        setLoading(false);
        console.log(loading)
    });
  }, [titlesAndIds]);

  useEffect(() => {
    if (username != "") {
      openOrClosed();
    }
  }, [username]);

  const handleInputChange = (e) => {
    const { name, value } = e.target; //get the name and value from the input that has been changed
    console.log("changing", name, value);
    setFormValues({ ...formValues, [name]: value }); //set all the other form values to their previous value, and the new one to the changed value
  };

  const isValid = (name) => {
    //all inputs must be filled in
    let valid = formValues[name] && formValues[name].trim() != "";
    //some inputs have additional validation
    if (name == "location" && valid) {
      valid = formValues[name].substring(0, 2).toLowerCase() == "pc";
    }
    return valid;
  };

  const reset = () => {
    console.log("resetting values", formValues, defaultValues);
    setFormValues(defaultValues); //set all form values to their default value
  };

  const openOrClosed = async () => {
    console.log(username);
    check.user = username;
    let open = await fetch("http://localhost:5000/openOrClosed", {
      method: "POST",
      body: JSON.stringify(check),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let response = await open.json();
    console.log(response);
    if (response.askAnotherQuestion == true) {
      setClosed(false);
    } else if (response.askAnotherQuestion == false) {
      setClosed(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); //make sure the form does not submit
    console.log("submitting form", formValues); //check what values we are submitting (for debug only)
    if (
      isValid("moduleCode") &&
      isValid("practical") &&
      isValid("linkedPractical") &&
      isValid("title") &&
      isValid("problem") &&
      isValid("location") &&
      closed == false
    ) {
      try {
        setLoadingEdit(true);
        console.log(accessToken, username);
        console.log("trying to submit form data", formValues);
        formValues.date = new Date();
        formValues.username = username;
        await sendFormData(formValues);
        console.log("success");
        reset();
        console.log("finished resets");
        redirectSubmit();
      } catch (err) {
        console.log("error", err);
      }
    } else {
      window.alert("something is not valid or you have an open question");
    }
  };

  const sendFormData = async (formValues) => {
    console.log("sending", JSON.stringify(formValues));
    const sendData = await fetch("http://localhost:5000/formsubmission", {
      method: "POST",
      body: JSON.stringify(formValues),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const returnedData = await sendData.json();
    console.log(returnedData);
    // Placing asked question into session storage.
    return returnedData;
  };

  //redirect on button click to the question submitted page:
  const redirectSubmit = () => {
    console.log("hello");
    return navigate("/cslabs/questionsubmitted");
  };

  return (
    <Container>
      {closed ? (
        <p>You have an open question</p>
      ) : (
        <Box component="form" sx={{ m: 1 }}>
          <Select
            id="moduleCode"
            name="moduleCode"
            fullWidth
            label="Select a module code"
            value={formValues.moduleCode}
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
          <TextField
            id="practical"
            name="practical"
            fullWidth
            label="Which practical is it related to?"
            value={formValues.practical}
            onChange={handleInputChange}
            error={!isValid("practical")}
            helperText={!isValid("practical") && "Enter a valid Practical"}
          />
          <Select
            id="linkedPractical"
            name="linkedPractical"
            fullWidth
            label="Is there a past question that you have asked that this is related to"
            value={formValues.linkedPractical}
            error={!isValid("linkedPractical")}
            onChange={handleInputChange}
          >
            <MenuItem value={"N/A"}>N/A</MenuItem>
            {loading == false ? (
              titlesAndIds.map((obj) => (
                <MenuItem value={obj.question_id}>
                  {obj.problem_title}
                </MenuItem>
              ))
            ) : (
              <p>Loading</p>
            )}
          </Select>
          <TextField
            id="title"
            name="title"
            fullWidth
            label="What is the title of your problem"
            value={formValues.title}
            onChange={handleInputChange}
            error={!isValid("title")}
            helperText={!isValid("title") && "Enter a valid problem title"}
          />
          <TextField
            id="problem"
            name="problem"
            fullWidth
            label="Describe the problem that you are having. WHat have you tried so far? What happened when you tried it?"
            value={formValues.problem}
            onChange={handleInputChange}
            error={!isValid("problem")}
            helperText={
              !isValid("problem") && "Enter a valid problem description"
            }
          />
          <TextField
            id="location"
            name="location"
            fullWidth
            label="Which PC are You WOrking at? There is a label on the front of the PC, teh name will have a PCx- prefix followed by three digits. For example PC7-043"
            value={formValues.location}
            onChange={handleInputChange}
            error={!isValid("location")}
            helperText={!isValid("location") && "Enter a valid PC location"}
          />
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Question;
