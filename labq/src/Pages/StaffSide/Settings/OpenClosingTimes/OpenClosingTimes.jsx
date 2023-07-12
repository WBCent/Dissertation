import { Box, Select, MenuItem, FormLabel, Button } from "@mui/material";
import { useState } from "react";

let openClosingTimes = {
  mon_open: "",
  mon_close: "",
  tue_open: "",
  tue_close: "",
  wed_open: "",
  wed_close: "",
  thu_open: "",
  thu_close: "",
  fri_open: "",
  fri_close: "",
};

const OpenClosingTimes = () => {
  const [openClose, setOpenClose] = useState(openClosingTimes);

  const handleInputChange = (e) => {
    const { name, value } = e.target; //get the name and value from the input that has been changed
    console.log("changing", name, value);
    setOpenClose({ ...openClose, [name]: value }); //set all the other form values to their previous value, and the new one to the changed value
  };

  const submitTimes = async () => {
    let sendTimes = await fetch()
    let response = await sendTimes.json();
    console.log(response)
  }

  return (
    <>
      <h1>Hello there this is the opening and closing time page</h1>
      <article className="grid-cols-2 grid-rows-4 outline shadow-lg rounded-lg pl-10 pr-10 pt-4 pb-4">
        <Box component="form">
          Monday
          <FormLabel>Opening Time</FormLabel>
          <Select
            id="level"
            name="level"
            label="Select the level at which you teach"
            value={OpenClosingTimes.mon_open}
            onChange={handleInputChange}
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
            id="level"
            name="level"
            label="Select the level at which you teach"
            value={OpenClosingTimes.mon_close}
            onChange={handleInputChange}
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
          Tuesday
          <FormLabel>Opening Time</FormLabel>

          <Select
            id="level"
            name="level"
            label="Select the level at which you teach"
            value={OpenClosingTimes.tue_open}
            onChange={handleInputChange}
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
            id="level"
            name="level"
            label="Select the level at which you teach"
            placeholder="Closing Time"
            autoWidth={true}
            value={OpenClosingTimes.tue_close}
            onChange={handleInputChange}
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
          Wednesday
          <FormLabel>Opening Time</FormLabel>

          <Select
            id="level"
            name="level"
            label="Select the level at which you teach"
            placeholder="Opening Time"
            autoWidth={true}
            value={OpenClosingTimes.wed_open}
            onChange={handleInputChange}
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
            id="level"
            name="level"
            label="Select the level at which you teach"
            placeholder="Closing Time"
            autoWidth={true}
            value={OpenClosingTimes.wed_close}
            onChange={handleInputChange}
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
          Thursday
          <FormLabel>Opening Time</FormLabel>

          <Select
            id="level"
            name="level"
            label="Select the level at which you teach"
            placeholder="Opening Time"
            autoWidth={true}
            value={OpenClosingTimes.thu_open}
            onChange={handleInputChange}
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
            id="level"
            name="level"
            label="Select the level at which you teach"
            placeholder="Closing Time"
            autoWidth={true}
            value={OpenClosingTimes.thu_close}
            onChange={handleInputChange}
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
          Friday
          <FormLabel>Opening Time</FormLabel>
          <Select
            id="level"
            name="level"
            label="Select the level at which you teach"
            renderValue="Opening Time"
            autoWidth={true}
            value={OpenClosingTimes.fri_open}
            onChange={handleInputChange}
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
            id="level"
            name="level"
            label="Select the level at which you teach"
            placeholder="Closing Time"
            autoWidth={true}
            value={openClosingTimes.fri_close}
            onChange={handleInputChange}
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
          <Button onClick={submitTimes}>Submit Times</Button>
        </Box>
      </article>
    </>
  );
};

export default OpenClosingTimes;
