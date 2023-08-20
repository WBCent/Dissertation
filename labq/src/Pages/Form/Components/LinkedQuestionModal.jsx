import { Modal, Typography, Box, Container } from "@mui/material"
import { useEffect } from "react";
import { useState } from "react";




const LinkedQuestionModal = ({open, question_id}) => {
    const [linkedQuestion, setLinkedQuestion] = useState({})
    const [loading, setLoading] = useState(true)
    let linkedQuestionModalStatus = open[0]
    let setLinkedQuestionModalStatus = open[1]

    console.log("Modal linked question ID passed down", question_id)


    useEffect(() => {
        setLoading(true)
        fetchLinkedQuestion()
        setLoading(false)
    }, [question_id, linkedQuestionModalStatus])

    const fetchLinkedQuestion = async () => {
        if(question_id != 'N/A') {
            let jsonFetched = await fetch('/retrieveLinkedPractical', {
                headers: {
                    "Content-Type": "application/json",
                },
                method: 'POST',
                body: JSON.stringify({question_id})
            });
            let response = await jsonFetched.json();
            console.log("This is the response for the modal", response)
            setLinkedQuestion(response[0])
        } else {
            return;
        }
        
    }

    const closeModal = () => {
        setLinkedQuestionModalStatus(false)
    }

    //Taken from  https://mui.com/material-ui/react-modal/
    const style = {
        position: "absolute",
        top: "20%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
        width: '60%',
        borderRadius: 5
    };
    //end of taken from.

    return (
        <Modal open={linkedQuestionModalStatus} onClose={closeModal}>
            {loading == false ? (                
            <Box sx={style}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>{linkedQuestion.problem_title}</Typography>
                <Typography>Problem Description: {linkedQuestion.problem}</Typography>
                <Typography>Solution: {linkedQuestion.solution == 'null' ? (<><strong>There is no solution on this question.</strong></>) : (<>Solution: {`${linkedQuestion.solution}`}</>)}</Typography>
                </Box>) : <p>Loading...</p> }
        </Modal>
    )
}

export default LinkedQuestionModal