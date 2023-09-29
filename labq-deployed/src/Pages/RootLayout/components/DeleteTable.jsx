import { Button } from "@mui/material";
import { useEffect } from "react";
import { json } from "react-router-dom";

const DeleteTable = () => {
    const sendDelete = async() => {
        try{
            let jsonResponse =  await fetch('/cslabs/delete', {
            method: 'DELETE'
        })
        } catch(err) {
            console.log(err)
        }
    }
    
    return (
        <Button variant="outlined" onClick={sendDelete}>Delete Table</Button>
    )
}

export default DeleteTable;