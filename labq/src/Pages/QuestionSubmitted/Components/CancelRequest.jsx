import { Button, FormControlLabel, RadioGroup } from "@mui/material";
import Modal from "@mui/material/Modal";
import { TextField, Box, Radio } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ModalStatus from "../../../Context/ModalOpenOrClosed";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Comments from "../../../Context/Comment";
import questionSync from "../../../Context/QuestionSync";
import { useEffect } from "react";

let requestCancellation = {
  question_id: "",
  reason: "",
};

let requestSolved = {
  question_id: "",
  solution: "",
};

const CancelRequest = ({ questionID, open }) => {
  console.log("question ID", questionID)
  requestCancellation.question_id = questionID;
  const [reason, setReason] = useState(requestCancellation);
  const [solved, setSolved] = useState(requestSolved);
  const [cancel, setCancel] = useState(true);
  let { questionSub, setQuestionSub } = useContext(questionSync);
  let {setQSCommentExists} = useContext(Comments)
  let navigate = useNavigate();
  console.log(questionID);
  let openModal = open[0];
  let setOpen = open[1];
  //Taken from  https://mui.com/material-ui/react-modal/
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  //end of taken from.

  useEffect(() => {
    setSolved({ ...solved, ['question_id']: questionID });
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target; //get the name and value from the input that has been changed
    console.log("changing", name, value);
    setReason({ ...reason, [name]: value }); //set all the other form values to their previous value, and the new one to the changed value
  };

  const isValid = (name) => {
    //all inputs must be filled in
    let valid = reason[reason] && reason[reason].trim() != "";
    return valid;
  };

  const isValidsolution = () => {
    //all inputs must be filled in
    let valid = solved["solution"] && solved["solution"].trim() != "";
    return valid;
  };

  const handleInputChangeSolution = (e) => {
    const { name, value } = e.target;
    console.log("changing", name, value);
    setSolved({ ...solved, ["solution"]: value });
  };

  const solvedRequest = async () => {
    console.log(solved)
    let sendSolvedjson = await fetch("/solvedrequest", {
      method:'PUT',
      body: JSON.stringify(solved),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    let sendSolved = await sendSolvedjson.json();
    console.log(sendSolved)
    setQSCommentExists(false)
    setQuestionSub(false)    
    return navigate("/cslabs/previousquestions")
  };

  const cancelRequest = async () => {
    requestCancellation.reason = reason.reason;
    console.log(requestCancellation);
    let sendCancellation = await fetch("http://localhost:5000/cancelrequest", {
      method: "PUT",
      body: JSON.stringify(requestCancellation),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let response = await sendCancellation.json();
    console.log("First response", response);
    let switchDB = await fetch("http://localhost:5000/onclose", {
      method: "PUT",
      body: JSON.stringify(requestCancellation),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let success = await switchDB.json();
    console.log("Success", success.success);
    setQuestionSub(false)
    setQSCommentExists(false)
    return navigate("/cslabs/previousquestions")
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleRadioChange = (e) => {
    console.log(e.target.value);
    setCancel(!cancel);
  };

  return (
    <Modal open={openModal} onClose={closeModal}>
      <Box sx={style}>
        <h1>Cancel Your Request</h1>
        <p>What is the reason for cancellation</p>
        <RadioGroup
          defaultValue="cancel"
          value={cancel}
          onChange={handleRadioChange}
          row
        >
          <FormControlLabel
            value={true}
            control={<Radio />}
            label="Cancel Request"
          />
          <FormControlLabel value={false} control={<Radio />} label="Solved" />
        </RadioGroup>
        {cancel == true ? (
          <>
            <p>
              <strong>What is the reason for cancellation</strong>
            </p>
            <TextField
              id="reason"
              name="reason"
              value={reason.reason}
              onChange={handleInputChange}
              error={!isValid("reason")}
            />
            <Button variant="contained" onClick={cancelRequest}>
              Submit
            </Button>
          </>
        ) : (
          <>
            <p>
              <strong>What was the solution to your problem?</strong>
            </p>
            <TextField
              id="solution"
              name="solution"
              value={solved.solution}
              onChange={handleInputChangeSolution}
              error={!isValidsolution("solution")}
            />
            <Button variant="contained" onClick={solvedRequest}>
              {" "}
              Cancel Request and Submit Solution
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default CancelRequest;
