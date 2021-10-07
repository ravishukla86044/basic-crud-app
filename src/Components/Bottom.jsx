import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Bottom({ page, setPage }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination
        color="primary"
        count={10}
        variant="outlined"
        page={page}
        onChange={(e) => {
          setPage(e.value);
        }}
      />
    </div>
  );
}
