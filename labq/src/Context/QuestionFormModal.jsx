import React from "react";
//https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component

const  LinkedQuestionStatus = React.createContext({
    linkedQuestionModalStatus: false,
    setLinkedQuestionModalStatus: () => {}
})

export default LinkedQuestionStatus;