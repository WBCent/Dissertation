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
import authAccess from "../../../Context/auth-access";
import questionSync from "../../../Context/QuestionSync";
import Comments from "../../../Context/Comment";
import EditComment from "./EditComment";

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
            <article className="grid-cols-2 grid-rows-4 outline shadow-lg rounded-lg pl-10 pr-10 pt-4 pb-4">
              <div className="row-span-1">
                <div className="grid-cols-1">
                  <p>
                    <strong>Module Code: {justAskedValues.moduleCode}</strong>
                  </p>
                </div>
                <div className="grid-cols-1">
                  <h4>
                    Question title: <strong>{justAskedValues.title}</strong>
                  </h4>
                </div>
                <div className="grid-cols-1">
                  <h4>
                    In relation to the following practical:{" "}
                    {justAskedValues.practical}
                  </h4>
                </div>
                <div className="grid-cols-1">
                  <h4>
                    In relation to the following past questions:
                    {linkedPracticalTitle[0].problem_title == undefined ? (
                      <>N/A</>
                    ) : (
                      <>{linkedPracticalTitle[0].problem_title}</>
                    )}
                  </h4>
                </div>
              </div>
              <div className="row-span-2 cols-span-2">
                Problem Explanation: {justAskedValues.problem}
              </div>
              <div>
                {}
              </div>
              <Divider />
              <div className="row-span-1 cols-span-1 place-content-end">
                PC Location: {justAskedValues.location}
              </div>
              <div className="row-span-1 cols-span-1 place-content-end">
                Question Submitted at: {justAskedValues.time} on the{" "}
                {justAskedValues.date}
              </div>
              {qscommentexists == true ? (
                <>
                  <p>Comment: {qscomment[0].main_comment}</p> 
                </>
              ) : (
                <></>
              )}
              <Button variant="contained" onClick={editPageRedirect}>
                <EditIcon />
              </Button>
              <Button variant="Contained" color="Error" onClick={OpenModal}>
                <CancelIcon />
              </Button>
              {qscommentexists == true ? (
                <>
                  <Button variant="contained" onClick={editComment}>
                    Edit Comment
                  </Button>
                </>
              ) : (
                <>
                  {" "}
                  <Button variant="contained" onClick={addComment}>
                    Add Comment
                  </Button>
                </>
              )}
              <CancelRequest
                questionID={justAskedValues.question_id}
                open={[open, setOpen]}
              />
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
        <p>You have not submitted an open question</p>
      )}
    </>
  );
};

export default SubmittedQuestion;
