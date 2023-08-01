import React from "react";
import { CssBaseline, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom"; // Import the Link component from react-router-dom
import styles from "../styles/app.module.css";
import MuteSwitch from "../components/MuteSwitch.js";
import StyledAvatar from "../components/StyledAvatar.js";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useThemeContext } from "../utils/ThemeContext";
import { DatePicker } from "@mui/x-date-pickers";

const EditProfilePage = () => {
  const {
    currentTheme,
    handleThemeChange,
    isDarkMode,
    toggleDarkMode,
    colorPickerColor,
    userInputColor,
    handleColorChange,
  } = useThemeContext();

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

        <div className={styles.heading}>
          <Typography variant="h1" component="h1" gutterBottom>
            Edit Profile
          </Typography>
        </div>

        <div className={styles.centeredContent}>
          {/* date of birth entry */}
          <Typography gutterBottom>Date of Birth</Typography>
          <DatePicker />
        </div>

        {/* mute switch */}
        <div className={styles.muteSwitch}>
          <MuteSwitch />
        </div>
        {/* avatar */}
        <Link
          to="/profile"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className={styles.avatar}>
            <StyledAvatar>TS</StyledAvatar>
          </div>
        </Link>

        {/* drawer */}
        <div>
          <Sidebar
            handleThemeChange={onThemeChange}
            isDarkMode={isDarkMode}
            handleDarkModeToggle={toggleDarkMode}
            handleNewMessages={handleNewMessages}
            colorPickerColor={colorPickerColor}
            handleColorChange={handleColorChange}
          />
        </div>
        {/* footer */}
        <Footer currentTheme={currentTheme} />
      </ThemeProvider>
    </>
  );
};

export default EditProfilePage;