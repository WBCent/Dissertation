import { Button } from "@mui/material";
import Modal from '@mui/material/Modal';
import {TextField, Box} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ModalStatus from "../../../Context/ModalOpenOrClosed";
import { useContext } from "react";
const CancelRequest = () => {
    let {openOrClosed, setOpenOrClosed} = useContext(ModalStatus)
    //Taken from  https://mui.com/material-ui/react-modal/
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    //end of taken from.

    const cancelRequest = async() => {

    }

  return (

    <Modal open={openOrClosed}>
      <Box sx={style}>
        <CloseIcon  />
        <h1>Cancel Your Request</h1>
        <p>
          <strong>What is the reason for cancellation</strong>
        </p>
        <TextField></TextField>
        <Button variant="contained" onClick={cancelRequest} >Submit</Button>
      </Box>
    </Modal>
  );
};

export default CancelRequest;
