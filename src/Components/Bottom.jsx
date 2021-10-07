import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Bottom({ pagination, setPage, totalPages, sort }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <Pagination
        color="primary"
        count={totalPages || 10}
        variant="outlined"
        page={pagination}
        onChange={(event, value) => {
          console.log(value);
          setPage(value);
          if (sort !== "") {
            history.push(`/?page=${value}&sort=${sort}`);
          } else {
            history.push(`/?page=${value}`);
          }
        }}
      />
    </div>
  );
}
