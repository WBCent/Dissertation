import React from "react";
//https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component

const StaffProfile = React.createContext({
    StaffProfileOpen: false,
    setStaffProfileOpen: () => {},
    addTeacher: 0,
    setAddTeacher: (value) => {addTeacher = value}
})

export default StaffProfile;