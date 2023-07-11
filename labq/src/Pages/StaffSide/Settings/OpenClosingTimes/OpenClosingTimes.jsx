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
            <MenuItem value={"CS1000"}>CS1000</MenuItem>
            <MenuItem value={"CS2000"}>CS2000</MenuItem>
          </Select>
          <FormLabel>Closing Time</FormLabel>

          <Select
            id="level"
            name="level"
            label="Select the level at which you teach"
            value={OpenClosingTimes.mon_close}
            onChange={handleInputChange}
          >
            <MenuItem value={"CS1000"}>CS1000</MenuItem>
            <MenuItem value={"CS2000"}>CS2000</MenuItem>
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
            <MenuItem value={"CS1000"}>CS1000</MenuItem>
            <MenuItem value={"CS2000"}>CS2000</MenuItem>
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
            <MenuItem value={"CS1000"}>CS1000</MenuItem>
            <MenuItem value={"CS2000"}>CS2000</MenuItem>
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
            <MenuItem value={"CS1000"}>CS1000</MenuItem>
            <MenuItem value={"CS2000"}>CS2000</MenuItem>
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
            <MenuItem value={"CS1000"}>CS1000</MenuItem>
            <MenuItem value={"CS2000"}>CS2000</MenuItem>
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
            <MenuItem value={"CS1000"}>CS1000</MenuItem>
            <MenuItem value={"CS2000"}>CS2000</MenuItem>
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
            <MenuItem value={"CS1000"}>CS1000</MenuItem>
            <MenuItem value={"CS2000"}>CS2000</MenuItem>
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
            <MenuItem value={"CS1000"}>CS1000</MenuItem>
            <MenuItem value={"CS2000"}>CS2000</MenuItem>
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
            <MenuItem value={"CS1000"}>CS1000</MenuItem>
            <MenuItem value={"CS2000"}>CS2000</MenuItem>
          </Select>
          <Button onClick={submitTimes}>Submit Times</Button>
        </Box>
      </article>
    </>
  );
};

export default OpenClosingTimes;
