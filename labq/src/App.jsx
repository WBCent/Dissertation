import React from 'react';
import Form from './Pages/Form/Form'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from './Pages/RootLayout/RootLayout';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import QuestionSubmitted from './Pages/QuestionSubmitted/QuestionSubmitted';
import PreviousQuestions from './Pages/PreviousQuestions/PreviousQuestions';
import WelcomePage from './Pages/WelcomePage/WelcomePage';

// Taken from: https://learn.microsoft.com/en-us/azure/active-directory/develop/single-page-app-tutorial-04-call-api?tabs=visual-studio-code

import { PageLayout } from './Pages/SigninPage/components/PageLayout';
import { loginRequest } from './authConfig';
import { callMsGraph } from './graph';
import { ProfileData } from './Pages/SigninPage/components/ProfileData';

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';

import './App.css';

import Button from 'react-bootstrap/Button';

/**
* Renders information about the signed-in user or a button to retrieve data about the user
*/
const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);
  
  function RequestProfileData() {
      // Silently acquires an access token which is then attached to a request for MS Graph data
      instance
          .acquireTokenSilent({
              ...loginRequest,
              account: accounts[0],
          })
          .then((response) => {
              callMsGraph(response.accessToken).then((response) => setGraphData(response));
          });
  }
  
  return (
      <>
          <h5 className="card-title">Welcome {accounts[0].name}</h5>
          <br/>
          {graphData ? (
              <ProfileData graphData={graphData} />
          ) : (
              <Button variant="secondary" onClick={RequestProfileData}>
                  Request Profile Information
              </Button>
          )}
      </>
  );
};




//End of taken from: https://learn.microsoft.com/en-us/azure/active-directory/develop/single-page-app-tutorial-04-call-api?tabs=visual-studio-code






const router = createBrowserRouter([
  {path: '/app/', errorElement: <ErrorPage />, children: [
      { path: 'home', element: <Form />},
      { path: 'questionsubmitted', element: <QuestionSubmitted />},
      { path: 'previousquestions', element: <PreviousQuestions />},
      {path: 'loginpage', element: <WelcomePage />}
  ]},

])


// Taken from: https://learn.microsoft.com/en-us/azure/active-directory/develop/single-page-app-tutorial-04-call-api?tabs=visual-studio-code


/**
* If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
*/
const MainContent = () => {
  return (
      <div className="App">
          <AuthenticatedTemplate>
              <ProfileContent />
          </AuthenticatedTemplate>
  
          <UnauthenticatedTemplate>
              <h5>
                  <center>
                      Please sign-in to see your profile information.
                  </center>
              </h5>
          </UnauthenticatedTemplate>
      </div>
  );
};
  
export default function App() {
  return (
      <PageLayout>
          <center>
              <MainContent />
          </center>
      </PageLayout>
  );
}

