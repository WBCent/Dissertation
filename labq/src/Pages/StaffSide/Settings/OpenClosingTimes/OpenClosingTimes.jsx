import { Box, Select, MenuItem, FormLabel, Button } from "@mui/material";
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

let openingAndClosingTimes;

const OpenClosingTimes = () => {
  const [openClose, setOpenClose] = useState(openClosingTimes);
  const [loaded, setLoaded] = useState(false);
  const [pastValues, setPastValues] = useState([]);

  useEffect(() => {
    fetchTimes().then(() => {
      setPastValues(openingAndClosingTimes)
    }).then(() => {
      console.log(openingAndClosingTimes)
      setLoaded(true)
    });
  }, []);

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
    openingAndClosingTimes = fetchedTimes;
    setPastValues(fetchedTimes)
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
      <article className="grid-cols-2 grid-rows-4 outline shadow-lg rounded-lg pl-10 pr-10 pt-4 pb-4 mt-4">
        {loaded == true ? (
          <Box component="form">
            <strong>Monday</strong>
            <br />
            <FormLabel>
              Opening Time
              <Select
                id="mon_open"
                name="mon_open"
                label="Monday Opening Time"
                value={openClose.monday.mon_open}
                defaultValue={openingAndClosingTimes[0].opening_time}
                onChange={handleInputChangeMonday}
                sx={{ minWidth: 100 }}
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
            </FormLabel>
            <FormLabel>Closing Time</FormLabel>
            <Select
              id="mon_close"
              name="mon_close"
              label="Monday Closing Time"
              value={openClose.monday.mon_close}
              onChange={handleInputChangeMonday}
              sx={{ minWidth: 100 }}
              defaultValue={openingAndClosingTimes[0].closing_time}
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
              sx={{ minWidth: 100 }}
              defaultValue={openingAndClosingTimes[0].active}
            >
              <MenuItem value={1}>Open</MenuItem>
              <MenuItem value={0}>Closed</MenuItem>
            </Select>
            <br />
            Tuesday
            <br />
            <FormLabel>Opening Time</FormLabel>
            <Select
              id="tue_open"
              name="tue_open"
              label="What time will the lab Open on Tuesday"
              value={openClose.tuesday.tue_open}
              onChange={handleInputChangeTuesday}
              sx={{ minWidth: 100 }}
              defaultValue={openingAndClosingTimes[1].opening_time}
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
              sx={{ minWidth: 100 }}
              defaultValue={openingAndClosingTimes[1].closing_time}
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
            Is the Lab Open on Tuesday
            <Select
              id="tue_active"
              name="tue_active"
              label="Is the lab running on Tuesday"
              value={openClose.tuesday.tue_active}
              onChange={handleInputChangeTuesday}
              sx={{ minWidth: 100 }}
              defaultValue={openingAndClosingTimes[1].active}
            >
              <MenuItem value={1}>Open</MenuItem>
              <MenuItem value={0}>Closed</MenuItem>
            </Select>
            <br />
            Wednesday
            <br />
            <FormLabel>Opening Time</FormLabel>
            <Select
              id="wed_open"
              name="wed_open"
              label="What time will the lab Open on Wednesday"
              value={openClose.wednesday.wed_open}
              onChange={handleInputChangeWednesday}
              sx={{ minWidth: 100 }}
              defaultValue={openingAndClosingTimes[2].opening_time}
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
              sx={{ minWidth: 100 }}
              defaultValue={openingAndClosingTimes[2].closing_time}
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
            Is the Lab Open on Wednesday
            <Select
              id="wed_active"
              name="wed_active"
              label="Is the lab running on Wednesday"
              value={openClose.wednesday.wed_active}
              onChange={handleInputChangeWednesday}
              sx={{ minWidth: 100 }}
              defaultValue={openingAndClosingTimes[2].active}
            >
              <MenuItem value={1}>Open</MenuItem>
              <MenuItem value={0}>Closed</MenuItem>
            </Select>
            <br />
            Thursday
            <br />
            <FormLabel>Opening Time</FormLabel>
            <Select
              id="thu_open"
              name="thu_open"
              label="What time will the lab Open on Thursday"
              value={openClose.thursday.thu_open}
              onChange={handleInputChangeThursday}
              sx={{ minWidth: 100 }}
              defaultValue={openingAndClosingTimes[3].opening_time}
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
              value={openClose.thursday.thu_close}
              onChange={handleInputChangeThursday}
              sx={{ minWidth: 100 }}
              defaultValue={openingAndClosingTimes[3].closing_time}
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
            Is the Lab Open on Thursday
            <Select
              id="thu_active"
              name="thu_active"
              label="Is the lab running on Thursday"
              value={openClose.thursday.thu_active}
              onChange={handleInputChangeThursday}
              sx={{ minWidth: 100 }}
              defaultValue={openingAndClosingTimes[3].active}
            >
              <MenuItem value={1}>Open</MenuItem>
              <MenuItem value={0}>Closed</MenuItem>
            </Select>
            <br />
            Friday
            <br />
            <FormLabel>Opening Time</FormLabel>
            <Select
              id="fri_open"
              name="fri_open"
              label="What time will the lab Open on Friday"
              value={openClose.friday.fri_open}
              onChange={handleInputChangeFriday}
              sx={{ minWidth: 100 }}
              defaultValue={openingAndClosingTimes[4].opening_time}
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
              sx={{ minWidth: 100 }}
              defaultValue={openingAndClosingTimes[4].closing_time}
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
            Is the Lab Open on Friday
            <Select
              id="fri_active"
              name="fri_active"
              label="Is the lab running on Friday"
              value={openClose.friday.fri_active}
              onChange={handleInputChangeFriday}
              sx={{ minWidth: 100 }}
              defaultValue={openingAndClosingTimes[4].active}
            >
              <MenuItem value={1}>Open</MenuItem>
              <MenuItem value={0}>Closed</MenuItem>
            </Select>
            <br />
            <Button onClick={submitTimes} sx={{ mt: 5 }}>
              Submit Times
            </Button>
          </Box>
        ) : (
          <p>Loading</p>
        )}
      </article>
    </>
  );
};

export default OpenClosingTimes;
