import { useEffect, useState } from "react";
import Bottom from "./Bottom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Loading from "./Loading";
import axios from "axios";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  root: {},
  list: {
    maxWidth: 650,
  },
  table: {
    maxWidth: 650,
  },
  heading: {
    fontSize: "18px",
    fontWeight: 700,
  },
  blueText: {
    color: "blue",
    cursor: "pointer",
  },
});

export default function StudentList({ page, setPage }) {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, [page]);

  async function getData() {
    let { data } = await axios.get(`http://localhost:3001/students`);
    console.log(data.item);
    setData(data.item);
  }

  const handelEdit = (item) => {
    try {
      history.push(`/edit/${item._id}`);
    } catch (e) {
      console.log(e);
    }
  };
  const handelDelete = async (item) => {
    try {
      await axios.delete(`http://localhost:3001/students/${item._id}`);
      getData();
    } catch (e) {
      console.log(e);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className={classes.root}>
      <TableContainer className={classes.list} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.heading}>Name</TableCell>
              <TableCell className={classes.heading} align="right">
                City
              </TableCell>
              <TableCell className={classes.heading} align="right">
                Age
              </TableCell>
              <TableCell className={classes.heading} align="right">
                Gender
              </TableCell>
              <TableCell className={classes.heading} align="right">
                Edit
              </TableCell>
              <TableCell className={classes.heading} align="right">
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.city}</TableCell>
                <TableCell align="right">{row.age}</TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                <TableCell
                  onClick={() => {
                    handelEdit(row);
                  }}
                  className={classes.blueText}
                  align="right"
                >
                  Edit
                </TableCell>
                <TableCell
                  onClick={() => {
                    handelDelete(row);
                  }}
                  className={classes.blueText}
                  align="right"
                >
                  Delete
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Bottom page={page} setPage={setPage} />
    </div>
  );
}
