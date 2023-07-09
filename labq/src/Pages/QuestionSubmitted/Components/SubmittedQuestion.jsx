import { Divider, Button, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EditSubmittedQuestion from "./EditSubmittedQuestion";
import { useState } from "react";
import { useEffect, useContext } from "react";
import CancelRequest from "./CancelRequest";
import CancelIcon from "@mui/icons-material/Cancel";
import ModalStatus from "../../../Context/ModalOpenOrClosed";

const SubmittedQuestion = () => {
  const [edit, setEdit] = useState(false);
  const [retrievedModuleCode, setRetrievedModuleCode] = useState(null);
  const [retrievedPractical, setRetrievedPractical] = useState(null);
  const [retrievedProblem, setRetrievedProblem] = useState(null);
  const [retrievedLocation, setRetrievedLocation] = useState(null);
  const [comment, setComment] = useState(false);
  let { openOrClosed, setOpenOrClosed } = useContext(ModalStatus);

  //TODO: link to backend and database

  const retrieveJustAsked = async () => {
    let justAsked = await fetch("http://localhost:5000/retrievejustasked");
    let response = await justAsked.json();
    console.log(response);
    setRetrievedModuleCode(response.retrieve[0].module);
    setRetrievedPractical(response.retrieve[0].practical);
    setRetrievedProblem(response.retrieve[0].problem);
    setRetrievedLocation(response.retrieve[0].pc_location);
  };

  const editPageRedirect = () => {
    setEdit(true);
  };

  useEffect(() => {
    retrieveJustAsked();
  });

  const OpenModal = () => {
    setOpenOrClosed(true);
  };

  const addComment = () => {
    setComment(true)
  };

  const sendComment = async() => {

  }

  return (
    <>
      {edit == false ? (
        <>
          <article className="grid-cols-2 grid-rows-4 outline shadow-lg rounded-lg pl-10 pr-10 pt-4 pb-4">
            <div className="row-span-1">
              <div className="grid-cols-1">
                <p>
                  <strong>{retrievedModuleCode}</strong>
                </p>
              </div>
              <div className="grid-cols-1">
                <h4>{retrievedPractical}</h4>
              </div>
            </div>
            <div className="row-span-2 cols-span-2">{retrievedProblem}</div>
            <Divider />
            <div className="row-span-1 cols-span-1 place-content-end">
              {retrievedLocation}
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
            {openOrClosed ? <CancelRequest /> : <></>}
            {comment ? (<><p><strong>Add a comment</strong></p><TextField></TextField><Button variant="contained" onClick={sendComment}>Submit Comment</Button></>) : (<></>)}
          </article>
        </>
      ) : (
        <EditSubmittedQuestion />
      )}
    </>
  );
};

export default SubmittedQuestion;
