import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {},
  create: {
    marginLeft: "auto",
  },
}));

export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  const handelCreateRoute = () => {
    history.push("/create");
  };
  const handelHomeRoute = () => {
    history.replace("/");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handelHomeRoute}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Students
          </Typography>
          <Button color="inherit" className={classes.create} onClick={handelCreateRoute}>
            Create Student
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
