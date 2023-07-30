//TODOS: further consolidate sidebar, add bevel to sidebar, fix color selector changing theme, add profile page
import React, { useState } from "react";
import {
  CssBaseline,
  Button,
  Typography,
  Container,
  Box,
  Paper,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Toaster, toast } from "react-hot-toast";
import tinycolor from "tinycolor2";
import styles from "../styles/app.module.css";
import { Link } from "react-router-dom"; // Import the Link component from react-router-dom
import MuteSwitch from "../components/MuteSwitch.js";
import StyledAvatar from "../components/StyledAvatar.js";
import Sidebar from "../components/Sidebar";
import CustomDropzone from "../components/CustomDropzone";
import UploadedImages from "../components/UploadedImages";

const initialTheme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Initial primary color
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function lightenColor(primaryColor, amount) {
  const baseColor = tinycolor(primaryColor);
  const lightenedColor = baseColor.lighten(amount).toHexString();
  return lightenedColor;
}
function darkenColor(primaryColor, amount) {
  const baseColor = tinycolor(primaryColor);
  const darkenedColor = baseColor.darken(amount).toHexString();
  return darkenedColor;
}

const HomePage = () => {
  const [currentTheme, setCurrentTheme] = useState(initialTheme); // Define the state variable for the current theme
  const [darkMode, setDarkMode] = useState(false); // Track dark mode state, false = light mode, true = dark mode
  const [userInputColor, setUserInputColor] = useState("#1976d2"); // Default initial color
  const [colorPickerColor, setColorPickerColor] = useState("#1976d2"); // Default initial color
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleDrop = (files) => {
    setUploadedFiles(files);
  };
  const handleThemeChange = () => {
    const secondaryColor = darkenColor(userInputColor, 16);
    const backgroundColorDefault = lightenColor(userInputColor, 6);
    const backgroundColorPaper = lightenColor(userInputColor, 4);
    const themeMode = colorIsDark(userInputColor) ? "dark" : "light";

    const updatedTheme = createTheme({
      palette: {
        primary: {
          main: userInputColor,
        },
        secondary: {
          main: secondaryColor,
        },
        background: {
          default: backgroundColorDefault,
          paper: backgroundColorPaper,
        },
        mode: themeMode,
      },
      // Additional theme customizations...
    });

    setCurrentTheme(updatedTheme); // Update the current theme
    setColorPickerColor(darkenColor(userInputColor, 6)); // Update the color picker color to contrast with the new primary color
  };

  const colorIsDark = (hexColor) => {
    const threshold = 76; // this is the closest match I could find for the default material UI value
    const baseColor = tinycolor(hexColor);
    const luminance = baseColor.getLuminance() * 255;
    return luminance < threshold;
  };

  const handleColorChange = (event) => {
    setColorPickerColor(event.target.value);
    setUserInputColor(event.target.value);
  };

  const handleDarkModeToggle = () => {
    setDarkMode((prevMode) => !prevMode); // Toggle the dark mode state
    if (darkMode) {
      setCurrentTheme(lightTheme);
    } else {
      setCurrentTheme(darkTheme);
    }
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
            <Link to="/">
              <Button variant="contained" startIcon={<HomeIcon />}>
                Home Page
              </Button>
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
            handleThemeChange={handleThemeChange}
            darkMode={darkMode}
            handleDarkModeToggle={handleDarkModeToggle}
            handleNewMessages={handleNewMessages}
            colorPickerColor={colorPickerColor}
            handleColorChange={handleColorChange}
          />
        </div>
      </ThemeProvider>
    </>
  );
};

export default HomePage;