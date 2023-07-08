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
    let {accessToken, setAccessToken, username, setUsername, kid, setKid} = useContext(authAccess)
    // console.log(accessToken, setAccessToken, username, setUsername)
    //Xu:
      const handleLogin = useCallback(async () => {
        if (!isAuthenticated) {
            // console.log('this works')
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
        let jsonToken = await getAccessToken()
        let please = jose.decodeJwt(jsonToken.accessToken)
        let header = jose.decodeProtectedHeader(jsonToken.accessToken)
        let signature = jsonToken.signature
        // let header = jose.decodeProtectedHeader(jsonToken);
        setKid(header.kid);
        let username = jsonToken.account.username
        let AccessToken = jsonToken.accessToken
        // console.log(AccessToken)
        accessToken = AccessToken;
        username = username
        setAccessToken(AccessToken);
        // console.log(accessToken);
        setUsername(username)
    }

    const validateToken = async () => {
        // let jsonvalidate = await fetch('https://login.microsoftonline.com/common/discovery/v2.0/keys');
        // let validateToken = await jsonvalidate.json();
        // let JWKS = jose.createRemoteJWKSet(new URL('https://login.microsoftonline.com/common/discovery/v2.0/keys'))
        // console.log(JWKS)
        // console.log(validateToken);
        //         let {payload, header} = await jose.jwtVerify(accessToken, JWKS)
        //         return payload, header;
        return true;
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