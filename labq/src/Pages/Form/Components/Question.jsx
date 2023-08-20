import { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormLabel,
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
import questionSync from "../../../Context/QuestionSync.jsx";
import LinkedQuestionStatus from "../../../Context/QuestionFormModal.jsx";
import LinkedQuestionModal from "./LinkedQuestionModal.jsx";
// import useAccessToken from "../../../FunctionComponents/AccessTokenHooks/CheckIfLoggedIn";

const defaultValues = {
  moduleCode: "",
  practical: "",
  linkedPractical: "N/A",
  title: "",
  problem: "",
  location: "",
  username: "",
  time: null,
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
  let { questionSub, setQuestionSub } = useContext(questionSync);
  let { accessToken, setAccessToken, username, setUsername } = useContext(authAccess);
  let { editOpen, setEditOpen, loadingEdit, setLoadingEdit } = useContext(edit);
  const [loading, setLoading] = useState(true);
  const { linkedQuestionModalStatus, setLinkedQuestionModalStatus } = useContext(LinkedQuestionStatus)

  const fetchTitles = async () => {
    let titlesAndID = await fetch(
      "http://localhost:5000/retrievepastquestiontitles", {
      method: 'POST',
      body: JSON.stringify({ username }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    );
    let response = await titlesAndID.json();
    console.log(response);
    titlesAndIds = response;
    console.log(titlesAndIds);
  };


  useEffect(() => {
    fetchTitles().then(() => {
      if (titlesAndIds.length > 0) {
        setLoading(false);
        console.log(loading);
      } else if (username != '') {
        setLoading(false)
      } else {
        console.log('Loading')
      }
    });
  }, [titlesAndIds, username]);

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
      setQuestionSub(false);
    } else if (response.askAnotherQuestion == false) {
      setQuestionSub(true);
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
      questionSub == false
    ) {
      try {
        setLoadingEdit(true);
        console.log(accessToken, username);
        console.log("trying to submit form data", formValues);
        let testDate = new Date();
        formValues.time = `${testDate.getHours()}:${testDate.getMinutes()}:${testDate.getSeconds()}`;
        formValues.date = `${testDate.getFullYear()}-${testDate.getMonth()}-${testDate.getDate()}`;
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

  const openModal = () => {
    setLinkedQuestionModalStatus(true)
  }




  return (
    <Container>
      {questionSub ? (
        <article className="grid-cols-2 grid-rows-4 outline outline-red-500 shadow-lg rounded-lg pl-10 pr-10 pt-4 pb-4 mt-5">
          <p className="text-center text-red-500"><strong>You have an open question<br />After you have submitted a question you are not allowed to submit a question again until you have either cancelled your question or it has been marked as solved<br />To see how long you have to wait and your place in the queue please go to the question submitted page.<br />There you can also edit, and add comments to questions.</strong></p>
        </article>
      ) : (
        <Box sx={{ mt: 4 }}>
          <FormLabel>Which Module is the question related to?</FormLabel>
          <Select
            id="moduleCode"
            name="moduleCode"
            fullWidth
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
          <FormLabel>Which practical is the question related to?</FormLabel>
          <TextField
            id="practical"
            name="practical"
            fullWidth
            value={formValues.practical}
            onChange={handleInputChange}
            error={!isValid("practical")}
          />
          <FormLabel>
            Do any of your past questions relate to this question?
          </FormLabel>
          <Select
            id="linkedPractical"
            name="linkedPractical"
            fullWidth
            value={formValues.linkedPractical}
            error={!isValid("linkedPractical")}
            onChange={handleInputChange}
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
          <Button sx={{ mt: 1, mb: 3 }} disabled={formValues.linkedPractical == 'N/A' ? true : false} fullWidth onClick={() => { openModal() }} variant="contained">Open Linked Question</Button>
          <LinkedQuestionModal open={[linkedQuestionModalStatus, setLinkedQuestionModalStatus]} question_id={formValues.linkedPractical} />
          <FormLabel>What is the title of your problem?</FormLabel>
          <TextField
            id="title"
            name="title"
            fullWidth
            value={formValues.title}
            onChange={handleInputChange}
            error={!isValid("title")}
          />
          <FormLabel>
            Describe your problem in detail. What have you tried so far? What
            has happened when you tried it?
          </FormLabel>
          <TextField
            id="problem"
            name="problem"
            multiline={true}
            rows={5}
            fullWidth
            value={formValues.problem}
            onChange={handleInputChange}
            error={!isValid("problem")}
          />
          <FormLabel>
            Which PC are You Working at? There is a label on the front of the
            PC, the name will have a PCx- prefix followed by three digits. For
            example PC7-043
          </FormLabel>
          <TextField
            id="location"
            name="location"
            fullWidth
            value={formValues.location}
            onChange={handleInputChange}
            error={!isValid("location")}
          />
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ mt: 4, fontWeight: 'bold', fontSize: 25, p: 3 }}
            color="success"
            fullWidth
          >
            Submit
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Question;
