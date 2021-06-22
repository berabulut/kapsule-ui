import { makeStyles } from "@material-ui/core/styles";

export const footerStyles = makeStyles((theme) => ({
  root: {
    minHeight: "200px",
    backgroundColor: "#F5F5F5",
  },
  container: {
    marginBottom: "0px",
    [theme.breakpoints.up("xs")]: {
      margin: "0px",
    },
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
    [theme.breakpoints.down("xs")]: {
      justifyContent: "space-around",
    },
  },
  title: {
    marginBottom: "16px",
    fontWeight: 450,
    color: "#808080",
    letterSpacing: ".025em",
  },
  item: {
    fontWeight: 450,
    marginBottom: "8px",
    fontFamily: "Lato",
    color: "#808080",
    letterSpacing: ".025em",
    "&:hover": {
      color: "#00ADB5",
    },
  },
  iconContainer: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "space-evenly",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "8px",
    },
  },
  icon: {
    color: "#808080",
    marginRight: "32px",
    transition: "color 0.3s",
    "&:hover": {
      color: "#00ADB5",
    },
    [theme.breakpoints.down("xs")]: {
      marginRight: "0px",
    },
  },
}));

export const headerStyles = makeStyles((theme) => ({
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