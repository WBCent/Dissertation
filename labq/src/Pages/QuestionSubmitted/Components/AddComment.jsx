import { Button, TextField } from "@mui/material";
import { useState } from "react";


let comment = {
    comment: "",
    question_id: ''
}


const AddComment = ({questionID}) => {
    comment.question_id = questionID;
    const [addedComment, setAddedComment] = useState(comment);
    const handleInputChange = (e) => {
      const { name, value } = e.target; //get the name and value from the input that has been changed
      console.log("changing", name, value);
      setAddedComment({ ...addedComment, ["comment"]: value }); //set all the other form values to their previous value, and the new one to the changed value
    };
  
    const isValid = (name) => {
      //all inputs must be filled in
      let valid = addedComment[name] && addedComment[name].trim() != "";
      return valid;
    };

    const submitComment = async () => {
        console.log(addedComment)
        let sendComment = await fetch('http://localhost:5000/savecomment', {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify(addedComment)
        })
        let response = await sendComment.json()
        console.log(response)
    }



  return (
    <>
      <p>Add a Comment</p>
      <TextField
        fullWidth
        id="comment"
        name="comment"
        value={addedComment.comment}
        onChange={handleInputChange}
        error={!isValid("comment")}
      />
      <Button onClick={submitComment}>Submit Comment</Button>
    </>
  );
};

export default AddComment;
