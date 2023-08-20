import { TextField, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { useState } from "react";
import Comments from "../../../Context/Comment";




const EditComment = ({comment, questionID}) => {
    console.log("THis is the question ID", questionID)
    const [editedCommentValues, setEditedCommentValues] = useState(comment)
    let {setQSComment, setQSEditComment} = useContext(Comments)

    const handleInputChange = (e) => {
        const { name, value } = e.target; //get the name and value from the input that has been changed
        console.log("changing", name, value);
        setEditedCommentValues(value); //set all the other form values to their previous value, and the new one to the changed value
      };
    
      const isValid = () => {
        //all inputs must be filled in
        let valid = editedCommentValues && editedCommentValues.trim() != "";
        return valid;
      };

    const submitEditedComment = async () => {
        console.log(editedCommentValues)
        let test = {
            question_id: questionID,
            main_comment: editedCommentValues
        }
        setQSComment([test])
        console.log(test)
        let submitjson = await fetch('/submiteditedcomment', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(test)
        })
        let response = await submitjson.json();
        console.log(response);
        setQSEditComment(false)
    }

    return (
        <>
          <Typography variant="subtitle1">Edit Your Comment:</Typography>
          <TextField
            fullWidth
            id="comment"
            name="comment"
            sx={{mt: 1}}
            value={editedCommentValues}
            onChange={handleInputChange}
            error={!isValid("comment")}
          />
          <Button variant="contained" sx={{mt: 1}} onClick={submitEditedComment}>Submit Edited Comment</Button>
        </>
      );
}

export default EditComment;