//Adapted from the following page:https://learn.microsoft.com/en-us/azure/active-directory/develop/single-page-app-tutorial-03-sign-in-users?tabs=visual-studio
import {useMsal} from '@azure/msal-react';
import { loginRequest } from '../../../authConfig';
import { Button } from '@mui/material';

const SignIn = () => {
    const { instance } = useMsal();

    const handleLogin = () => {
        instance.loginRedirect(loginRequest).catch((e) => {
            console.log(e);
        })
    }



    return(
        <Button onClick={handleLogin}>Sign In</Button>
    )
}

export default SignIn;