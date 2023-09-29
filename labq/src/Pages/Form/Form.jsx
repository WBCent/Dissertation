import React from "react";
import Question from './Components/Question';
import { useEffect, useState } from "react";
import { Container } from "@mui/material";


const Form = () => {
    const [openLab, setOpenLab] = useState(false)
    useEffect(() => {
        canSubmit();
    }, [])


    const canSubmit = async () => {
        //https://www.w3schools.com/jsref/jsref_getday.asp
        const weekday = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
        const d = new Date();
        let day = weekday[d.getDay()];
        let hours = d.getHours();
        let minutes = d.getMinutes();
        //End of copied from W3Schools
        console.log(day)
        let labHoursjson = await fetch('/fetchOpeningTimes', {
          method: 'POST',
          body: JSON.stringify({day}),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        let labHours = await labHoursjson.json();
        console.log("THese are the laboratory hours", labHours);
        if(labHours[0].active != 0 && labHours[0].active != null) {
        if(labHours[0].opening_time != null && labHours[0].closing_time !=null) {
            let openingHourAndMinutes = labHours[0].opening_time.split(":")
            let closingHourAndMinutes = labHours[0].closing_time.split(":")
            console.log("This is the opening time", openingHourAndMinutes)
            if(day == labHours[0].day_of_the_week) {
                if(hours > openingHourAndMinutes[0] && hours < closingHourAndMinutes[0]) {
                  if(hours == openingHourAndMinutes[0]) {
                    if(minutes >= openingHourAndMinutes[1]) {
                      setOpenLab(true)
                    } else {
                      setOpenLab(false)
                    }
                  } else if (hours == closingHourAndMinutes[0]) {
                    if(minutes <= closingHourAndMinutes[1]) {
                      setOpenLab(true)
                    } else {
                      setOpenLab(false)
                    }
                  } else {
                    setOpenLab(true)
                  }
                } else {
                  setOpenLab(false)
                }
              } else {
                setOpenLab(false)
              }
        } else {
            setOpenLab(false)
        }
        } else {
          setOpenLab(false)
        }
      }
    




    return (
        <>{openLab == false ? (<><Container>
                <article className="grid-cols-2 grid-rows-4 outline outline-red-500 shadow-lg rounded-lg pl-10 pr-10 pt-4 pb-4 mt-5">
          <p className="text-center text-red-500"><strong>It is outside of laboratory hours and so you cannot submit a question. Please come back when Laboratory hours are open.</strong></p>
        </article></Container>
        </>) : (<Question />)}</>
    )
}

export default Form;
//npm install @mui/material @emotion/react @emotion/styled