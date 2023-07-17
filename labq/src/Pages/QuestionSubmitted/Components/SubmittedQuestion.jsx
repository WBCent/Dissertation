import { Divider, Button, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EditSubmittedQuestion from "./EditSubmittedQuestion";
import { useState } from "react";
import { useEffect, useContext } from "react";
import CancelRequest from "./CancelRequest";
import CancelIcon from "@mui/icons-material/Cancel";
import ModalStatus from "../../../Context/ModalOpenOrClosed";
import edit from "../../../Context/edit";
import { useLayoutEffect } from "react";
import AddComment from "./AddComment";

let justAskedValues = {
    question_id: "",
    moduleCode: "",
    practical: "",
    linkedPractical: "",
    title: "",
    problem: "",
    location: "",
    username: "",
    date: null
}




const SubmittedQuestion = () => {
  const [comment, setComment] = useState(false);
  const [open, setOpen] = useState(false)
  let { openOrClosed, setOpenOrClosed } = useContext(ModalStatus);
  let {editOpen, setEditOpen, loadingEdit, setLoadingEdit, loadingRetrieveEdit, setLoadingRetrieveEdit} = useContext(edit)


  useEffect(() => {
    retrieveJustAsked()
  })

  //On editopen variable change action this function


  const retrieveJustAsked = async (force) => {
    if(loadingEdit == true && loadingRetrieveEdit == false || force == true) {
      let justAsked = await fetch("http://localhost:5000/retrievejustasked");
      let response = await justAsked.json();
      console.log(response);
      justAskedValues.question_id = response.retrieve[0].question_id
      justAskedValues.moduleCode = response.retrieve[0].module
      justAskedValues.practical = response.retrieve[0].practical
      justAskedValues.linkedPractical = response.retrieve[0].linked_question_id
      justAskedValues.title = response.retrieve[0].problem_title
      justAskedValues.problem = response.retrieve[0].problem
      justAskedValues.location = response.retrieve[0].pc_location
      justAskedValues.username = response.retrieve[0].username
      justAskedValues.date = response.retrieve[0].question_time
      // console.log(justAskedValues)
      setLoadingEdit(false)
      return justAskedValues;
    }
  };




  const editPageRedirect = () => {
    setEditOpen(true);
  };


  const OpenModal = () => {
    setOpen(true);
  };

  const addComment = () => {
    setComment(true)
  };

  const sendComment = async() => {

  }

  return (
    <>
      {editOpen == false && loadingEdit == false ? (
        <>
          <article className="grid-cols-2 grid-rows-4 outline shadow-lg rounded-lg pl-10 pr-10 pt-4 pb-4">
            <div className="row-span-1">
              <div className="grid-cols-1">
                <p>
                  <strong>Module Code: {justAskedValues.moduleCode}</strong>
                </p>
              </div>
              <div className="grid-cols-1">
                <h4>Question title: <strong>{justAskedValues.title}</strong></h4>
              </div>
              <div className="grid-cols-1">
                <h4>In relation to the following practical: {justAskedValues.practical}</h4>
              </div>
            </div>
            <div className="row-span-2 cols-span-2">Problem Explanation: {justAskedValues.problem}</div>
            <Divider />
            <div className="row-span-1 cols-span-1 place-content-end">
              {justAskedValues.location}
            </div>
            <div className="row-span-1 cols-span-1 place-content-end">
              {justAskedValues.date}
            </div>
            <Button variant="contained" onClick={editPageRedirect}>
              <EditIcon />
            </Button>
            <Button variant="Contained" color="Error" onClick={OpenModal}>
              <CancelIcon />
            </Button>
            <Button variant="contained" onClick={addComment}>
              Add Comment
            </Button>
            <CancelRequest questionID={justAskedValues.question_id} open={[open, setOpen]} />
            {comment ? (<AddComment questionID={justAskedValues.question_id} />) : (<></>)}
          </article>
        </>
      ) : (
        <EditSubmittedQuestion onClick={() => {setLoadingEdit(true)}} values={justAskedValues} retrieveJustAsked={retrieveJustAsked} />
      )}
    </>
  );
};

export default SubmittedQuestion;
