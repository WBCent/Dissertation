import { useLayoutEffect } from "react";
import { useEffect, useState } from "react";
import authAccess from "../../../Context/auth-access";
import { useContext } from "react";
import { Typography } from "@mui/material";
import questionSync from "../../../Context/QuestionSync";

let place_in_queue;
let question_id;
let expected_wait_time;
let teacher;

const Analytics = () => {
  const [loadingState, setLoadingState] = useState(true);
  const [loadingWaitTime, setLoadingWaitTime] = useState(true);
  const [teacherAssigned, setTeacherAssigned] = useState(false);
  let { questionSub, setQuestionSub } = useContext(questionSync);
  const [reload, setReload] = useState(false);

  setTimeout(()=> {
    if(reload == false) {
      setReload(true)
    } else {
      setReload(false)
    }
  }, 60000)

  let {
    accessToken,
    setAccessToken,
    username,
    setUsername,
    loading,
    setLoading,
  } = useContext(authAccess);

  useEffect(() => {
    console.log("A minute in between");
    if (username != "") {
      placeInQueue()
        .then(async () => {
          await fetchWaitTime();
        })
        .then(() => {
          setLoadingState(false);
        })
        .then(() => {
          setLoadingWaitTime(false);
        });
    }
  }, [loading, username, reload]);

  const placeInQueue = async () => {
    console.log("place in queue is activating with: ", username);
    let justAsked = await fetch("http://localhost:5000/retrievejustasked", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ username }),
    });
    let response = await justAsked.json();
    question_id = response.retrieve[0].question_id;

    console.log(response);

    let queuePlaceJson = await fetch(
      "http://localhost:5000/retrieveplaceinqueue",
      {
        method: "POST",
        body: JSON.stringify({ question_id }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let random = await queuePlaceJson.json();
    console.log(random);
    place_in_queue = random[0].place_in_queue;
    console.log(place_in_queue);
  };

  const fetchWaitTime = async () => {
    let waitTimejson = await fetch("/fetchwaittime");
    let waitTime = await waitTimejson.json();
    console.log('This is the wait time', waitTime);
    //Need to calculate it by number in the queue
    expected_wait_time = waitTime.avgTimeWaited/(place_in_queue - 1);
    console.log(expected_wait_time);
  };

  const fetchAssignedTeacher = async() => {
    setTeacherAssigned(false)
    let fetchjson = await fetch("/retrieveAssignedTeacher", {
      method: 'POST',
      body: JSON.stringify({username}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    let result = fetchjson.json();
    teacher = result[0];
    setTeacherAssigned(true)
  }



  return (
    <>{questionSub == true ? (<>
      <Typography variant="h6" sx={{fontWeight: 'bold', textAlign: 'center', mt: 3, mb: 2}}>Thank you for submitting a question, the teacher will be around soon</Typography>

      <Typography variant="h6">
        Expected Wait time: {loadingWaitTime == false ? (isNaN(expected_wait_time)? (<>You are first in the queue, the teacher will be around as fast as possible</>) : (Math.round(expected_wait_time == 0) ? <>Not enough data collected yet to know how long it will take</> : `${Math.round(expected_wait_time)} minute(s)`)) : <></>}{" "}
      </Typography>
      <Typography variant="h6">No. in the queue: {loadingState == false ? <>{`${place_in_queue}`}</> : <>Loading...</>}</Typography>
      <Typography variant="h6">{teacherAssigned == true ? (<>The teacher assigned to your question is: </>) : (<>There is no teacher assigned to your question yet.</>)}</Typography>
    </>) : (
      <></>
    )}</>
    
  );
};
export default Analytics;
