import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useHistory, useLocation } from "react-router";
import { useState } from "react";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
  },
}));
export default function Filter({ filter = "", sort = "", setSort, setFilter }) {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page") || 1;
  //   const sort = searchParams.get("sort") || "";
  //   const filter = searchParams.get("filter") || "";

  const handelSort = () => {
    if (filter !== "" && sort !== "") {
      console.log(filter, "inside submit func");
      history.push(`/?page=${page}&sort=${sort}&filter=${filter}`);
    } else {
      history.push(`/?page=${page}&sort=${sort}`);
    }
  };

  const handleChange = (e) => {
    setSort(e.target.value);
  };
  const handleChangeFilter = (e) => {
    setFilter(e.target.value);
    console.log(e.target.value);
  };
  return (
    <div className={classes.root}>
      <div>
        <div>
          <h2>Sort</h2>
          <RadioGroup aria-label="age" name="age" value={sort} onChange={handleChange}>
            <FormControlLabel value="age" control={<Radio />} label="Age" />
          </RadioGroup>
        </div>
        <div>
          <h2>Filter</h2>
          <RadioGroup aria-label="age" name="gender" value={filter} onChange={handleChangeFilter}>
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
          </RadioGroup>
        </div>
      </div>

      <Button variant="contained" color="primary" onClick={handelSort}>
        Primary
      </Button>
    </div>
  );
}
