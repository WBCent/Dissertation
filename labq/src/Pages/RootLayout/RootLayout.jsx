//Adapted from the following page:https://learn.microsoft.com/en-us/azure/active-directory/develop/single-page-app-tutorial-03-sign-in-users?tabs=visual-studio
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";
import SignIn from "./components/SignIn";
import SignOut from "/home/wemb1/Documents/Dissertation/Dissertation/labq/src/Pages/RootLayout/components/SignOut.jsx";
import { useIsAuthenticated } from "@azure/msal-react";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import authAccess from "../../Context/auth-access";
import { useState } from "react";

const Root = () => {
  const isAuthenticated = useIsAuthenticated();
  let navigate = useNavigate();
  const [teacher, setTeacher] = useState(false);
  let { username } = useContext(authAccess);

  useEffect(() => {
    checkIfTeacher();
  }, [username]);

  const checkIfTeacher = async () => {
    let teachers = await fetch("/fetchteachers");
    let educators = await teachers.json();
    console.log(educators)
    for (let educator in educators) {
      if (educators[educator].username == username) {
        setTeacher(true);
      }
    }
  };

  const navigateToQuestionForm = () => {
    return navigate("");
  };

  const navigateToQuestionSubmitted = () => {
    return navigate("questionsubmitted");
  };

  const navigateToPreviousQuestions = () => {
    return navigate("previousquestions");
  };

  const navigateToQuestionBank = () => {
    return navigate("questionbank");
  };

  const navigateToTeacherQuestionBank = () => {
    return navigate("questionbankstaff")
  }

  const navigateToLabTeacherSettings = () => {
    return navigate("labsettings")
  }

  return (
    <>
      <Box>
        <CssBaseline>
          <AppBar position="sticky">
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {isAuthenticated ? (
                <>
                  {teacher == false ? (
                    <>
                      <Button
                        variant="contained"
                        onClick={navigateToQuestionForm}
                      >
                        Question Form
                      </Button>
                      <Button
                        variant="contained"
                        onClick={navigateToQuestionSubmitted}
                      >
                        Question Submitted
                      </Button>
                      <Button
                        variant="contained"
                        onClick={navigateToPreviousQuestions}
                      >
                        Previous Questions
                      </Button>
                      <Button
                        variant="contained"
                        onClick={navigateToQuestionBank}
                      >
                        Question Bank
                      </Button>
                      <SignOut />
                    </>
                  ) : (
                    <>
                      <Button variant="contained" onClick={navigateToTeacherQuestionBank}>
                        Add to Question Bank
                      </Button>
                      <Button variant="contained" onClick={navigateToLabTeacherSettings}>
                        Settings
                      </Button>
                      <SignOut />
                    </>
                  )}
                </>
              ) : (
                <>
                  <SignIn />
                </>
              )}
            </Toolbar>
          </AppBar>
        </CssBaseline>
      </Box>
      <Outlet />
    </>
  );
};

export default Root;
