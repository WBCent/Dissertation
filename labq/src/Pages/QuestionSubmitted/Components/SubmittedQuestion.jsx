import { Divider, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EditSubmittedQuestion from "./EditSubmittedQuestion";
import { useState } from "react";


const SubmittedQuestion = () => {
      const [edit, setEdit] = useState(false);

    let retrievedModuleCode = window.sessionStorage.getItem(
        "askedQuestionModuleCode"
      );
      let retrievedPractical = window.sessionStorage.getItem(
        "askedQuestionPractical"
      );
      let retrievedProblem = window.sessionStorage.getItem("askedQuestionProblem");
      let retrievedLocation = window.sessionStorage.getItem(
        "askedQuestionLocation"
      );
      console.log(retrievedModuleCode);
      console.log(retrievedPractical);
      console.log(retrievedProblem);
      console.log(retrievedLocation);



      const editPageRedirect = () => {
          setEdit(true);
      }



    return (
        <>{(edit == false) ? (<><article className="grid-cols-2 grid-rows-4 outline shadow-lg rounded-lg pl-10 pr-10 pt-4 pb-4">
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
        <div className="row-span-2 cols-span-2">
            {retrievedProblem}
        </div>
        <Divider />
        <div className="row-span-1 cols-span-1 place-content-end">
                    {retrievedLocation}
        </div>
        <Button variant="contained" onClick={editPageRedirect}><EditIcon /> </Button>
      </article></>) : (<EditSubmittedQuestion />)}</>
    )
}

export default SubmittedQuestion