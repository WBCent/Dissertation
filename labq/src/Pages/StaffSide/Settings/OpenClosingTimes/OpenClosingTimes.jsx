import { Box, Select, MenuItem, FormLabel, Button, Typography, InputLabel, Snackbar } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";

let openClosingTimes = {
  monday: {
    mon_open: "",
    mon_close: "",
    mon_active: "",
  },
  tuesday: {
    tue_open: "",
    tue_close: "",
    tue_active: "",
  },
  wednesday: {
    wed_open: "",
    wed_close: "",
    wed_active: "",
  },
  thursday: {
    thu_open: "",
    thu_close: "",
    thu_active: "",
  },
  friday: {
    fri_open: "",
    fri_close: "",
    fri_active: "",
  },
};


const OpenClosingTimes = () => {
  const [openClose, setOpenClose] = useState(openClosingTimes);
  const [loaded, setLoaded] = useState(false);
  const [pastValues, setPastValues] = useState([]);
  const [presets, setPresets] = useState('')
  const [submitted, setSubmitted] = useState(false)


  useEffect(() => {
    fetchTimes().then(() => {
      setLoaded(true)
    }).catch((err) => console.log(err));
  }, [loaded]);

  const handleInputChangeMonday = (e) => {
    const { name, value } = e.target; //get the name and value from the input that has been changed
    console.log("changing", name, value);
    let updatedOpenClose = { ...openClose };
    updatedOpenClose.monday[name] = value;
    setOpenClose(updatedOpenClose);
    console.log(openClose);
  };

  const handleInputChangeTuesday = (e) => {
    const { name, value } = e.target; //get the name and value from the input that has been changed
    console.log("changing", name, value);
    let updatedOpenClose = { ...openClose };
    updatedOpenClose.tuesday[name] = value;
    setOpenClose(updatedOpenClose);
    console.log(openClose);
  };

  const handleInputChangeWednesday = (e) => {
    const { name, value } = e.target; //get the name and value from the input that has been changed
    console.log("changing", name, value);
    let updatedOpenClose = { ...openClose };
    updatedOpenClose.wednesday[name] = value;
    setOpenClose(updatedOpenClose);
    console.log(openClose);
  };

  const handleInputChangeThursday = (e) => {
    const { name, value } = e.target; //get the name and value from the input that has been changed
    console.log("changing", name, value);
    let updatedOpenClose = { ...openClose };
    updatedOpenClose.thursday[name] = value;
    setOpenClose(updatedOpenClose);
    console.log(openClose);
  };

  const handleInputChangeFriday = (e) => {
    const { name, value } = e.target; //get the name and value from the input that has been changed
    console.log("changing", name, value);
    let updatedOpenClose = { ...openClose };
    updatedOpenClose.friday[name] = value;
    setOpenClose(updatedOpenClose);
    console.log(openClose);
  };

  const fetchTimes = async () => {
    let fetchtimesjson = await fetch("/fetchOpenAndCloseTimes");
    let fetchedTimes = await fetchtimesjson.json();
    console.log("THis is the fetched times", fetchedTimes);

    setPastValues(fetchedTimes)
    console.log("These are the presets", presets)
    let placeholderTimes = {
      monday: {
        mon_open: fetchedTimes[0].opening_time,
        mon_close: fetchedTimes[0].closing_time,
        mon_active: fetchedTimes[0].active
      },
      tuesday: {
        tue_open: fetchedTimes[1].opening_time,
        tue_close: fetchedTimes[1].closing_time,
        tue_active: fetchedTimes[1].active
      },
      wednesday: {
        wed_open: fetchedTimes[2].opening_time,
        wed_close: fetchedTimes[2].closing_time,
        wed_active: fetchedTimes[2].active
      },
      thursday: {
        thu_open: fetchedTimes[3].opening_time,
        thu_close: fetchedTimes[3].closing_time,
        thu_active: fetchedTimes[3].active
      },
      friday: {
        fri_open: fetchedTimes[4].opening_time,
        fri_close: fetchedTimes[4].closing_time,
        fri_active: fetchedTimes[4].active
      }
    }
    setPresets(placeholderTimes)
    // setPresets(...presets, [0]['opening_time']: "10:30");
    console.log("this is presets", presets)
    setPastValues(fetchedTimes);
    setOpenClose(placeholderTimes)
    console.log(openClose)
    console.log("Opening and closing times", presets)
  };

  const submitTimes = async () => {
    console.log(openClose);
    let sendTimes = await fetch("http://localhost:5000/settimes", {
      method: "PUT",
      body: JSON.stringify(openClose),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let response = await sendTimes.json();
    console.log(response);
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false)
  }


  return (
    <>
      <article className="grid-cols-2 grid-rows-4 outline shadow-lg rounded-lg pl-10 pr-10 pt-4 pb-4 mt-4">
        <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}>Change the Opening and Closing Times</Typography>
        {loaded == true ? (
          <Box component="form">
            <strong>Monday</strong>
            <br />
            <div className="flex flex-row justify-start">
              <div className="flex-col mr-10">
                <InputLabel>Opening Time</InputLabel>
                <Select
                  id="mon_open"
                  name="mon_open"
                  label="Monday Opening Time"
                  value={openClose.monday.mon_open}
                  onChange={handleInputChangeMonday}
                  sx={{ minWidth: 200 }}
                >
                  <MenuItem value={"09:00"}>09:00</MenuItem>
                  <MenuItem value={"09:30"}>09:30</MenuItem>
                  <MenuItem value={"10:00"}>10:00</MenuItem>
                  <MenuItem value={"10:30"}>10:30</MenuItem>
                  <MenuItem value={"11:00"}>11:00</MenuItem>
                  <MenuItem value={"11:30"}>11:30</MenuItem>
                  <MenuItem value={"12:00"}>12:00</MenuItem>
                  <MenuItem value={"12:30"}>12:30</MenuItem>
                  <MenuItem value={"13:00"}>13:00</MenuItem>
                  <MenuItem value={"13:30"}>13:30</MenuItem>
                  <MenuItem value={"14:00"}>14:00</MenuItem>
                  <MenuItem value={"14:30"}>14:30</MenuItem>
                  <MenuItem value={"15:00"}>15:00</MenuItem>
                  <MenuItem value={"15:30"}>15:30</MenuItem>
                  <MenuItem value={"16:00"}>16:00</MenuItem>
                  <MenuItem value={"16:30"}>16:30</MenuItem>
                  <MenuItem value={"17:00"}>17:00</MenuItem>
                  <MenuItem value={"17:30"}>17:30</MenuItem>
                  <MenuItem value={"18:00"}>18:00</MenuItem>
                  <MenuItem value={"18:30"}>18:30</MenuItem>
                </Select>
              </div>
              <div className="flex-col mr-10">
                <InputLabel>Closing Time</InputLabel>
                <Select
                  id="mon_close"
                  name="mon_close"
                  label="Closing Time"
                  value={openClose.monday.mon_close}
                  onChange={handleInputChangeMonday}
                  sx={{ minWidth: 200 }}
                >
                  <MenuItem value={"09:00"}>09:00</MenuItem>
                  <MenuItem value={"09:30"}>09:30</MenuItem>
                  <MenuItem value={"10:00"}>10:00</MenuItem>
                  <MenuItem value={"10:30"}>10:30</MenuItem>
                  <MenuItem value={"11:00"}>11:00</MenuItem>
                  <MenuItem value={"11:30"}>11:30</MenuItem>
                  <MenuItem value={"12:00"}>12:00</MenuItem>
                  <MenuItem value={"12:30"}>12:30</MenuItem>
                  <MenuItem value={"13:00"}>13:00</MenuItem>
                  <MenuItem value={"13:30"}>13:30</MenuItem>
                  <MenuItem value={"14:00"}>14:00</MenuItem>
                  <MenuItem value={"14:30"}>14:30</MenuItem>
                  <MenuItem value={"15:00"}>15:00</MenuItem>
                  <MenuItem value={"15:30"}>15:30</MenuItem>
                  <MenuItem value={"16:00"}>16:00</MenuItem>
                  <MenuItem value={"16:30"}>16:30</MenuItem>
                  <MenuItem value={"17:00"}>17:00</MenuItem>
                  <MenuItem value={"17:30"}>17:30</MenuItem>
                  <MenuItem value={"18:00"}>18:00</MenuItem>
                  <MenuItem value={"18:30"}>18:30</MenuItem>
                </Select>
              </div>
              <div className="flex-col">

                <InputLabel>Is the lab Open on Monday?</InputLabel>
                <Select
                  id="mon_active"
                  name="mon_active"
                  label="Is the lab running on Monday"
                  value={openClose.monday.mon_active}
                  onChange={handleInputChangeMonday}
                  sx={{ minWidth: 200 }}
                >
                  <MenuItem value={1}>Open</MenuItem>
                  <MenuItem value={0}>Closed</MenuItem>
                </Select>
              </div>
            </div>
            <br /><strong>
              Tuesday
            </strong>
            
            <br />
            <div className="flex flex-row justify-start">
              <div className="flex-col mr-10">
                <InputLabel>Opening Time</InputLabel>
                <Select
                  id="tue_open"
                  name="tue_open"
                  label="What time will the lab Open on Tuesday"
                  value={openClose.tuesday.tue_open}
                  onChange={handleInputChangeTuesday}
                  sx={{ minWidth: 200 }}
                >
                  <MenuItem value={"09:00"}>09:00</MenuItem>
                  <MenuItem value={"09:30"}>09:30</MenuItem>
                  <MenuItem value={"10:00"}>10:00</MenuItem>
                  <MenuItem value={"10:30"}>10:30</MenuItem>
                  <MenuItem value={"11:00"}>11:00</MenuItem>
                  <MenuItem value={"11:30"}>11:30</MenuItem>
                  <MenuItem value={"12:00"}>12:00</MenuItem>
                  <MenuItem value={"12:30"}>12:30</MenuItem>
                  <MenuItem value={"13:00"}>13:00</MenuItem>
                  <MenuItem value={"13:30"}>13:30</MenuItem>
                  <MenuItem value={"14:00"}>14:00</MenuItem>
                  <MenuItem value={"14:30"}>14:30</MenuItem>
                  <MenuItem value={"15:00"}>15:00</MenuItem>
                  <MenuItem value={"15:30"}>15:30</MenuItem>
                  <MenuItem value={"16:00"}>16:00</MenuItem>
                  <MenuItem value={"16:30"}>16:30</MenuItem>
                  <MenuItem value={"17:00"}>17:00</MenuItem>
                  <MenuItem value={"17:30"}>17:30</MenuItem>
                  <MenuItem value={"18:00"}>18:00</MenuItem>
                  <MenuItem value={"18:30"}>18:30</MenuItem>
                </Select>
              </div>
              <div className="flex-col mr-10">

                <InputLabel>Closing Time</InputLabel>
                <Select
                  id="tue_close"
                  name="tue_close"
                  label="What time will the lab close on Tuesday"
                  value={openClose.tuesday.tue_close}
                  onChange={handleInputChangeTuesday}
                  sx={{ minWidth: 200 }}
                >
                  <MenuItem value={"09:00"}>09:00</MenuItem>
                  <MenuItem value={"09:30"}>09:30</MenuItem>
                  <MenuItem value={"10:00"}>10:00</MenuItem>
                  <MenuItem value={"10:30"}>10:30</MenuItem>
                  <MenuItem value={"11:00"}>11:00</MenuItem>
                  <MenuItem value={"11:30"}>11:30</MenuItem>
                  <MenuItem value={"12:00"}>12:00</MenuItem>
                  <MenuItem value={"12:30"}>12:30</MenuItem>
                  <MenuItem value={"13:00"}>13:00</MenuItem>
                  <MenuItem value={"13:30"}>13:30</MenuItem>
                  <MenuItem value={"14:00"}>14:00</MenuItem>
                  <MenuItem value={"14:30"}>14:30</MenuItem>
                  <MenuItem value={"15:00"}>15:00</MenuItem>
                  <MenuItem value={"15:30"}>15:30</MenuItem>
                  <MenuItem value={"16:00"}>16:00</MenuItem>
                  <MenuItem value={"16:30"}>16:30</MenuItem>
                  <MenuItem value={"17:00"}>17:00</MenuItem>
                  <MenuItem value={"17:30"}>17:30</MenuItem>
                  <MenuItem value={"18:00"}>18:00</MenuItem>
                  <MenuItem value={"18:30"}>18:30</MenuItem>
                </Select>
              </div>
              <div className="flex-col mr-10">

                <InputLabel>Is the lab Open on Tuesday?</InputLabel>
                <Select
                  id="tue_active"
                  name="tue_active"
                  label="Is the lab running on Tuesday"
                  value={openClose.tuesday.tue_active}
                  onChange={handleInputChangeTuesday}
                  sx={{ minWidth: 200 }}
                >
                  <MenuItem value={1}>Open</MenuItem>
                  <MenuItem value={0}>Closed</MenuItem>
                </Select>
              </div>
            </div>
            <br /><strong>
              Wednesday
            </strong>
            <br />
            <div className="flex flex-row justify-start">
              <div className="flex-col mr-10">
                <InputLabel>Opening Time</InputLabel>
                <Select
                  id="wed_open"
                  name="wed_open"
                  label="What time will the lab Open on Wednesday"
                  value={openClose.wednesday.wed_open}
                  onChange={handleInputChangeWednesday}
                  sx={{ minWidth: 200 }}
                >
                  <MenuItem value={"09:00"}>09:00</MenuItem>
                  <MenuItem value={"09:30"}>09:30</MenuItem>
                  <MenuItem value={"10:00"}>10:00</MenuItem>
                  <MenuItem value={"10:30"}>10:30</MenuItem>
                  <MenuItem value={"11:00"}>11:00</MenuItem>
                  <MenuItem value={"11:30"}>11:30</MenuItem>
                  <MenuItem value={"12:00"}>12:00</MenuItem>
                  <MenuItem value={"12:30"}>12:30</MenuItem>
                  <MenuItem value={"13:00"}>13:00</MenuItem>
                  <MenuItem value={"13:30"}>13:30</MenuItem>
                  <MenuItem value={"14:00"}>14:00</MenuItem>
                  <MenuItem value={"14:30"}>14:30</MenuItem>
                  <MenuItem value={"15:00"}>15:00</MenuItem>
                  <MenuItem value={"15:30"}>15:30</MenuItem>
                  <MenuItem value={"16:00"}>16:00</MenuItem>
                  <MenuItem value={"16:30"}>16:30</MenuItem>
                  <MenuItem value={"17:00"}>17:00</MenuItem>
                  <MenuItem value={"17:30"}>17:30</MenuItem>
                  <MenuItem value={"18:00"}>18:00</MenuItem>
                  <MenuItem value={"18:30"}>18:30</MenuItem>
                </Select>
              </div>
              <div className="flex-col mr-10">
                <InputLabel>Closing Time</InputLabel>
                <Select
                  id="wed_close"
                  name="wed_close"
                  label="What time will the lab close on Wednesday"
                  value={openClose.wednesday.wed_close}
                  onChange={handleInputChangeWednesday}
                  sx={{ minWidth: 200 }}
                >
                  <MenuItem value={"09:00"}>09:00</MenuItem>
                  <MenuItem value={"09:30"}>09:30</MenuItem>
                  <MenuItem value={"10:00"}>10:00</MenuItem>
                  <MenuItem value={"10:30"}>10:30</MenuItem>
                  <MenuItem value={"11:00"}>11:00</MenuItem>
                  <MenuItem value={"11:30"}>11:30</MenuItem>
                  <MenuItem value={"12:00"}>12:00</MenuItem>
                  <MenuItem value={"12:30"}>12:30</MenuItem>
                  <MenuItem value={"13:00"}>13:00</MenuItem>
                  <MenuItem value={"13:30"}>13:30</MenuItem>
                  <MenuItem value={"14:00"}>14:00</MenuItem>
                  <MenuItem value={"14:30"}>14:30</MenuItem>
                  <MenuItem value={"15:00"}>15:00</MenuItem>
                  <MenuItem value={"15:30"}>15:30</MenuItem>
                  <MenuItem value={"16:00"}>16:00</MenuItem>
                  <MenuItem value={"16:30"}>16:30</MenuItem>
                  <MenuItem value={"17:00"}>17:00</MenuItem>
                  <MenuItem value={"17:30"}>17:30</MenuItem>
                  <MenuItem value={"18:00"}>18:00</MenuItem>
                  <MenuItem value={"18:30"}>18:30</MenuItem>
                </Select>
              </div>
              <div className="flex-col mr-10">
                <InputLabel>Is the lab Open on Wednesday?</InputLabel>
                <Select
                  id="wed_active"
                  name="wed_active"
                  label="Is the lab running on Wednesday"
                  value={openClose.wednesday.wed_active}
                  onChange={handleInputChangeWednesday}
                  sx={{ minWidth: 200 }}
                >
                  <MenuItem value={1}>Open</MenuItem>
                  <MenuItem value={0}>Closed</MenuItem>
                </Select>
              </div>
            </div>
            <br /><strong>
              Thursday
            </strong>
            <div className="flex flex-row justify-start">
              <div className="flex-col mr-10">
                <InputLabel>Opening Time</InputLabel>
                <Select
                  id="thu_open"
                  name="thu_open"
                  label="What time will the lab Open on Thursday"
                  value={openClose.thursday.thu_open}
                  onChange={handleInputChangeThursday}
                  sx={{ minWidth: 200 }}
                >
                  <MenuItem value={"09:00"}>09:00</MenuItem>
                  <MenuItem value={"09:30"}>09:30</MenuItem>
                  <MenuItem value={"10:00"}>10:00</MenuItem>
                  <MenuItem value={"10:30"}>10:30</MenuItem>
                  <MenuItem value={"11:00"}>11:00</MenuItem>
                  <MenuItem value={"11:30"}>11:30</MenuItem>
                  <MenuItem value={"12:00"}>12:00</MenuItem>
                  <MenuItem value={"12:30"}>12:30</MenuItem>
                  <MenuItem value={"13:00"}>13:00</MenuItem>
                  <MenuItem value={"13:30"}>13:30</MenuItem>
                  <MenuItem value={"14:00"}>14:00</MenuItem>
                  <MenuItem value={"14:30"}>14:30</MenuItem>
                  <MenuItem value={"15:00"}>15:00</MenuItem>
                  <MenuItem value={"15:30"}>15:30</MenuItem>
                  <MenuItem value={"16:00"}>16:00</MenuItem>
                  <MenuItem value={"16:30"}>16:30</MenuItem>
                  <MenuItem value={"17:00"}>17:00</MenuItem>
                  <MenuItem value={"17:30"}>17:30</MenuItem>
                  <MenuItem value={"18:00"}>18:00</MenuItem>
                  <MenuItem value={"18:30"}>18:30</MenuItem>
                </Select>
              </div>
              <div className="flex-col mr-10">
                <InputLabel>Closing Time</InputLabel>
                <Select
                  id="thu_close"
                  name="thu_close"
                  label="What time will the lab Open on Thursday"
                  value={openClose.thursday.thu_close}
                  onChange={handleInputChangeThursday}
                  sx={{ minWidth: 200 }}
                >
                  <MenuItem value={"09:00"}>09:00</MenuItem>
                  <MenuItem value={"09:30"}>09:30</MenuItem>
                  <MenuItem value={"10:00"}>10:00</MenuItem>
                  <MenuItem value={"10:30"}>10:30</MenuItem>
                  <MenuItem value={"11:00"}>11:00</MenuItem>
                  <MenuItem value={"11:30"}>11:30</MenuItem>
                  <MenuItem value={"12:00"}>12:00</MenuItem>
                  <MenuItem value={"12:30"}>12:30</MenuItem>
                  <MenuItem value={"13:00"}>13:00</MenuItem>
                  <MenuItem value={"13:30"}>13:30</MenuItem>
                  <MenuItem value={"14:00"}>14:00</MenuItem>
                  <MenuItem value={"14:30"}>14:30</MenuItem>
                  <MenuItem value={"15:00"}>15:00</MenuItem>
                  <MenuItem value={"15:30"}>15:30</MenuItem>
                  <MenuItem value={"16:00"}>16:00</MenuItem>
                  <MenuItem value={"16:30"}>16:30</MenuItem>
                  <MenuItem value={"17:00"}>17:00</MenuItem>
                  <MenuItem value={"17:30"}>17:30</MenuItem>
                  <MenuItem value={"18:00"}>18:00</MenuItem>
                  <MenuItem value={"18:30"}>18:30</MenuItem>
                </Select>
              </div>
              <div className="flex-col mr-10">
                <InputLabel>Is the lab Open on Thursday?</InputLabel>
                <Select
                  id="thu_active"
                  name="thu_active"
                  label="Is the lab running on Thursday"
                  value={openClose.thursday.thu_active}
                  onChange={handleInputChangeThursday}
                  sx={{ minWidth: 200 }}
                >
                  <MenuItem value={1}>Open</MenuItem>
                  <MenuItem value={0}>Closed</MenuItem>
                </Select>
              </div></div>
            <br /><strong>
              Friday
            </strong>
            <br />
            <div className="flex flex-row justify-start">
              <div className="flex-col mr-10">
                <InputLabel>Opening Time</InputLabel>
                <Select
                  id="fri_open"
                  name="fri_open"
                  label="What time will the lab Open on Friday"
                  value={openClose.friday.fri_open}
                  onChange={handleInputChangeFriday}
                  sx={{ minWidth: 200 }}
                >
                  <MenuItem value={"09:00"}>09:00</MenuItem>
                  <MenuItem value={"09:30"}>09:30</MenuItem>
                  <MenuItem value={"10:00"}>10:00</MenuItem>
                  <MenuItem value={"10:30"}>10:30</MenuItem>
                  <MenuItem value={"11:00"}>11:00</MenuItem>
                  <MenuItem value={"11:30"}>11:30</MenuItem>
                  <MenuItem value={"12:00"}>12:00</MenuItem>
                  <MenuItem value={"12:30"}>12:30</MenuItem>
                  <MenuItem value={"13:00"}>13:00</MenuItem>
                  <MenuItem value={"13:30"}>13:30</MenuItem>
                  <MenuItem value={"14:00"}>14:00</MenuItem>
                  <MenuItem value={"14:30"}>14:30</MenuItem>
                  <MenuItem value={"15:00"}>15:00</MenuItem>
                  <MenuItem value={"15:30"}>15:30</MenuItem>
                  <MenuItem value={"16:00"}>16:00</MenuItem>
                  <MenuItem value={"16:30"}>16:30</MenuItem>
                  <MenuItem value={"17:00"}>17:00</MenuItem>
                  <MenuItem value={"17:30"}>17:30</MenuItem>
                  <MenuItem value={"18:00"}>18:00</MenuItem>
                  <MenuItem value={"18:30"}>18:30</MenuItem>
                </Select>
              </div>
              <div className="flex-col mr-10">
                <InputLabel>Opening Time</InputLabel>
                <Select
                  id="fri_close"
                  name="fri_close"
                  label="What time will the lab close on Friday"
                  value={openClose.friday.fri_close}
                  onChange={handleInputChangeFriday}
                  sx={{ minWidth: 200 }}
                >
                  <MenuItem value={"09:00"}>09:00</MenuItem>
                  <MenuItem value={"09:30"}>09:30</MenuItem>
                  <MenuItem value={"10:00"}>10:00</MenuItem>
                  <MenuItem value={"10:30"}>10:30</MenuItem>
                  <MenuItem value={"11:00"}>11:00</MenuItem>
                  <MenuItem value={"11:30"}>11:30</MenuItem>
                  <MenuItem value={"12:00"}>12:00</MenuItem>
                  <MenuItem value={"12:30"}>12:30</MenuItem>
                  <MenuItem value={"13:00"}>13:00</MenuItem>
                  <MenuItem value={"13:30"}>13:30</MenuItem>
                  <MenuItem value={"14:00"}>14:00</MenuItem>
                  <MenuItem value={"14:30"}>14:30</MenuItem>
                  <MenuItem value={"15:00"}>15:00</MenuItem>
                  <MenuItem value={"15:30"}>15:30</MenuItem>
                  <MenuItem value={"16:00"}>16:00</MenuItem>
                  <MenuItem value={"16:30"}>16:30</MenuItem>
                  <MenuItem value={"17:00"}>17:00</MenuItem>
                  <MenuItem value={"17:30"}>17:30</MenuItem>
                  <MenuItem value={"18:00"}>18:00</MenuItem>
                  <MenuItem value={"18:30"}>18:30</MenuItem>
                </Select>
              </div>
              <div className="flex-col mr-10">
                <InputLabel>Is the lab Open on Friday?</InputLabel>
                <Select
                  id="fri_active"
                  name="fri_active"
                  label="Is the lab running on Friday"
                  value={openClose.friday.fri_active}
                  onChange={handleInputChangeFriday}
                  sx={{ minWidth: 200 }}
                >
                  <MenuItem value={1}>Open</MenuItem>
                  <MenuItem value={0}>Closed</MenuItem>
                </Select></div>
            </div>
            <br />
            <Button variant="contained" onClick={submitTimes} sx={{ mt: 1 }}>
              Submit Times
            </Button>
            {/* Taken from MUI documentation: https://mui.com/material-ui/react-snackbar/ */}
            <Snackbar open={submitted} autoHideDuration={4000} onClose={handleClose} message="Times Submitted" />
            {/* End of taken from MUI documentation */}
          </Box>
        ) : (
          <p>Loading</p>
        )}
      </article>
    </>
  );
};

export default OpenClosingTimes;
