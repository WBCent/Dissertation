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
import { useCallback } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest, graphConfig } from '../../authConfig';
import {nanoid} from 'nanoid';

const Root = () => {
  const isAuthenticated =true; // useIsAuthenticated();
//  const {instance, accounts, inProgress} =  useMsal();
	const instance = null;
	const accounts = null;
	const inProgress = false;
  let {accessToken, setAccessToken, username, setUsername, kid, setKid} = useContext(authAccess)

  let navigate = useNavigate();
  const [teacher, setTeacher] = useState(false);

  useEffect(() => {
    checkIfTeacher();
  }, [username]);

  const checkIfTeacher = async () => {
    let teachers = await fetch("/cslabs/fetchteachers");
    let educators = await teachers.json();
    console.log(educators)
    for (let educator in educators) {
      if (educators[educator].username == username) {
        setTeacher(true);
      }
    }
  };

  const getAccessToken = useCallback(async () => {
    const request = {
    ...loginRequest,
    account: accounts[0],
    };
    try {
    return await instance.acquireTokenSilent(request);
    } catch (error) {
    return await instance.acquireTokenRedirect(request);
}
}, [instance, accounts]);

useEffect(()=> {
    console.log("the useEffect works", isAuthenticated)
    if(isAuthenticated) {
//        getUser()
	if(username == '') {
		setUsername(nanoid(10));
	}
    }
  }, [isAuthenticated, accounts, instance])

  const getUser = useCallback(async () => {
    const accessToken = await getAccessToken();

    const headers = new Headers();
    const bearer = `Bearer ${accessToken.accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
      method: "GET",
      headers: headers,
    };

    const fetchResult = await fetch(graphConfig.graphMeEndpoint, options);
    let username1 = await fetchResult.json();    
    setUsername(username1)
    await fetch('/cslabs/encryptusername', {
        method: "POST",
        body: JSON.stringify({username1}),
        headers: {
          "Content-Type": "application/json",
        },
    })

  }, [getAccessToken]);

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
