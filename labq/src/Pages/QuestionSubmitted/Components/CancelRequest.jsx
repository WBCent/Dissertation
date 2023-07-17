import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import { TextField, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ModalStatus from "../../../Context/ModalOpenOrClosed";
import { useContext, useState } from "react";

let requestCancellation = {
  question_id: "",
  reason: ""
};

const CancelRequest = ({questionID, open}) => {
  requestCancellation.question_id = questionID;
  const[reason, setReason] = useState(requestCancellation);
  console.log(questionID)
  let openModal = open[0]
  let setOpen = open[1]
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

  const isValid = (name) => {
    //all inputs must be filled in
    let valid = reason[reason] && reason[reason].trim() != "";
    return valid;
  };

  const cancelRequest = async () => {
    requestCancellation.reason = reason.reason;
    console.log(requestCancellation)
    let sendCancellation = await fetch('http://localhost:5000/cancelrequest', {
      method: 'PUT',
      body: JSON.stringify(requestCancellation),
      headers: {
        "Content-Type": "application/json"
      }
    })
    let response = await sendCancellation.json()
    console.log(response);
    let switchDB = await fetch('http://localhost:5000/onclose', {
      method: 'PUT',
      body: JSON.stringify(requestCancellation),
      headers: {
        "Content-Type": "application/json"
      }
    })
    let success = switchDB.json();
    console.log(success);
    setOpenOrClosed(false);
  };

  const closeModal = () => {
    setOpen(false)
  }

  return (
    <Modal open={openModal} onClose={closeModal}>
      <Box sx={style}>
        <h1>Cancel Your Request</h1>
        <p>
          <strong>What is the reason for cancellation</strong>
        </p>
        <TextField
          id="reason"
          name="reason"
          value={reason.reason}
          onChange={handleInputChange}
          error={!isValid("CancelRequest")}
        />
        <Button variant="contained" onClick={cancelRequest}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default CancelRequest;
