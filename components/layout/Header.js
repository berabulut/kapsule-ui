import React, { useState } from "react";
import { useRouter } from "next/router";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Menu, Link } from "@material-ui/icons";

import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  navbar: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      margin: "0px",
      padding: "16px",
      alignItems: "center",
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
    marginLeft: "64px",
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
