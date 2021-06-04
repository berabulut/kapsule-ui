import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import {
  Typography,
  Drawer,
  List,
  Divider,
  ListItem,
  InputBase,
  IconButton,
  Snackbar,
} from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";
import { Menu, Link, Search, GitHub } from "@material-ui/icons";
import Alert from "@/components/Alert";

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
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    height: "48px",
  },
  searchInput: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: "#808080",
    fontWeight: "500",
  },
  searchButton: {
    padding: 10,
    color: "#c5c4c4",
  },
  gitIcon: {
    color: "#00ADB5",
    marginLeft: "48px",
    [theme.breakpoints.down("md")]: {
      marginLeft: "24px",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "24px",
      display: "none",
    },
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const router = useRouter();
  const searchInputRef = useRef();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [alert, setAlert] = useState({});

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenDrawer(open);
  };

  const handleSearchButtonClick = () => {
    const input = searchInputRef.current.value;
    if (input.length > 12) {
      setAlert({ type: "warning", text: "ID must be shorter!" });
      setOpenError(true);
      return;
    }
    if (input.length < 8) {
      setAlert({ type: "warning", text: "ID is too short!" });
      setOpenError(true);
      return;
    }

    router.push("/stats/" + input);
  };

  const closeError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
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
        <InputBase
          className={classes.searchInput}
          placeholder="Search with ID"
          inputProps={{ maxLength: 12, "aria-label": "Search with ID" }}
          inputRef={searchInputRef}
        />
        <IconButton
          type="submit"
          className={classes.searchButton}
          aria-label="search"
          onClick={handleSearchButtonClick}
        >
          <Search />
        </IconButton>
      </div>
      <div className={classes.gitIcon}>
        <a
          href="https://github.com/berabulut/kapsule"
          target="_blank"
          rel="noopener"
        >
          <GitHub />
        </a>
      </div>
      <div className={classes.mobileMenu}>
        <Menu className={classes.menuIcon} onClick={toggleDrawer(true)} />
      </div>
      <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
      <Snackbar open={openError} autoHideDuration={4000} onClose={closeError}>
        <Alert onClose={closeError} severity={alert.type}>
          {alert.text}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Header;
