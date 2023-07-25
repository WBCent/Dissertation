import { useState } from "react";
import { useEffect } from "react";
import { Select, MenuItem } from "@mui/material";

let currentSessionRequests = {};
let values = "CS1002";
let moduleRequests;
let solved = {};
let educator = "";
let fetchedEducators = [];
let requestsSolvedEducator = {};

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState(values);
  const [educatorValue, setEducatorValue] = useState(educator);
  //Number of requests per student, module
  //number of requests with solutions, number of requests resolved by each helper, average time to resolve request etc.

  useEffect(() => {
    requestsPerModule()
      .then(() => {
        noRequestsOverall();
      })
      .then(async () => {
        await requestsWithSolutions();
      })
      .then(async () => {
        await fetchEducators();
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    requestsSolvedByEducator();
  }, [educatorValue])





  const handleInputChange = (e) => {
    const { name, value } = e.target; //get the name and value from the input that has been changed
    console.log("changing", name, value);
    setFormValues(value); //set all the other form values to their previous value, and the new one to the changed value
  };

  const handleInputChangeEducator = (e) => {
    const { name, value } = e.target; //get the name and value from the input that has been changed
    console.log("changing", name, value);
    setEducatorValue(value); //set all the other form values to their previous value, and the new one to the changed value
  };

  const noRequestsOverall = async () => {
    let sendjson = await fetch("http://localhost:5000/noofrequests");
    currentSessionRequests = await sendjson.json();
    console.log(currentSessionRequests);
  };

  const requestsPerModule = async () => {
    let requestsPerModule = await fetch(
      "http://localhost:5000/requestspermodule",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ formValues }),
      }
    );
    let response = await requestsPerModule.json();
    console.log(response);
    moduleRequests = response;
  };

  const requestsWithSolutions = async () => {
    let solvedjson = await fetch("http://localhost:5000/requestsWithSolutions");
    solved = await solvedjson.json();
    console.log(solved);
  };

  const fetchEducators = async () => {
    let educatorsjson = await fetch("http://localhost:5000/retrieveteachers");
    fetchedEducators = await educatorsjson.json();
    console.log(fetchedEducators);
  };

  const requestsSolvedByEducator = async () => {
    let requestsSolvedEducatorjson = await fetch('http://localhost:5000/requestspereducator', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({educatorValue})
    })
    requestsSolvedEducator  = await requestsSolvedEducatorjson.json();
    console.log(requestsSolvedEducator)
  }

  return (
    <article className="grid-cols-2 grid-rows-4 outline shadow-lg rounded-lg pl-10 pr-10 pt-4 pb-4 mt-4">
      {loading == false ? (
        <>
          <p>
            <strong>Analytics:</strong>
          </p>
          <p>
            Total Number of Requests Overall:
            {currentSessionRequests["totalRequests"]}
          </p>
          <p>
            Estimated number of students:{" "}
            {currentSessionRequests["totalStudents"]}
          </p>
          <p>
            Number of Requests per student:{" "}
            {currentSessionRequests["requests_per_student"]}
          </p>
          <p>Number of Requests in </p>
          <Select
            id="moduleCode"
            name="moduleCode"
            label="Select a module code"
            value={formValues}
            onChange={handleInputChange}
          >
            <MenuItem value={"CS1002"}>CS1002</MenuItem>
            <MenuItem value={"CS1003"}>CS1003</MenuItem>
            <MenuItem value={"CS1006"}>CS1006</MenuItem>
            <MenuItem value={"CS1007"}>CS1007</MenuItem>
            <MenuItem value={"CS2001"}>CS2001</MenuItem>
            <MenuItem value={"CS2101"}>CS2101</MenuItem>
            <MenuItem value={"CS2002"}>CS2002</MenuItem>
            <MenuItem value={"CS2003"}>CS2003</MenuItem>
            <MenuItem value={"CS2006"}>CS2006</MenuItem>
          </Select>{" "}
          <p>module:{moduleRequests.totalRequestsByModule}</p>
          <p>
            Number of requests with solutions:
            {solved["solvedRequests"][0]["COUNT(*)"]}
          </p>
          <p>
            Percentage of requests that have been solved: {solved.solvedPercent}
          </p>
          <p>
            Number of requests solved by
            <Select
              id="educator"
              name="educator"
              label="educator"
              value={educatorValue}
              onChange={handleInputChangeEducator}
            >
              {fetchedEducators.map((obj) => (
                <MenuItem value={`${obj.educator_name}`}>
                  {obj.educator_name}
                </MenuItem>
              ))}
            </Select>{" "}
            helper: {requestsSolvedEducator.solvedCountByEducator["COUNT(*)"]}
          </p>
          <p>Average Time to resolve request:</p>
        </>
      ) : (
        <p>loading</p>
      )}
    </article>
  );
};

export default Analytics;
