import { Container } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Select, MenuItem } from "@mui/material";
import { FormLabel } from "react-bootstrap";

let questions;

const QuestionBank = () => {
    const [loading, setLoading] = useState(true)
    const [moduleCode, setModuleCode] = useState('')

    useEffect(() => {
    if(moduleCode != '') {
                getQuestions().then(() => {
            setLoading(false)
        })
    }

    }, [moduleCode])

    const getQuestions = async () => {
        let questionsjson = await fetch("/cslabs/retrieveBankQuestions", {
            method: 'POST',
            body: JSON.stringify({moduleCode}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        questions = await questionsjson.json()
        console.log(questions)
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target; //get the name and value from the input that has been changed
        console.log("changing", name, value);
        setLoading(true)
        setModuleCode(value); //set all the other form values to their previous value, and the new one to the changed value
      };


    return (
        <Container>
          <p class="text-center pt-4"><strong>This is the Question Bank. Your teachers have added FAQs.</strong></p>
          <FormLabel>Please select a Module:</FormLabel>
            <Select
            id="moduleCode"
            name="moduleCode"
            fullWidth
            value={moduleCode}
            onChange={handleInputChange}
            sx={{mt: 1}}
          >
            <MenuItem value={"CS1002"}>CS1002</MenuItem>
            <MenuItem value={"CS1003"}>CS1003</MenuItem>
            <MenuItem value={"CS1006"}>CS1006</MenuItem>
            <MenuItem value={"CS1007"}>CS1007</MenuItem>
            <MenuItem value={"CS2001"}>CS2001</MenuItem>
            <MenuItem value={"CS2101"}>CS2101</MenuItem>
            <MenuItem value={"CS2002"}>CS2002</MenuItem>
            <MenuItem value={"CS2003"}>CS2003</MenuItem>
            <MenuItem value={"CS2006"}>CS2006</MenuItem>
          </Select>
            {loading == false ? (questions.map((obj) => (
                <article
                className="grid-cols-2 grid-rows-4 outline shadow-lg rounded-lg pl-10 pr-10 pt-4 pb-4 mt-4 mb-4"
                >
                    <div className="row-span-1">
              <div className="grid-cols-1">
                <p>
                  <strong>Module Code: {obj.bank_module}</strong>
                </p>
              </div>
              <div>
                <p>
                    <strong>
                       {obj.bank_question} 
                    </strong>
                    
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