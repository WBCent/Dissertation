import { Container, Button, Divider } from "@mui/material";
import { useState, useEffect } from "react";


const PreviousQuestions = () => {
    const [retrievedQuestion, setRetrievedQuestion] = useState(null);

    useEffect(()  => {
        retrievePreviousQuestions();
    }, []);
    
    const retrievePreviousQuestions = async() => {
        try {
            const questions = await fetch('http://localhost:5000/retrievequestions');
            const returnedQuestions = await questions.json();
            setRetrievedQuestion(returnedQuestions);
        } catch(err) {
            console.log(err);
        }
                
    }

    return (
        <Container>
            <Button onClick={retrievePreviousQuestions}>Retrieve Q's</Button>
            <article className="grid-cols-2 grid-rows-4 outline shadow-lg rounded-lg pl-10 pr-10 pt-4 pb-4">
                {retrievedQuestion ? (<><div className="row-span-1">
                    <div className="grid-cols-1">
                        <p><strong>{retrievedQuestion.randomQuestion.Module}</strong></p>
                    </div>
                    <div className="grid-cols-1">
                        <h4>{retrievedQuestion.randomQuestion.Practical}</h4>
                    </div>
                </div><div className="row-span-2 cols-span-2">
                        {retrievedQuestion.randomQuestion.Problem}
                    </div><Divider /><div className="row-span-1 cols-span-1 place-content-end">
                        {retrievedQuestion.randomQuestion.location}
                    </div></>) : (
                    <p>Loading</p>
                )}
            </article>
        </Container>
    )
}

export default PreviousQuestions;