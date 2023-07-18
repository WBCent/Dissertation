import React, { useState } from "react";
import { Container, Box, TextField, Select, MenuItem, Button } from "@mui/material";

let questionBankQA = {
    title: '',
    moduleCode: '',
    solution: ''
}


const QuestionBankStaff = () => {
    const [questionValues, setQuestionValues] = useState(questionBankQA);

    const handleInputChange = (e) => {
        const { name, value } = e.target; //get the name and value from the input that has been changed
        console.log("changing", name, value);
        setQuestionValues({ ...questionValues, [name]: value }); //set all the other form values to their previous value, and the new one to the changed value
    };

    const isValid = (name) => {
        //all inputs must be filled in
        let valid = questionValues[name] && questionValues[name].trim() != "";
        return valid;
    };

    const sendToQuestionBank = async() => {
        try{
            let FAQsent = await fetch('http://localhost:5000/savetoquestionbank', {
                method: 'POST',
                body: JSON.stringify(questionValues),
                headers: {
                    "Content-Type": "application/json",
                  },
            })
            let response = await FAQsent.json();
            console.log(response);
        } catch(err) {
            console.log(err)
        }
    }


    return (
        <><h1>This is where staff can fill in the question bank</h1><Container>
            <Box component="form">
                <TextField
                    id="title"
                    name="title"
                    fullWidth
                    value={questionValues.title}
                    onChange={handleInputChange}
                    error={!isValid("title")}
                />
                <Select
                    id="moduleCode"
                    name="moduleCode"
                    fullWidth
                    label="Select a module code"
                    value={questionValues.moduleCode}
                    error={!isValid("moduleCode")}
                    onChange={handleInputChange}
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
                <TextField
                    id="solution"
                    name="solution"
                    fullWidth
                    value={questionValues.solution}
                    onChange={handleInputChange}
                    error={!isValid("solution")}

                />

                <Button onClick={sendToQuestionBank}>Save Question</Button>
            </Box>
        </Container></>

    )
}

export default QuestionBankStaff;