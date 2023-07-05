//Adapted from the following page:https://learn.microsoft.com/en-us/azure/active-directory/develop/single-page-app-tutorial-03-sign-in-users?tabs=visual-studio
import {useMsal, useIsAuthenticated} from '@azure/msal-react';
import { loginRequest, graphConfig } from '../../../authConfig';
import { Button } from '@mui/material';
import { useCallback, useState, useEffect } from 'react';
import authAccess from '../../../Context/auth-access';
import { useContext } from 'react';



const SignIn = () => {
    const { instance, accounts } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const auth = useContext(authAccess)
    //Xu:
      const handleLogin = useCallback(async () => {
        if (!isAuthenticated) {
            console.log('this works')
            await retrievingAccessToken();
        } 
      }, [isAuthenticated, instance]);
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

    //END OF TAKEN FROM XU
    const retrievingAccessToken = async() => {
        console.log("hello I am working")
        let jsonToken = await getAccessToken()
        let username = jsonToken.account.username
        let AccessToken = jsonToken.accessToken;
        console.log(AccessToken)
        console.log(username);
        setAccessToken()
        auth.accessToken = AccessToken;
        auth.username = username;
        console.log(auth)
    }


    return(
        <Button variant="contained" onClick={(ev) => {handleLogin()}}>Sign In</Button>
    )
}

export default SignIn;