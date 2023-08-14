import { Button, TextField } from "@mui/material";
import { useContext } from "react";
import { useState } from "react";
import Comments from "../../../Context/Comment";
import edit from "../../../Context/edit";
import { useEffect } from "react";


let commentBase = {
    main_comment: "",
    question_id: ''
}


const AddComment = ({comment, questionID}) => {
    let setComment = comment[1]
    console.log("questionID", comment)
    console.log("questionID", questionID)
    commentBase.question_id = questionID;
    const [addedComment, setAddedComment] = useState(commentBase);
    let {qscomment, setQSComment, qscommentexists, setQSCommentExists} = useContext(Comments)
    let {setLoadingEdit} = useContext(edit)
    const handleInputChange = (e) => {
      const { name, value } = e.target; //get the name and value from the input that has been changed
      console.log("changing", name, value);
      setAddedComment({ ...addedComment, ["main_comment"]: value }); //set all the other form values to their previous value, and the new one to the changed value
    };
  
    const isValid = (name) => {
      //all inputs must be filled in
      let valid = addedComment[name] && addedComment[name].trim() != "";
      return valid;
    };


    const submitComment = async () => {
        console.log(addedComment)
        console.log("QS Comment", qscomment)
        setAddedComment({ ...addedComment, ["question_id"]: questionID });
        setQSComment([addedComment])
        let sendComment = await fetch('/cslabs/savecomment', {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify(addedComment)
        })
        let response = await sendComment.json();
        console.log(response)
        setQSCommentExists(true)
        setComment(false)
    }



  return (
    <>
      <p>Add a Comment</p>
      <TextField
        fullWidth
        id="main_comment"
        name="main_comment"
        value={addedComment.main_comment}
        onChange={handleInputChange}
        error={!isValid("main_comment")}
      />
      <Button onClick={submitComment}>Submit Comment</Button>
    </>
  );
};

export default AddComment;
