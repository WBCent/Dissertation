//Adapted from the following page:https://learn.microsoft.com/en-us/azure/active-directory/develop/single-page-app-tutorial-03-sign-in-users?tabs=visual-studio
import { AppBar, Box, CssBaseline, Toolbar, Typography } from "@mui/material";
import SignIn from "./components/SignIn";
import SignOut from "/home/wemb1/Documents/Dissertation/Dissertation/labq/src/Pages/RootLayout/components/SignOut.jsx";
import { useIsAuthenticated } from "@azure/msal-react";
import { Outlet } from "react-router-dom";
import DeleteTable from "./components/DeleteTable";


const Root = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      <Box>
        <CssBaseline>
          <AppBar position="static">
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {isAuthenticated ? (
                <Box>
                  <Typography>Question Form</Typography>
                  <Typography>Previous Questions</Typography>
                  <Typography>Question Bank</Typography>
                  <Typography>ChatGPT</Typography>
                  <DeleteTable />
                  <SignOut />
                </Box>
              ) : (
                <SignIn />
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
