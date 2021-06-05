import React, { useState, useRef } from "react";
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
import { headerStyles } from "./styles";
import {
  Menu,
  Link,
  Search,
  GitHub,
  Home,
  Mail,
  Sort,
  Twitter,
} from "@material-ui/icons";
import Alert from "@./components/Alert";

const Header = () => {
  const classes = headerStyles();
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
        <ListItem
          button
          key="Contact"
          onClick={() => handleListButtonClick("/")}
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
          <IconButton className={classes.contactIcon} aria-label="github">
            <a
              href="https://github.com/berabulut/kapsule"
              target="_blank"
              rel="noopener"
            >
              <GitHub style={{ fontSize: "1.75rem" }} />
            </a>
          </IconButton>
          <IconButton className={classes.contactIcon} aria-label="twitter">
            <a
              href="https://twitter.com/berabulut"
              target="_blank"
              rel="noopener"
            >
              <Twitter style={{ fontSize: "1.75rem" }} />
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
