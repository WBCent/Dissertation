import React from "react";
//https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component

const solution = React.createContext({
    solutionOpen: false,
    setSolutionStatus: () => {}
})

export default solution;