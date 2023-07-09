import React from "react";

const ModalStatus = React.createContext({
    modalOpenStatus: false,
    setModalOpenStatus: () => {}
})

export default ModalStatus;