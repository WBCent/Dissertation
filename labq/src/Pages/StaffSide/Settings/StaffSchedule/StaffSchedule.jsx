import {
    Button,
    FormControlLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
  } from "@mui/material";
  import { useContext } from "react";
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
    const [regetTeachers, setRegetTeachers] = useState(false)
  
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
      setFormValues({ ...formValues, ["username"]: username });
      setUsernameLoading(false);
      async function teachers() {
        await retrieveStaff();
      }
      teachers();
      setLoadingTeachers(false)
    }, [username, loadingTeachers]);

    useEffect(() => {
      setLoadingTeachers(true)
      retrieveStaff().then(() => {
        setLoadingTeachers(false)
      })
    }, [regetTeachers])
  
    const handleInputChange = (e) => {
      const { name, value } = e.target; //get the name and value from the input that has been changed
      console.log("changing", name, value);
      setFormValues({ ...formValues, [name]: value }); //set all the other form values to their previous value, and the new one to the changed value
    };
  
    const retrieveStaff = async () => {
      let staffjson = await fetch("http://localhost:5000/retrieveteachers");
      staff = await staffjson.json();
      console.log(staff);
      for (let i = 0; i < staff.length; i++) {
        if(staff[i].manning_lab_mon = 0) {
          staff[i].manning_lab_mon = false
        } else {
          staff[i].manning_lab_mon = true
        }
        if(staff[i].manning_lab_tue = 0) {
          staff[i].manning_lab_tue = false
        } else {
          staff[i].manning_lab_tue = true
        }
        if(staff[i].manning_lab_wed = 0) {
          staff[i].manning_lab_wed = false
        } else {
          staff[i].manning_lab_wed = true
        }
        if(staff[i].manning_lab_thu = 0) {
          staff[i].manning_lab_thu = false
        } else {
          staff[i].manning_lab_thu = true
        }
        if(staff[i].manning_lab_fri = 0) {
          staff[i].manning_lab_fri = false
        } else {
          staff[i].manning_lab_fri = true
        }
      }
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
  
    return (
      (loadingTeachers == true ? (<><p>loading</p></>) : (
          <article className="grid-cols-2 grid-rows-4 outline shadow-lg rounded-lg pl-10 pr-10 pt-4 pb-4 mt-4">
            <p><strong>This is where you can see the teachers</strong></p>
          {staffProfileOpen == false  ? (
          <>
            {staff.map((obj) => (
              <>
                <p>
                  <strong>{obj.username}</strong>
                </p>
                <p>level: {obj.course_level}</p>
                <p>Working Monday: {obj.manning_lab_mon}</p>
                <p>Working Tuesday: {obj.manning_lab_tue}</p>
                <p>Working Wednesday: {obj.manning_lab_wed}</p>
                <p>Working Thursday: {obj.manning_lab_thu}</p>
                <p>Working Friday: {obj.manning_lab_fri}</p>
              </>
          ))}
            <Button variant="contained" onClick={() => {setStaffProfileOpen(true)}}>Edit</Button>
          </>
        ) : (
          <>
          <Button onClick={() => {setStaffProfileOpen(false)}} variant="outlined">Close</Button>
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
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleInputChange}
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
          </>
        )}
      </article>
    ))
    );
  };
  
  export default StaffSchedule;