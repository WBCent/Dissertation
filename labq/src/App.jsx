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
import solution from "./Context/Solutions";
import QuestionBankStaff from "./Pages/StaffSide/QuestionBankStaff/QuestionBankStaff";
import OpenClosingTimes from "./Pages/StaffSide/Settings/OpenClosingTimes/OpenClosingTimes";
import Settings from "./Pages/StaffSide/Settings/Settings";
import StaffProfile from "./Context/StaffProfile";
import edit from "./Context/edit";
import StudentQuestions from "./Pages/StaffSide/StudentQuestions/StudentQuestions";
// import QuestionBank from "./Pages/QuestionBank/QuestionBank";


const router = createBrowserRouter([
  {
    path: "/cslabs",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <Form /> },
      { path: "home", element: <Form /> },
      { path: "Questions", element: <QuestionSubmitted /> },
      { path: "previousquestions", element: <PreviousQuestions /> },
      { path: "questionsubmitted", element: <QuestionSubmitted /> },
      // { path: "questionbank", element: <QuestionBank />}
    ],
  },
  {
    path: '/csStaff/',
    element: <Root />,
    children: [
      {path: '', element: <StudentQuestions /> },
      { path: 'questionbankstaff', element: <QuestionBankStaff /> },
      { path: 'labsettings', element: <Settings /> }
    ]
  },
]);

function App() {
  let auth = useContext(authAccess)
  let modalStatus = useContext(ModalStatus)
  let solutionStatus = useContext(solution)
  let staffProfile = useContext(StaffProfile)
  let editone = useContext(edit)
  const [openOrClosed, setOpenOrClosed] = useState(false)
  const [accessToken, setAccessToken] = useState('')
  const [username, setUsername] = useState('')
  const [kid, setKid] = useState('')
  const [solutionOpen, setSolutionStatus] = useState(false)
  const [StaffProfileOpen, setStaffProfileOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [editOpen, setEditOpen] = useState(false)
  const [loadingEdit, setLoadingEdit] = useState(true)
  const [loadingRetrieveEdit, setLoadingRetrieveEdit] = useState(false)
  const send = { accessToken, setAccessToken, username, setUsername, kid, setKid, loading, setLoading }
  const modal = { openOrClosed, setOpenOrClosed }
  const solutionOpenorClosed = { solutionOpen, setSolutionStatus }
  const StaffProfiles = { StaffProfileOpen, setStaffProfileOpen }
  const editSend = {editOpen, setEditOpen, loadingEdit, setLoadingEdit, loadingRetrieveEdit, setLoadingRetrieveEdit}

  return (
    <>
      <authAccess.Provider value={send}>
        <ModalStatus.Provider value={modal}>
          <solution.Provider value={solutionOpenorClosed}>
            <StaffProfile.Provider value={StaffProfiles}>
              <edit.Provider value={editSend}>
                <RouterProvider router={router} />
              </edit.Provider>
            </StaffProfile.Provider>
          </solution.Provider>
        </ModalStatus.Provider>
      </authAccess.Provider>
    </>
  );
}

export default App;
