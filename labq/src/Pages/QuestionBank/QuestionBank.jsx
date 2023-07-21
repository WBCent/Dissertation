import { Container } from "material";
import { useEffect } from "react";
import { useState } from "react";


let questions;

const QuestionBank = () => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function questionBank() {
            await getQuestions();
            setLoading(false)
        }
        questionBank();
    })

    const getQuestions = async () => {
        let questionsjson = await fetch("http://localhost:5000/retrieveBankQuestions")
        questions = await questionsjson.json()
        console.log(questions)
    }


    return (
        <Container>
            {loading == false ? (questions.map((obj) => (
                <article
                className="grid-cols-2 grid-rows-4 outline shadow-lg rounded-lg pl-10 pr-10 pt-4 pb-4"
                >
                    <div className="row-span-1">
              <div className="grid-cols-1">
                <p>
                  <strong>Module Code: {obj.bank_module}</strong>
                </p>
              </div>
              <div>
                <p>
                    {obj.bank_question}
                </p>
              </div>
              <div>
                <p>
                    {obj.bank_answer}
                </p>
              </div>
              </div>
                    </article>
            ))) : (<></>)}
        </Container>
    )
}

export default QuestionBank;