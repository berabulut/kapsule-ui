import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import {
  Typography,
  SwipeableDrawer,
  List,
  Divider,
  ListItem,
  InputBase,
  IconButton,
  Snackbar,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  Menu,
  Link,
  Search,
  GitHub,
  Home,
  Mail,
  Sort,
  Twitter,
  Info
} from "@material-ui/icons";
import Alert from "@./components/Alert";

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
    color: "rgba(0, 0, 0, 0.87)",
    "&:hover": {
      cursor: "pointer",
    },
  },
  search: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    height: "48px",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
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
  drawer: {
    width: "100%",
    height: "auto",
  },
  list: {
    width: "100%",
  },
  mobileMenuIcon: {
    fontSize: "40px",
    color: "rgba(0, 0, 0, 0.75)",
    transform: "rotate( -180deg)",
    "&:hover": {
      cursor: "pointer",
    },
  },
  mobileMenuSearch: {
    width: "calc(100% - 32px)",
    height: "48px",
    margin: "12px auto 32px auto",
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  mobileMenuText: {
    fontWeight: "600",
    fontFamily: "Lato",
    marginTop: "16px",
    fontSize: "1.75rem",
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.75)",
  },
  listText: {
    fontWeight: "600",
    fontFamily: "Lato",
    fontSize: "1.15rem",
    color: "rgba(0, 0, 0, 0.75)",
  },
  listIcon: {
    color: "rgba(0, 0, 0, 0.65)",
  },
  contactIcon: {
    color: "#00ADB5",
    fontSize: "1.75rem",
    marginTop: "8px",
    marginRight: "24px",
  },
}));

const Header = () => {
  const classes = useStyles();
  const router = useRouter();
  const searchInputRef = useRef();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [alert, setAlert] = useState({});

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
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
    setOpenDrawer(false);
  };

  const handleListButtonClick = (route) => {
    router.push(route);
    setOpenDrawer(false);
  };

  const closeError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
  };

  const list = () => (
    <div className={classes.list} role="presentation">
      <List>
        <ListItem style={{ justifyContent: "flex-end" }} key="Button">
          <ListItemIcon
            style={{ justifyContent: "flex-end" }}
            onClick={toggleDrawer(false)}
          >
            <Sort className={classes.mobileMenuIcon} />
          </ListItemIcon>
        </ListItem>
        <ListItem>
          <ListItemText
            classes={{ primary: classes.mobileMenuText }}
            primary="STATISTICS"
          />
        </ListItem>
        <ListItem className={classes.mobileMenuSearch} key="Search">
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
        </ListItem>
        <ListItem button key="Home" onClick={() => handleListButtonClick("/")}>
          <ListItemIcon className={classes.listIcon}>
            <Home />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listText }}
            primary="HOME"
          />
        </ListItem>
        <Divider />
        <ListItem button key="About" onClick={() => handleListButtonClick("/about")}>
          <ListItemIcon className={classes.listIcon}>
            <Info />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listText }}
            primary="ABOUT"
          />
        </ListItem>
        <Divider />
        <ListItem
          button
          key="Contact"
          onClick={() => handleListButtonClick("/contact")}
        >
          <ListItemIcon className={classes.listIcon}>
            <Mail />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listText }}
            primary="CONTACT"
          />
        </ListItem>
        <Divider />
        <ListItem style={{ justifyContent: "center" }}>
          <IconButton className={classes.contactIcon} aria-label="twitter">
            <a
              href="https://twitter.com/berabulut"
              target="_blank"
              rel="noopener"
            >
              <Twitter style={{ fontSize: "1.75rem" }} />
            </a>
          </IconButton>
          <IconButton className={classes.contactIcon} aria-label="github">
            <a
              href="https://github.com/berabulut/kapsule"
              target="_blank"
              rel="noopener"
            >
              <GitHub style={{ fontSize: "1.75rem" }} />
            </a>
          </IconButton>
        </ListItem>
      </List>
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
      <SwipeableDrawer
        classes={{
          paper: classes.drawer,
        }}
        anchor="top"
        open={openDrawer}
        onClose={toggleDrawer(false)}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        {list()}
      </SwipeableDrawer>
      <Snackbar open={openError} autoHideDuration={4000} onClose={closeError}>
        <Alert onClose={closeError} severity={alert.type}>
          {alert.text}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Header;
