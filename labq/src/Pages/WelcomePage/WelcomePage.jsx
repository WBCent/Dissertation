import { Button, Container } from "@mui/material";

const WelcomePage = () => {
  return (
    <>
    <Container className="content-center">
      <img
        src="/home/wemb1/Documents/Dissertation/Dissertation/labq/src/assets/01-foundation-black-text.png"
        alt="St Andrews University Logo"
      />
      <h1>Welcome to LabQ, a question form that allows you to ask tutors for help during lab sessions</h1>
      <Button variant="contained">Sign In</Button>
    </Container>
    </>
  );
};

export default WelcomePage;