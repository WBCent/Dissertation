import {
    Button,
    FormControlLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography,
  } from "@mui/material";
  import { useContext } from "react";
  import EditIcon from '@mui/icons-material/Edit';
  import { useState } from "react";
  import StaffProfile from "../../../../Context/StaffProfile";
  import { useEffect } from "react";
  import { FormGroup } from "react-bootstrap";
  import { Checkbox } from "@mui/material";
  import authAccess from "../../../../Context/auth-access";
  let staffObject = {
    username: "",
    level: "",
    manning_mon: false,
    manning_tue: false,
    manning_wed: false,
    manning_thu: false,
    manning_fri: false,
  };
  
  let staff = [];
  
  const StaffSchedule = () => {
    const [staffProfileOpen, setStaffProfileOpen] = useState(false)
    const [formValues, setFormValues] = useState(staffObject);
    const [usernameLoading, setUsernameLoading] = useState(true);
    const [loadingTeachers, setLoadingTeachers] = useState(null)
    const {addTeacher} = useContext(StaffProfile)

    let {
      accessToken,
      setAccessToken,
      username,
      setUsername,
      loading,
      setLoading,
    } = useContext(authAccess);
    console.log(username);
    
    useEffect(() => {
      setUsernameLoading(false);
      async function teachers() {
        await retrieveStaff();
      }
      teachers();
      setLoadingTeachers(false)
    }, []);

    useEffect(() => {
      setLoadingTeachers(true)
      retrieveStaff().then(() => {
        setLoadingTeachers(false)
      })
    }, [addTeacher, username])
  
    const handleInputChange = (e) => {
      const { name, value } = e.target; //get the name and value from the input that has been changed
      console.log("changing", name, value);
      setFormValues({ ...formValues, [name]: value }); //set all the other form values to their previous value, and the new one to the changed value
    };
  
    const retrieveStaff = async () => {
      let staffjson = await fetch("http://localhost:5000/retrieveteachers");
      staff = await staffjson.json();
      console.log("These are the staff members", staff);
    };
  
    const saveTeacher = async (event) => {
      if (usernameLoading == false) {
        event.preventDefault();
        console.log(formValues);
        let savingstatus = await fetch("http://localhost:5000/saveteacher", {
          method: "POST",
          body: JSON.stringify(formValues),
          headers: {
            "Content-Type": "application/json",
          },
        });
        let saved = await savingstatus.json();
        console.log(saved);
        console.log(staffProfileOpen);
        await retrieveStaff()
        closeProfileConfig;
        console.log(staffProfileOpen);
      }
    };
  
    const closeProfileConfig = () => {
      setStaffProfileOpen(false);
    };

    const openProfileConfig = (obj) => {
      setFormValues({
        username: obj.username,
        level: obj.course_level,
        manning_mon: obj.manning_lab_mon,
        manning_tue: obj.manning_lab_tue,
        manning_wed: obj.manning_lab_wed,
        manning_thu: obj.manning_lab_thu,
        manning_fri: obj.manning_lab_fri,
      })
      console.log("These are the form values on edit open", formValues);
      setStaffProfileOpen(true)
    }

  
    return (
      (loadingTeachers == true ? (<><p>loading</p></>) : (
          <article className="outline shadow-lg rounded-lg pl-10 pr-10 pt-4 pb-4 mt-4">
            <Typography variant="h5" sx={{fontWeight: 'bold', textAlign: 'center'}}>Staff Schedule</Typography>
            
          {staffProfileOpen == false  ? (
          <>
          <article className="flex flex-wrap justify-between">
            {staff.map((obj) => (
              <>
              <article className="max-w-max outline shadow-lg rounded-lg pl-10 pr-10 pt-4 pb-4 mt-4 mb-7 mr-3">
                <Typography variant="h6" sx={{fontWeight: 'bold', textAlign: 'center'}}>{obj.educator_name}</Typography>
                <p>
                  <strong>{obj.username}</strong>
                </p>
                <p>level: {obj.course_level}</p>
                <div className="flex flex-col">
                {/* THe below is adapted from the following web address: https://stackoverflow.com/questions/69275552/how-to-make-a-checkbox-do-different-things-based-on-their-check-status-true-fals */}
                <FormControlLabel control={<Checkbox checked={obj.manning_lab_mon == 1 ? true : false} disableRipple={true} sx={{color: 'grey'}}></Checkbox>} label="Monday" />
                <FormControlLabel control={<Checkbox checked={obj.manning_lab_tue == 1 ? true : false} sx={{color: 'grey'}} disableRipple={true}></Checkbox>} label="Tuesday" />
                <FormControlLabel control={<Checkbox checked={obj.manning_lab_wed == 1 ? true : false} sx={{color: 'grey'}} disableRipple={true}></Checkbox>} label="Wednesday" />
                <FormControlLabel control={<Checkbox checked={obj.manning_lab_thu == 1 ? true : false} sx={{color: 'grey'}} disableRipple={true}></Checkbox>} label="Thursday" />
                <FormControlLabel control={<Checkbox checked={obj.manning_lab_fri == 1 ? true : false} sx={{color: 'grey'}} disableRipple={true}></Checkbox>} label="Friday" />
                <Button variant="contained" onClick={() => {openProfileConfig(obj)}}><EditIcon />Edit Profile</Button>
                </div>
              </article>
              </>
          ))}
          </article>
          </>
        ) : (
          <>
          <div className="flex flex-row justify-between items-baseline">
          <p><strong>Editing {formValues.username} Schedule</strong></p>
          <Button onClick={() => {setStaffProfileOpen(false)}} variant="contained" color="error">Close</Button>
          </div><br />
          <div className="flex flex-col">
            <Select
              id="level"
              name="level"
              value={formValues.level}
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
                    checked={formValues.manning_mon == 1 ? true : false}
                    name="manning_mon"
                    value={true}
                  />
                }
                label="Monday"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleInputChange}
                    checked={formValues.manning_tue == 1 ? true : false}

                    name="manning_tue"
                    value={true}
                  />
                }
                label="Tuesday"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleInputChange}
                    checked={formValues.manning_wed == 1 ? true : false}

                    name="manning_wed"
                    value={true}
                  />
                }
                label="Wednesday"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleInputChange}
                    checked={formValues.manning_thu== 1 ? true : false}

                    name="manning_thu"
                    value={true}
                  />
                }
                label="Thursday"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleInputChange}
                    checked={formValues.manning_fri == 1 ? true : false}
                    name="manning_fri"
                    value={true}
                  />
                }
                label="Friday"
              />
            </FormGroup>
            <Button
              variant="contained"
              onClick={async (e) => {
                await saveTeacher(e);
                closeProfileConfig();
              }}
            >
              Save Changes
            </Button>
            </div>
          </>
        )}
        </article>
    ))
    );
  };
  
  export default StaffSchedule;