import { Button } from "@mui/material"
import { useContext } from "react"
import authAccess from "../../../Context/auth-access"

let user = {
    username: ''
}


const SendAnotherQuestion = () => {
    let {accessToken, setAccessToken, username, setUsername, kid, setKid} = useContext(authAccess)

    const isAllClosed = async() => { 
        console.log(username)
        user.username = username
        let QuestionOpenJson = await fetch('http://localhost:5000/openOrClosed', {
            headers: {
                'Content-Type': 'application/json'
            },    
        
            method: 'POST',
            body: JSON.stringify(user)
        });
        console.log(QuestionOpenJson);
        let QuestionOpen = await QuestionOpenJson.json();
        console.log(QuestionOpen);
    }

    const hope = async() => {
        await isAllClosed()
    }

    hope()

    return (
        <p>This is where the question will go</p>
        // { isAllClosed ? (<Button variant = "contained" onClick = {} > Start a New Question</Button>) : (<p></p>)}
    )
}

export default SendAnotherQuestion