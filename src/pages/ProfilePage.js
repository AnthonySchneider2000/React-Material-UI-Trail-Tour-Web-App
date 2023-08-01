import React, { useState } from "react";
import {
  CssBaseline,
  Button,
  Typography,
  Container,
  Box,
  Paper,
} from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { ThemeProvider } from "@mui/material/styles";
import { Toaster, toast } from "react-hot-toast";
import styles from "../styles/app.module.css";
import { Link } from "react-router-dom"; // Import the Link component from react-router-dom
import MuteSwitch from "../components/MuteSwitch.js";
import StyledAvatar from "../components/StyledAvatar.js";
import Sidebar from "../components/Sidebar";
import CustomDropzone from "../components/CustomDropzone";
import UploadedImages from "../components/UploadedImages";
import Footer from "../components/Footer";
import { useThemeContext } from "../utils/ThemeContext";

const HomePage = () => {
  const {
    currentTheme,
    handleThemeChange,
    isDarkMode,
    toggleDarkMode,
    colorPickerColor,
    userInputColor,
    handleColorChange,
  } = useThemeContext();
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleDrop = (files) => {
    setUploadedFiles(files);
  };

  const createToast = (message) => {
    let toastBackground = currentTheme.palette.primary.main;
    let toastColor = currentTheme.palette.primary.contrastText;
    toast.success(message, {
      style: {
        background: toastBackground,
        color: toastColor,
      },
    });
  };
  const handleNewMessages = () => {
    createToast("You have 3 new messages");
  };

  const onThemeChange = () => {
    //possibly darken color picker color
    handleThemeChange(userInputColor);
  };
  return (
    <>
      <Toaster />

      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        {/* heading */}
        <div className={styles.heading}>
          <Typography variant="h1" component="h1" gutterBottom>
            Profile
          </Typography>
        </div>

        {/* content */}
        <Container style={{ textAlign: "center" }}>
          <Box
            display="flex"
            flexDirection={"column"}
            alignItems="center"
            mt={2}
          >
            {/* link to edit profile */}
            <Link to="/edit-profile" state={{}}>
              <Button variant="contained" style={{ margin: "10px"}} startIcon={<ManageAccountsIcon />}>Edit Profile</Button>
            </Link>
            <CustomDropzone onDrop={handleDrop} />
            <Box mt={2}>
              {uploadedFiles.length > 0 && (
                <Paper
                  elevation={3}
                  style={{ maxHeight: "600px", overflowY: "auto" }}
                >
                  <UploadedImages uploadedFiles={uploadedFiles} />
                </Paper>
              )}
            </Box>
          </Box>
        </Container>

        {/* mute switch */}
        <div className={styles.muteSwitch}>
          <MuteSwitch />
        </div>

        {/* avatar */}
        <div className={styles.avatar}>
          <StyledAvatar>TS</StyledAvatar>
        </div>

        {/* drawer */}
        <div>
          <Sidebar
            handleThemeChange={onThemeChange}
            isDarkMode={isDarkMode}
            handleDarkModeToggle={toggleDarkMode}
            handleNewMessages={handleNewMessages}
            colorPickerColor={colorPickerColor}
            handleColorChange={handleColorChange}
            currentTheme={currentTheme}
          />
        </div>
        {/* footer */}
        <Footer currentTheme={currentTheme} />
      </ThemeProvider>
    </>
  );
};

export default HomePage;
