//Adapted from the following page:https://learn.microsoft.com/en-us/azure/active-directory/develop/single-page-app-tutorial-03-sign-in-users?tabs=visual-studio
import { Button } from '@mui/material'
import { useMsal } from "@azure/msal-react";

const SignOut = () => {
    const {instance} = useMsal();
    
    const handleLogout = () => {
        instance.logoutRedirect({postLogoutRedirectUri: "/"})
    }

    return (
        <Button variant="contained" onClick={handleLogout}>Logout</Button>
    )
}

export default SignOut;