import React from "react";
import Form from "./Pages/Form/Form";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import QuestionSubmitted from "./Pages/QuestionSubmitted/QuestionSubmitted";
import PreviousQuestions from "./Pages/PreviousQuestions/PreviousQuestions";
import Root from "./Pages/RootLayout/RootLayout";
import authAccess from "./Context/auth-access";

// Adapted from: https://learn.microsoft.com/en-us/azure/active-directory/develop/single-page-app-tutorial-04-call-api?tabs=visual-studio-code
import { loginRequest } from "./authConfig";
import { callMsGraph } from "./graph";
import { useState } from "react";
import { useContext } from "react";
import ModalStatus from "./Context/ModalOpenOrClosed";


const router = createBrowserRouter([
  {
    path: "/cslabs",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {path: '', element: <Form />},
      { path: "home", element: <Form /> },
      { path: "Questions", element: <QuestionSubmitted /> },
      { path: "previousquestions", element: <PreviousQuestions /> },
      {path: "questionsubmitted", element: <QuestionSubmitted />}
    ],
  },
]);

function App() {
  let auth = useContext(authAccess)
  let modalStatus = useContext(ModalStatus)
  const [openOrClosed, setOpenOrClosed] = useState(false)
  const [accessToken, setAccessToken] = useState('')
  const [username, setUsername] = useState('')
  const [kid, setKid] = useState('')
  const send = {accessToken, setAccessToken, username, setUsername, kid, setKid}
  const modal = { openOrClosed, setOpenOrClosed }


    return (
    <>
    <authAccess.Provider value={send}>
      <ModalStatus.Provider value={modal}>
        <RouterProvider router={router} />
      </ModalStatus.Provider>
    </authAccess.Provider>
    </>
  );
}

export default App;
