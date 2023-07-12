import { Button, FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material";
import { useContext } from "react";
import StaffProfile from "../../../../Context/StaffProfile";
import { useEffect, useState } from "react";
import { FormGroup } from "react-bootstrap";
import { Checkbox } from '@mui/material';
let staffObject = {
    username: '',
    level: '',
    manning_mon: false,
    manning_tue: false,
    manning_wed: false,
    manning_thu: false,
    manning_fri: false
}




const StaffSchedule = () => {
    let { staffProfileOpen, setStaffProfileOpen } = useContext(StaffProfile);
    const [formValues, setFormValues] = useState(staffObject);

    useEffect(() => {
        retrieveStaff()
    }, [])



    const handleInputChange = (e) => {
        const { name, value } = e.target; //get the name and value from the input that has been changed
        console.log("changing", name, value);
        setFormValues({ ...formValues, [name]: value }); //set all the other form values to their previous value, and the new one to the changed value
      };

    const retrieveStaff = async () => {
        let staffjson = await fetch('http://localhost:5000/retrieveteachers');
        let staff = staffjson.json();
        console.log(staff);
    }

    const saveTeacher = async (event) => {
        event.preventDefault();
        console.log(formValues)
        let savingstatus = await fetch('http://localhost:5000/saveteacher', {
            method: 'POST',
            body: JSON.stringify(formValues),
            headers: {
                "Content-Type": "application/json",
              },

        })
        let saved = await savingstatus.json();
        console.log(saved);
        console.log(staffProfileOpen)
        closeProfileConfig;
        console.log(staffProfileOpen)
    }



    const closeProfileConfig = () => {
        setStaffProfileOpen(false)
    }


    return (
        <article className="grid-cols-2 grid-rows-4 outline shadow-lg rounded-lg pl-10 pr-10 pt-4 pb-4">
            {staffProfileOpen ? (<><Button variant="contained" onClick={setStaffProfileOpen(true)}>Save Changes</Button></>) 
            :
            (<>
                <Select 
                    id="level"
                    name="level"
                    label="Select the level at which you teach"
                    value={staffObject.level}
                    onChange={handleInputChange}
                >
                    <MenuItem value={"CS1000"}>CS1000</MenuItem>
                    <MenuItem value={"CS2000"}>CS2000</MenuItem>
                    <MenuItem value={"CS1000 & CS2000"}>CS1000 & CS2000</MenuItem>
                </Select>
                <FormGroup>
                    <FormControlLabel control={
                        <Checkbox onChange={handleInputChange} name="manning_mon" value={true} />
                    }
                    label="Monday"
                    />
                    <FormControlLabel control={
                        <Checkbox onChange={handleInputChange} name="manning_tue" value={true} />
                    }
                    label="Tuesday"
                    />
                    <FormControlLabel control={
                        <Checkbox onChange={handleInputChange} name="manning_wed" value={true} />
                    }
                    label="Wednesday"
                    />
                    <FormControlLabel control={
                        <Checkbox onChange={handleInputChange} name="manning_thu" value={true} />
                    }
                    label="Thursday"
                    />
                    <FormControlLabel control={
                        <Checkbox onChange={handleInputChange} name="manning_fri" value={true} />
                    }
                    label="Friday"
                    />
                    
                </FormGroup>
                <Button variant="contained" onClick={saveTeacher}>Save Changes</Button>
             </>
            )}

        </article>
    )
}

export default StaffSchedule;









