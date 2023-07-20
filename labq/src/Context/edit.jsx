import React from "react";

const edit = React.createContext({
    editOpen: false,
    setEditOpen: (value) => {editOpen = value},
    loadingEdit: true,
    setLoadingEdit: (value) => { loadingEdit = value},
    loadingRetrieveEdit: false,
    setLoadingRetrieveEdit: (value) => { loadingRetrieveEdit = value }
});

export default edit;