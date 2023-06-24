import React from 'react';
import Form from './Pages/Form/Form'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from './Pages/RootLayout/RootLayout';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import QuestionSubmitted from './Pages/QuestionSubmitted/QuestionSubmitted';
import PreviousQuestions from './Pages/PreviousQuestions/PreviousQuestions';

const router = createBrowserRouter([
  {path: '/app/', errorElement: <ErrorPage />, children: [
      { path: 'home', element: <Form />},
      { path: 'Questions', element: <QuestionSubmitted />},
      { path: 'previousquestions', element: <PreviousQuestions />}
  ]},

])

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
