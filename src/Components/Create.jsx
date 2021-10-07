import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import FormLabel from "@material-ui/core/FormLabel";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: "10px",
  },
  CreatePage: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  radio: {
    display: "flex",
    alignItems: "center",
    width: 200,
    justifyContent: "space-evenly",
  },
  input: {
    width: 200,
  },
  detailsDiv: {
    width: 300,
    border: "1px solid black",
  },
  span: {
    fontSize: "15px",
    fontWeight: "500",
  },
}));
export default function Create() {
  const classes = useStyles();
  const [details, setDetails] = useState("");
  const [form, setForm] = useState({
    name: "",
    city: "",
    age: "",
    gender: "male",
  });

  const [error, setError] = useState({
    name: false,
    city: false,
    age: false,
  });

  const onEnter = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    if (name === "name") {
      setError({ ...error, name: false });
    }
    if (name === "city") {
      setError({ ...error, city: false });
    }
    if (name === "age") {
      setError({ ...error, age: false });
    }
    setForm({ ...form, [name]: value });
  };
  const validateLogin = () => {
    if (form?.city === "" && form?.age === "" && form.name === "")
      setError({ city: "City is required", age: "Age is required", name: "Name is required" });
    else if (form?.name === "") setError({ error, name: "Name is required" });
    else if (form?.city === "") setError({ error, city: "City is required" });
    else if (form?.age === "") setError({ error, age: "Age is required" });
  };
  const handelSubmit = async () => {
    console.log(form);
    validateLogin();
    if (error.city === false && error.age === false && error.name === false) {
      try {
        let { data } = await axios.post("http://localhost:3001/students", form);
        console.log(data);
        setDetails(data.item);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.CreatePage}>
        <div className={classes.input}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            onKeyUp={onEnter}
            name="name"
            required
            error={error.name}
            helperText={error.name}
          />
        </div>
        <div className={classes.input}>
          <TextField
            id="outlined-basic"
            label="City"
            variant="outlined"
            onKeyUp={onEnter}
            name="city"
            required
            error={error.city}
            helperText={error.city}
          />
        </div>
        <div className={classes.input}>
          <TextField
            className={classes.input}
            id="outlined-basic"
            label="Age"
            type="number"
            variant="outlined"
            onKeyUp={onEnter}
            name="age"
            required
            error={error.age}
            helperText={error.age}
          />
        </div>
        <div className={classes.radio}>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup aria-label="gender" name="gender" value={form.gender} onChange={onEnter}>
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </div>
        <div>
          <Button variant="contained" color="primary" onClick={handelSubmit}>
            submit
          </Button>
        </div>
      </div>
      {details && (
        <div className={classes.detailsDiv}>
          <h3>Student Details</h3>
          <p>
            <span className={classes.span}>Name-</span> {details?.name}
          </p>
          <p>
            <span className={classes.span}>City-</span> {details?.city}
          </p>
          <p>
            <span className={classes.span}>Age-</span> {details?.age}
          </p>
          <p>
            <span className={classes.span}>Gender-</span> {details?.gender}
          </p>
        </div>
      )}
    </div>
  );
}
