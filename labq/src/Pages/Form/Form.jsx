import React from "react";
import Question from './Components/Question';
import { useContext } from "react";
import authAccess from "../../Context/auth-access";

const Form = () => {
    let auth = useContext(authAccess)
    console.log(auth)
    return (
        <>
            <Question />
        </>
    )
}

export default Form;
//npm install @mui/material @emotion/react @emotion/styled