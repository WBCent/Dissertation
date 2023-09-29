import { Button, Container } from "@mui/material";
import { useContext } from "react";
import { useEffect, useState } from "react";
import authAccess from "../../../Context/auth-access";

let questions = [];

const StudentQuestions = () => {
  const [loading, setLoading] = useState(true);
  const [solved, setSolved] = useState({});
  const { username } = useContext(authAccess);


  useEffect(() => {
    returnSolved();
  }, [solved])

  useEffect(() => {
    async function he() {
      await retrieveCurrentQuestions();
    }

    he().then(() => {
      setLoading(false);
    });
  }, []);

  const retrieveCurrentQuestions = async () => {
    let questionsjson = await fetch("/cslabs/retrieveqsforteacher");
    questions = await questionsjson.json();
    console.log(questions);
  };

  const returnSolved = async () => {
    console.log("solved", solved);
    let sendSolved = await fetch("/cslabs/solvequestions", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(solved),
      method: "POST",
    });
    let response = await sendSolved.json();
    console.log(response);
  };

  return (
    <Container>
      {loading == false ? (
        questions.map((obj) => (
          <article className="grid-cols-2 grid-rows-4 outline shadow-lg rounded-lg pl-10 pr-10 pt-4 pb-4">
            <p>{obj.problem_title}</p>
            <Button
              name={obj.question_id}
              variant="outlined"
              onClick={async (e) => {
                e.preventDefault();
                const { name } = e.target;
                console.log(name);
                setSolved(
                  {
                    question_id: name,
                    educator_name: username,
                  });
              }}
            >
              Set as Solved
            </Button>
          </article>
        ))
      ) : (
        <p>loading</p>
      )}
    </Container>
  );
};

export default StudentQuestions;
