//Adapted from the following page:https://learn.microsoft.com/en-us/azure/active-directory/develop/single-page-app-tutorial-03-sign-in-users?tabs=visual-studio
import {useMsal, useIsAuthenticated} from '@azure/msal-react';
import { loginRequest, graphConfig } from '../../../authConfig';
import { Button } from '@mui/material';
import { useCallback, useState, useEffect } from 'react';
import authAccess from '../../../Context/auth-access';
import { useContext } from 'react';
import { callMsGraph } from '../../../graph';
import * as jose from 'jose'


const SignIn = () => {
    const { instance, accounts } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const {accessToken, setAccessToken, username, setUsername} = useContext(authAccess)
    console.log(accessToken, setAccessToken, username, setUsername)
    //Xu:
      const handleLogin = useCallback(async () => {
        if (!isAuthenticated) {
            console.log('this works')
            await instance.loginRedirect(loginRequest);
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
        console.log(jsonToken.accessToken)
        let please = jose.decodeJwt(jsonToken.accessToken)
        let header = jose.decodeProtectedHeader(jsonToken.accessToken)
        let signature = jsonToken.signature
        console.log(signature)
        console.log(please)
        // let header = jose.decodeProtectedHeader(jsonToken);
        console.log(header)
        header.kid;
        let username = jsonToken.account.username
        let AccessToken = jsonToken.accessToken
        setAccessToken(AccessToken);
        setUsername(username)
    }

    const validateToken = async () => {
        let jsonvalidate = await fetch('https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration');
        
        let validateToken = jsonvalidate.json();
        console.log(validateToken);
    }

    const order = async() => {
        await retrievingAccessToken();
        await validateToken();
    }

    order();

    return(
        <Button variant="contained" onClick={(ev) => {handleLogin()}}>Sign In</Button>
    )
}

export default SignIn;