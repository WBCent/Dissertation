import React from "react";

const Comments = React.createContext({
    qscomment: {},
    setQSComment: () => {},
    qscommentexists: false,
    setQSCommentExists: () => {},
    qsEditComment: false,
    setQSEditComment: () => {}
});

export default Comments;