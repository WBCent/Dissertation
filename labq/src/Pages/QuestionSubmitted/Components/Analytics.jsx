import { useLayoutEffect } from "react";
import { useEffect, useState } from "react";

let place_in_queue;
let question_id;

const Analytics = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    placeInQueue().then(() => {
      setLoading(false);
    });
  }, [loading]);

  const placeInQueue = async () => {
    let justAsked = await fetch("http://localhost:5000/retrievejustasked");
    let response = await justAsked.json();
    question_id = response.retrieve[0].question_id;

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

  return (
    <>
      <h1>You have submitted your question</h1>
      <p>Expected Wait time: </p>
      <p>No. in the queue: </p>
      {loading == false ? <p>{`${place_in_queue}`}</p> : <p>Loading...</p>}
    </>
  );
};
export default Analytics;
