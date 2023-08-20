import React from "react";
//https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component

const ModalStatus = React.createContext({
    modalOpenStatus: false,
    setModalOpenStatus: () => {}
})

export default ModalStatus;