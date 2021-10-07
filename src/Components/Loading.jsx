import Spinner from "react-spinkit";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
export default function Loading() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Spinner name="ball-spin-fade-loader" color="rgb(63,81,181)" fadeIn="none" />
    </div>
  );
}
