import React from "react";
import { Typography } from "@mui/material";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { drawerWidth, maxDrawerWidth } from "../../utils/constants";
import MuteSwitch from "./MuteSwitch";
import { AvatarMenu } from "./StyledAvatar";
import Box from "@mui/material/Box";
// import { Link } from "react-router-dom";

const AppBarContainer = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth})`,
    minWidth: `calc(100% - ${maxDrawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const AppBarComponent = ({ open, toggleDrawer, title }) => {
  return (
    <AppBarContainer position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          {title}
        </Typography>
        {/* mute switch */}
        <MuteSwitch />
        {/* notifications */}
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        {/* avatar */}
        <Box style={{ marginLeft: "15px" }}>
          {/* <Link
            to="/profile"
            style={{ textDecoration: "none", color: "inherit" }}
          > */}
          <AvatarMenu>TS</AvatarMenu>
          {/* </Link> */}
        </Box>
      </Toolbar>
    </AppBarContainer>
  );
};

export default AppBarComponent;
