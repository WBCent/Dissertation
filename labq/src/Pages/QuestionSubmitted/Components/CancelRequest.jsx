import { Button, FormControlLabel, RadioGroup, Typography } from "@mui/material";
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
  place_in_queue: ''
};

let requestSolved = {
  question_id: "",
  solution: "",
  place_in_queue: ''
};

const CancelRequest = ({ questionID, place_in_queue, open }) => {
  console.log("question ID", questionID)
  console.log("This should be the place in queue", place_in_queue)
  requestCancellation.question_id = questionID;
  requestCancellation.place_in_queue = place_in_queue;
  requestSolved.question_id = questionID;
  requestSolved.place_in_queue = place_in_queue;
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




  const handleInputChange = (e) => {
    const { name, value } = e.target; //get the name and value from the input that has been changed
    console.log("changing", name, value);
    setReason({ ...reason, [name]: value }); //set all the other form values to their previous value, and the new one to the changed value
  };

  const isValid = () => {
    //all inputs must be filled in
    let valid = reason['reason'] && reason['reason'].trim() != "";
    return valid;
  };

  const isValidsolution = () => {
    //all inputs must be filled in
    let valid = solved["solution"] && solved["solution"].trim() != "";
    return valid;
  };

  const reset = () => {
    setReason(requestCancellation); //set all form values to their default value
  };

  const resetSolution = () => {
    setSolved(requestSolved); //set all form values to their default value
  };



  const handleInputChangeSolution = (e) => {
    const { name, value } = e.target;
    console.log("changing", name, value);
    setSolved({ ...solved, ["solution"]: value });
  };

  const solvedRequest = async () => {
    setSolved({ ...solved, ['question_id']: questionID });
    setSolved({...solved, ['place_in_queue']: place_in_queue})
    console.log(solved)
    let sendSolvedjson = await fetch("http://localhost:5000/solvedrequest", {
      method:'PUT',
      body: JSON.stringify(solved),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    let sendSolved = await sendSolvedjson.json();
    console.log(sendSolved)
    resetSolution();
    setQSCommentExists(false)
    setQuestionSub(false)    
    console.log("This is solved", solved)
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
    reset();
    return navigate("/cslabs/previousquestions")
  };

  const closeModal = () => {
    // reset();
    // resetSolution();
    setOpen(false);
  };

  const handleRadioChange = (e) => {
    console.log(e.target.value);
    setCancel(!cancel);
  };

  return (
    <Modal open={openModal} onClose={closeModal}>
      <Box sx={style}>
        <Typography variant="h6" sx={{fontWeight: 'bold', textAlign: 'center'}}>Cancel Your Request</Typography>
        <p>Do you want to Cancel or Solve your request</p>
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
              sx={{mt: 2, mb: 2}}
              multiline={true}
              rows={5}
              fullWidth
            />
            <Button variant="contained" onClick={cancelRequest} fullWidth color="error">
              Cancel Request
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
              multiline={true}
              rows={5}
              fullWidth
              sx={{mt: 2, mb: 2}}
            />
            <Button color="success" fullWidth variant="contained" onClick={solvedRequest}>
              {" "}
              Solve Request
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default CancelRequest;
