import Analytics from "./Analytics/Analytics"
import OpenClosingTimes from "./OpenClosingTimes/OpenClosingTimes"
import StaffSchedule from "./StaffSchedule/StaffSchedule"
import { Container } from "@mui/material"

const Settings = () => {
    return (
        <>
        <Container>
            <OpenClosingTimes />
            <StaffSchedule />
            <Analytics />
        </Container>
        </>
    )
}

export default Settings;