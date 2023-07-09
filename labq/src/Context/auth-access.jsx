import React from "react";
//https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component
const authAccess = React.createContext({
    accessToken: '',
    setAccessToken: (value) => { accessToken = value },
    username: '',
    setUsername: (value) => { username = value},
    kid: '',
    setKid: (value) => { username = value }
});

export default authAccess