import React from "react";
import Form from "./Pages/Form/Form";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import QuestionSubmitted from "./Pages/QuestionSubmitted/QuestionSubmitted";
import PreviousQuestions from "./Pages/PreviousQuestions/PreviousQuestions";
import Root from "./Pages/RootLayout/RootLayout";

// Adapted from: https://learn.microsoft.com/en-us/azure/active-directory/develop/single-page-app-tutorial-04-call-api?tabs=visual-studio-code
import { loginRequest } from "./authConfig";
import { callMsGraph } from "./graph";


const router = createBrowserRouter([
  {
    path: "/app/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "home", element: <Form /> },
      { path: "Questions", element: <QuestionSubmitted /> },
      { path: "previousquestions", element: <PreviousQuestions /> },
      {path: "questionsubmitted", element: <QuestionSubmitted />}
    ],
  },
]);

function App() {

    return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
