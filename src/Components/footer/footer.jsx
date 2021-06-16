import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

// Just the footer component where the links dont actually go anywhere since this is legit just an assignment aye :P

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Jiraffes
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "0vh",
    color: "white",
    marginTop: theme.spacing(10),
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    borderRadius: "25px",
    border: "solid",
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: "60px",
      position: "relative",
      background: "linear-gradient(45deg, #128aa8 30%, #6dd5ed 90%)",
    },
    bottom: "0",
  },
}));

const footers = [
  {
    title: "Store Information",
    description: [
      "Return Policy",
      "Privacy Policy",
      "Terms of Use",
      "Data Collection",
    ],
  },
  {
    title: "Social Media",
    description: ["Twitter", "Facebook", "Instagram"],
  },
  {
    title: "Company",
    description: ["About Us", "Contact Us"],
  },
];

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <Container
      maxWidth="xl"
      component="footer"
      className={classes.footer}
      color="#226ea1"
    >
      <Grid container spacing={3} justify="space-evenly">
        {footers.map((footer) => (
          <Grid item xs={6} sm={3} key={footer.title}>
            <Typography variant="h6" color="textPrimary" gutterbottom>
              {footer.title}
            </Typography>
            <ul>
              {footer.description.map((item) => (
                <li key={item}>
                  <Link href="#" variant="subtitle1" color="textSecondary">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </Grid>
        ))}
      </Grid>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
