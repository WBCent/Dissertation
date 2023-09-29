import React from "react";
//https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component

const edit = React.createContext({
    editOpen: false,
    setEditOpen: (value) => {editOpen = value},
    loadingEdit: true,
    setLoadingEdit: (value) => { loadingEdit = value},
    loadingRetrieveEdit: false,
    setLoadingRetrieveEdit: (value) => { loadingRetrieveEdit = value }
});

export default edit;