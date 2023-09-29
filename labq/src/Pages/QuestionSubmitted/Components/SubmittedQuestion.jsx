import { Divider, Button, TextField, Typography } from "@mui/material";
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
import authAccess from "../../../Context/auth-access";
import questionSync from "../../../Context/QuestionSync";
import Comments from "../../../Context/Comment";
import EditComment from "./EditComment";
import AddCommentIcon from '@mui/icons-material/AddComment';
import RateReviewIcon from '@mui/icons-material/RateReview';

let justAskedValues = {
  question_id: "",
  moduleCode: "",
  practical: "",
  linkedPractical: "",
  title: "",
  problem: "",
  location: "",
  username: "",
  date: null,
  time: "",
  place_in_queue: '',
};

let linkedPracticalTitle = [{}];

const SubmittedQuestion = () => {
  const [comment, setComment] = useState(false);
  const [open, setOpen] = useState(false);
  let { questionSub, setQuestionSub } = useContext(questionSync);
  
  let {
    qscomment,
    setQSComment,
    qscommentexists,
    setQSCommentExists,
    qsEditComment,
    setQSEditComment,
  } = useContext(Comments);

  let {
    editOpen,
    setEditOpen,
    loadingEdit,
    setLoadingEdit,
    loadingRetrieveEdit,
    setLoadingRetrieveEdit,
  } = useContext(edit);
  let {
    accessToken,
    setAccessToken,
    username,
    setUsername,
    kid,
    setKid,
    loading,
    setLoading,
  } = useContext(authAccess);

  useEffect(() => {
    console.log(username);
    if (username != "") {
      retrieveJustAsked(true);
    }
  }, [username, loading]);

  //On editopen variable change action this function





  const retrieveJustAsked = async (force) => {
    console.log("this is now working");
    console.log(loadingEdit, loadingRetrieveEdit);
    if (
      (loadingEdit == true && loadingRetrieveEdit == false) ||
      force == true
    ) {
      try {
        let justAsked = await fetch("http://localhost:5000/retrievejustasked", {
          method: "POST",
          body: JSON.stringify({ username }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        let response = await justAsked.json();
        console.log(response);
        if (response.retrieve != []) {
          justAskedValues.question_id = response.retrieve[0].question_id;
          justAskedValues.moduleCode = response.retrieve[0].module;
          justAskedValues.practical = response.retrieve[0].practical;
          justAskedValues.linkedPractical =
            response.retrieve[0].linked_question_id;

          justAskedValues.title = response.retrieve[0].problem_title;
          justAskedValues.problem = response.retrieve[0].problem;
          justAskedValues.location = response.retrieve[0].pc_location;
          justAskedValues.username = response.retrieve[0].username;
          justAskedValues.time = response.retrieve[0].question_time;
          justAskedValues.date = response.retrieve[0].question_date;
          justAskedValues.place_in_queue = response.retrieve[0].place_in_queue
          let test = response.retrieve[0].linked_question_id;
          try{
            let commentsjson = await fetch("/fetchcomments", {
              method: "POST",
              body: JSON.stringify([justAskedValues.question_id]),
              headers: {
                "Content-Type": "application/json"
              }
            })
            let comments = await commentsjson.json();
            console.log(comments)
            if(comments[0] !== undefined) {
              setQSCommentExists(true)
            } else {
              setQSCommentExists(false)
            }
            setQSComment(comments)
          } catch(err) {
            console.log(err)
          }
          console.log(test);
          if (test != "N/A") {
            let titlejson = await fetch(
              "http://localhost:5000/linkedpracticaltitle",
              {
                method: "POST",
                body: JSON.stringify({ test }),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            let title = await titlejson.json();
            console.log(title);
            linkedPracticalTitle = title;
            setLoadingEdit(false);
            setQuestionSub(true);
          } else {
            linkedPracticalTitle = [{ problem_title: "N/A" }];
            setLoadingEdit(false);
            setQuestionSub(true);
          }
          // console.log(justAskedValues)
          return justAskedValues;
        } else {
          setQuestionSub(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const editPageRedirect = () => {
    setEditOpen(true);
  };

  const OpenModal = () => {
    setOpen(true);
  };

  const addComment = () => {
    setComment(true);
  };
  const editComment = () => {
    setQSEditComment(true);
  };
  console.log(qscomment)


  return (
    <>
      {questionSub == true ? (
        editOpen == false && loadingEdit == false ? (
          <>
            <article className="grid-cols-2 grid-rows-4 outline shadow-lg rounded-lg pl-10 pr-10 pt-4 pb-4 mt-4">
              <div className="row-span-1">
                <div className="grid-cols-1 mb-2">
                  <Typography variant="h5" className="text-center">
                    <strong>{justAskedValues.title}</strong>
                  </Typography>
                </div>
                <div className="grid-cols-1">
                  <p>
                    Module Code: {justAskedValues.moduleCode}
                  </p>
                </div>
                <div className="grid-cols-1">
                  <h4>
                    Practical: {justAskedValues.practical}
                  </h4>
                </div>
                <div className="grid-cols-1">
                  <h4>
                    Linked Practical:  
                    {linkedPracticalTitle[0].problem_title == undefined ? (
                      <> N/A</>
                    ) : (
                      <> {linkedPracticalTitle[0].problem_title}</>
                    )}
                  </h4>
                </div>
              </div>
              <div className="row-span-2 cols-span-2">
                <strong>Description:</strong> {justAskedValues.problem}
              </div>
              <Divider sx={{m:2, borderBottomWidth: 3}} />
              <div className="row-span-1 cols-span-1 place-content-end">
                PC Location: {justAskedValues.location}
              </div>
              <div className="row-span-1 cols-span-1 place-content-end">
                Question Submitted at: {justAskedValues.time} on the{" "}
                {justAskedValues.date}
              </div>
              {qscommentexists == true ? (
                <>
                  <p><strong>Comment: </strong>{qscomment[0].main_comment}</p> 
                </>
              ) : (
                <></>
              )}
              <div className="flex justify-between mt-2">
              <Button variant="contained" onClick={editPageRedirect}>
                <EditIcon sx={{mr: 1}} /><p>Edit Request</p>
              </Button>
              {qscommentexists == true ? (
                <>
                  <Button variant="contained" onClick={editComment}>
                  <RateReviewIcon sx={{mr: 1}} /><p>Edit Comment</p>
                  </Button>
                </>
              ) : (
                <>
                  {" "}
                  <Button variant="contained" onClick={addComment}>
                    <AddCommentIcon sx={{mr: 1}} /><p>Add Comment</p>
                  </Button>
                </>
              )}
              <Button variant="contained" color="error" onClick={OpenModal}>
                <CancelIcon sx={{mr: 1}} /><p>Cancel Request</p>
              </Button>
              </div>
              <CancelRequest
                questionID={justAskedValues.question_id}
                place_in_queue={justAskedValues.place_in_queue}
                open={[open, setOpen]}
              /><br />
              {qsEditComment == true ? <EditComment comment={qscomment[0].main_comment} questionID={justAskedValues.question_id} /> : <></>}

              {comment ? (
                <AddComment comment={[comment, setComment]} questionID={justAskedValues.question_id} />
              ) : (
                <></>
              )}
            </article>
          </>
        ) : (
          <EditSubmittedQuestion
            onClick={() => {
              setLoadingEdit(true);
            }}
            values={justAskedValues}
            retrieveJustAsked={retrieveJustAsked}
          />
        )
      ) : (
        <article className="grid-cols-2 grid-rows-4 outline outline-red-500 shadow-lg rounded-lg pl-10 pr-10 pt-4 pb-4 mt-5">
        <p className="text-center text-red-500"><strong>You have not yet submitted a question. Please submit a question on the Question Form page.</strong></p>
      </article>
      )}
    </>
  );
};

export default SubmittedQuestion;
