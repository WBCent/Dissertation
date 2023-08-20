import React from "react";
//https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component

const questionSync = React.createContext({
    questionSub: false,
    setQuestionSub: () => {}
})

export default questionSync;