import React from "react";
//https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component

const Comments = React.createContext({
    qscomment: {},
    setQSComment: () => {},
    qscommentexists: false,
    setQSCommentExists: () => {},
    qsEditComment: false,
    setQSEditComment: () => {}
});

export default Comments;