import { AppBar, Box, CssBaseline, Toolbar, Typography } from "@mui/material";


const RootLayout = () => {
    return (
            <Box>
                <CssBaseline>
                    <AppBar position="static">
                        <Toolbar sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Box>
                            <Typography>Question Form</Typography>
                            <Typography>Previous Questions</Typography>
                            <Typography>Question Bank</Typography>
                            <Typography>ChatGPT</Typography>
                        </Box>
                        </Toolbar>
                    </AppBar>
                </CssBaseline>
            </Box>
    )
}

export default RootLayout;