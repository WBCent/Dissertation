import { Container, Button, Divider, TextField } from "@mui/material";
import { useContext } from "react";
import { useState, useEffect } from "react";
import solution from "../../Context/Solutions";

let solution_attached = {
  question_id: '',
  solution: ''
}

const PreviousQuestions = () => {
  const [retrievedQuestion, setRetrievedQuestion] = useState(null);
  const [formValues, setFormValues] = useState(solution_attached);
  let { solutionOpen, setSolutionStatus } = useContext(solution)
  useEffect(() => {
    retrievePreviousQuestions();
  }, []);
  const retrievePreviousQuestions = async () => {
    try {
      const questions = await fetch("http://localhost:5000/retrievequestions");
      const returnedQuestions = await questions.json();
      console.log(returnedQuestions);
      setRetrievedQuestion(returnedQuestions);
    } catch (err) {
      console.log(err);
    }
  };

  const openSolutionPortal = () => {
    setSolutionStatus(true)
  }


  const sendSolution = async () => {
    console.log(solution_attached)
    try {
      const sending = await fetch("http://localhost:5000/addsolution", {
        method: 'PUT',
        body: JSON.stringify(solution_attached)
      })
      const response = await sending.json();
      console.log(response);
    } catch (err) {
      console.log(err)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target; //get the name and value from the input that has been changed
    console.log("changing", name, value);
    setFormValues({ ...formValues, [name]: value }); //set all the other form values to their previous value, and the new one to the changed value
  };

  const isValid = (name) => {
    //all inputs must be filled in
    let valid = formValues[name] && formValues[name].trim() != "";
    //some inputs have additional validation
    if (name == "location" && valid) {
      valid = formValues[name].substring(0, 2).toLowerCase() == "pc";
    }
    return valid;
  };







  return (
    <Container>
      <Button onClick={retrievePreviousQuestions}>Retrieve Q's</Button>
      {retrievedQuestion ? (
        retrievedQuestion.retrieved.map((obj) => (
          <article className="grid-cols-2 grid-rows-4 outline shadow-lg rounded-lg pl-10 pr-10 pt-4 pb-4" key={obj.question_id}>
            <div className="row-span-1">
              <div className="grid-cols-1">
                <p>
                  <strong>{obj.module}</strong>
                </p>
              </div>
              <div className="grid-cols-1">
                <h4>{obj.practical}</h4>
              </div>
            </div>
            <div className="row-span-2 cols-span-2">{obj.problem}</div>
            <Divider />
            <div className="row-span-1 cols-span-1 place-content-end">
              {obj.pc_location}
            </div>
            <Button variant="contained" onClick={openSolutionPortal}>Add Solution</Button>
            {solutionOpen ? (<><p><strong>Add a Solution</strong></p><TextField fullWidth id="solution" name="solution" value={solution_attached.solution} onChange={handleInputChange} error={!isValid("solution")} /><Button variant="contained" onClick={sendSolution}>Submit Solution</Button></>) : (<></>)}
          </article>
        ))
      ) : (
        <p>loading</p>
      )}
    </Container>
  );
};

export default PreviousQuestions;
