import { useLayoutEffect } from "react";
import { useEffect, useState } from "react";

let queuePlace = {
    place_in_queue: ''
};
let question_id;

const Analytics = () => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function queueRetrieval() {
            setLoading(true)
            await placeInQueue();
            setLoading(false)
        }
        
        queueRetrieval();
    }, [])


    const placeInQueue = async () => {
        let justAsked = await fetch("http://localhost:5000/retrievejustasked");
        let response = await justAsked.json();
        question_id = response.retrieve[0].question_id


        let queuePlaceJson = await fetch('http://localhost:5000/retrieveplaceinqueue', {
            method: "POST",
            body: JSON.stringify({question_id}),
            headers: {
              "Content-Type": "application/json",
            },
        })
        let random = await queuePlaceJson.json();
        console.log(random)
        queuePlace.place_in_queue = random.queuePlace[0].place_in_queue
        console.log(queuePlace)
    }


  return (
    <>
      <h1>You have submitted your question</h1>
      <p>Expected Wait time: </p>
      <p>No. in the queue: {loading == false ? queuePlace.place_in_queue : <>Loading</>}</p>
    </>
  );
};
export default Analytics