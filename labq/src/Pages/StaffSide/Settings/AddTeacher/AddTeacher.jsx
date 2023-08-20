import {
  TextField,
  Select,
  FormGroup,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Button
} from "@mui/material";
import { useContext } from "react";
import { useState } from "react";
import StaffProfile from "../../../../Context/StaffProfile";

let staffObject = {
  username: "",
  name: "",
  level: "",
  monday: 0,
  tuesday: 0,
  wednesday: 0,
  thursday: 0,
  friday: 0,
};

const AddTeacher = () => {
  const [formValues, setFormValues] = useState(staffObject);
  const { addTeacher, setAddTeacher } = useContext(StaffProfile);
  const handleInputChange = (e) => {
    const { name, value } = e.target; //get the name and value from the input that has been changed
    console.log("changing", name, value);
    setFormValues({ ...formValues, [name]: value }); //set all the other form values to their previous value, and the new one to the changed value
  };





  const isValid = (name) => {
    //all inputs must be filled in
    let valid = formValues[name] && formValues[name].trim() != "";
    //some inputs have additional validation
    return valid;
  };

  const teacherAddDB = async () => {
    console.log(formValues)
    let sendjson = await fetch('http://localhost:5000/addteachertodb', {
        headers: {
            'Content-Type' : 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formValues)
    })

    let response = await sendjson.json()
    console.log(response)
    setAddTeacher(Math.random() + 1)
    setFormValues(staffObject)
  }

  return (
    <article className="grid-cols-2 grid-rows-4 outline shadow-lg rounded-lg pl-10 pr-10 pt-4 pb-4 mt-4">
      <TextField
        id="username"
        name="username"
        fullWidth
        label="What is the teachers username"
        value={formValues.username}
        onChange={handleInputChange}
        error={!isValid("username")}

      ></TextField>
      <TextField
        id="name"
        name="name"
        fullWidth
        label="What is the teachers name"
        value={formValues.name}
        onChange={handleInputChange}
        error={!isValid("name")}
        sx={{mt: 2}}
      ></TextField>
      <Select
        id="level"
        name="level"
        label="Select the level at which you teach"
        value={formValues.level} 
        fullWidth
        sx={{mt: 2, mb: 2}}
        onChange={handleInputChange}
      >
        <MenuItem value={"CS1000"}>CS1000</MenuItem>
        <MenuItem value={"CS2000"}>CS2000</MenuItem>
        <MenuItem value={"CS1000 & CS2000"}>CS1000 & CS2000</MenuItem>
      </Select>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              onChange={handleInputChange}
              name="monday"
              checked={formValues.monday == 1 ? true : false}
              value={1}
            />
          }
          label="Monday"
        />
        <FormControlLabel
          control={
            <Checkbox
              onChange={handleInputChange}
              name="tuesday"
              checked={formValues.tuesday == 1 ? true : false}
              value={1}
            />
          }
          label="Tuesday"
        />
        <FormControlLabel
          control={
            <Checkbox
              onChange={handleInputChange}
              name="wednesday"
              checked={formValues.wednesday == 1 ? true : false}
              value={1}
            />
          }
          label="Wednesday"
        />
        <FormControlLabel
          control={
            <Checkbox
              onChange={handleInputChange}
              name="thursday"
              checked={formValues.thursday == 1 ? true : false}
              value={1}
            />
          }
          label="Thursday"
        />
        <FormControlLabel
          control={
            <Checkbox
              onChange={handleInputChange}
              checked={formValues.friday == 1 ? true : false}
              name="friday"
              value={1}
            />
          }
          label="Friday"
        />
      </FormGroup>
      <Button
      sx={{mt: 2}}
       variant="contained"
       onClick={async (e) => {
        await teacherAddDB();

       }}>
        Add Teacher
       </Button>
    </article>
  );
};

export default AddTeacher;
