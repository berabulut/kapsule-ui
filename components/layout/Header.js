import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Typography,
  Drawer,
  List,
  Divider,
  ListItem,
  InputBase,
} from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";

import { Menu, Link, Search, GitHub } from "@material-ui/icons";

import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  navbar: {
    display: "flex",
    alignItems: "center",
    padding: "0px 100px",
    [theme.breakpoints.down("md")]: {
      padding: "0px 25px",
    },
    [theme.breakpoints.down("xs")]: {
      margin: "0px",
      padding: "16px",
    },
  },
  list: {
    width: 250,
  },
  button: {
    display: "inline-block",
    fontWeight: 600,
    color: "#222831",
    marginBottom: "16px",
    marginTop: "16px",
    fontSize: "3rem",
    "&:hover": {
      cursor: "pointer",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "24px",
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: "8px",
      marginRight: "8px",
      fontSize: "2.1rem",
      marginBottom: "0px",
      marginTop: "0px",
    },
  },
  icon: {
    fontSize: "60px",
    transform: "rotate(-45deg)",
    color: "#00ADB5",
    [theme.breakpoints.down("xs")]: {
      fontSize: "40px",
    },
  },
  mobileMenu: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
    },
  },
  menuIcon: {
    fontSize: "40px",
  },
  search: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    color: "#c5c4c4",
    zIndex: "99",
    padding: theme.spacing(0, 1),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchInput: {
    color: "#808080",
    backgroundColor: "#F5F5F5",
    fontWeight: "500",
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  gitIcon: {
    color: "#00ADB5",
    [theme.breakpoints.down("lg")]: {
      paddingLeft: "48px",
    },
    [theme.breakpoints.down("md")]: {
      paddingLeft: "24px",
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "24px",
      display: "none"
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const router = useRouter();

  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenDrawer(open);
  };

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <div className={classes.navbar}>
      <Typography
        onClick={() => router.push("/")}
        className={classes.button}
        variant="h1"
      >
        <Link className={classes.icon} />
        Kapsule
      </Typography>
      <div style={{ flex: 1 }}></div>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <Search />
        </div>
        <InputBase
          placeholder="Search with ID"
          classes={{
            input: classes.searchInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
      <div className={classes.gitIcon}>
        <GitHub />
      </div>
      <div className={classes.mobileMenu}>
        <Menu className={classes.menuIcon} onClick={toggleDrawer(true)} />
      </div>
      <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
};

export default Header;
