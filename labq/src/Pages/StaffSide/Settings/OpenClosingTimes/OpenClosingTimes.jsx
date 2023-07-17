import { Box, Select, MenuItem, FormLabel, Button } from "@mui/material";
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

  const handleInputChangeMonday = (e) => {
    const { name, value } = e.target; //get the name and value from the input that has been changed
    console.log("changing", name, value);
    let updatedOpenClose = {...openClose};
    updatedOpenClose.monday[name] = value;
    setOpenClose(updatedOpenClose);
    console.log(openClose);
  };

  const handleInputChangeTuesday = (e) => {
    const { name, value } = e.target; //get the name and value from the input that has been changed
    console.log("changing", name, value);
    let updatedOpenClose = {...openClose};
    updatedOpenClose.tuesday[name] = value;
    setOpenClose(updatedOpenClose);
    console.log(openClose);
  };

  const handleInputChangeWednesday = (e) => {
    const { name, value } = e.target; //get the name and value from the input that has been changed
    console.log("changing", name, value);
    let updatedOpenClose = {...openClose};
    updatedOpenClose.wednesday[name] = value;
    setOpenClose(updatedOpenClose);
    console.log(openClose);
  };

  const handleInputChangeThursday = (e) => {
    const { name, value } = e.target; //get the name and value from the input that has been changed
    console.log("changing", name, value);
    let updatedOpenClose = {...openClose};
    updatedOpenClose.thursday[name] = value;
    setOpenClose(updatedOpenClose);
    console.log(openClose);
  };

  const handleInputChangeFriday = (e) => {
    const { name, value } = e.target; //get the name and value from the input that has been changed
    console.log("changing", name, value);
    let updatedOpenClose = {...openClose};
    updatedOpenClose.friday[name] = value;
    setOpenClose(updatedOpenClose);
    console.log(openClose);
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
  };

  return (
    <>
      <h1>Hello there this is the opening and closing time page</h1>
      <article className="grid-cols-2 grid-rows-4 outline shadow-lg rounded-lg pl-10 pr-10 pt-4 pb-4">
        <Box component="form">
          Monday
          <FormLabel>Opening Time</FormLabel>
          <Select
            id="mon_open"
            name="mon_open"
            label="Monday Opening Time"
            value={openClose.monday.mon_open}
            onChange={handleInputChangeMonday}
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
          <FormLabel>Closing Time</FormLabel>
          <Select
            id="mon_close"
            name="mon_close"
            label="Monday Closing Time"
            value={openClose.monday.mon_close}
            onChange={handleInputChangeMonday}
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
          Is the Lab Open on Monday
          <Select
            id="mon_active"
            name="mon_active"
            label="Is the lab running on Monday"
            value={openClose.monday.mon_active}
            onChange={handleInputChangeMonday}
          >
            <MenuItem value={1}>Open</MenuItem>
            <MenuItem value={0}>Closed</MenuItem>
          </Select>
          Tuesday
          <FormLabel>Opening Time</FormLabel>
          <Select
            id="tue_open"
            name="tue_open"
            label="What time will the lab Open on Tuesday"
            value={openClose.tuesday.tue_open}
            onChange={handleInputChangeTuesday}
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
          <FormLabel>Closing Time</FormLabel>
          <Select
            id="tue_close"
            name="tue_close"
            label="What time will the lab close on Tuesday"
            value={openClose.tuesday.tue_close}
            onChange={handleInputChangeTuesday}
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
          <Select
            id="tue_active"
            name="tue_active"
            label="Is the lab running on Tuesday"
            value={openClose.tuesday.tue_active}
            onChange={handleInputChangeTuesday}

          >
            <MenuItem value={1}>Open</MenuItem>
            <MenuItem value={0}>Closed</MenuItem>
          </Select>
          Wednesday
          <FormLabel>Opening Time</FormLabel>
          <Select
            id="wed_open"
            name="wed_open"
            label="What time will the lab Open on Wednesday"
            value={openClose.wednesday.wed_open}
            onChange={handleInputChangeWednesday}
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
          <FormLabel>Closing Time</FormLabel>
          <Select
            id="wed_close"
            name="wed_close"
            label="What time will the lab close on Wednesday"
            value={openClose.wednesday.wed_close}
            onChange={handleInputChangeWednesday}
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
          <Select
            id="wed_active"
            name="wed_active"
            label="Is the lab running on Wednesday"
            value={openClose.wednesday.wed_active}
            onChange={handleInputChangeWednesday}

          >
            <MenuItem value={1}>Open</MenuItem>
            <MenuItem value={0}>Closed</MenuItem>
          </Select>
          Thursday
          <FormLabel>Opening Time</FormLabel>
          <Select
            id="thu_open"
            name="thu_open"
            label="What time will the lab Open on Thursday"
            value={openClose.thursday.thu_open}
            onChange={handleInputChangeThursday}
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
          <FormLabel>Closing Time</FormLabel>
          <Select
            id="thu_close"
            name="thu_close"
            label="What time will the lab Open on Thursday"
            value={openClose.thursday.thu_open}
            onChange={handleInputChangeThursday}
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
          <Select
            id="thu_active"
            name="thu_active"
            label="Is the lab running on Thursday"
            value={openClose.thursday.thu_active}
            onChange={handleInputChangeThursday}

          >
            <MenuItem value={1}>Open</MenuItem>
            <MenuItem value={0}>Closed</MenuItem>
          </Select>
          Friday
          <FormLabel>Opening Time</FormLabel>
          <Select
            id="fri_open"
            name="fri_open"
            label="What time will the lab Open on Friday"
            value={openClose.friday.fri_open}
            onChange={handleInputChangeFriday}
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
          <FormLabel>Closing Time</FormLabel>
          <Select
            id="fri_close"
            name="fri_close"
            label="What time will the lab close on Friday"
            value={openClose.friday.fri_close}
            onChange={handleInputChangeFriday}
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
          <Select
            id="fri_active"
            name="fri_active"
            label="Is the lab running on Friday"
            value={openClose.friday.fri_active}
            onChange={handleInputChangeFriday}
          >
            <MenuItem value={1}>Open</MenuItem>
            <MenuItem value={0}>Closed</MenuItem>
          </Select>
          <Button onClick={submitTimes}>Submit Times</Button>
        </Box>
      </article>
    </>
  );
};

export default OpenClosingTimes;
