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
import { useHistory, useLocation } from "react-router";

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

export default function StudentList({ pagination, setPage, sorting, filtering }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const page = searchParams.get("page") || 1;
  const sort = searchParams.get("sort") || "";
  const filter = searchParams.get("filter") || "";
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(10);

  useEffect(() => {
    console.log(sort, page, filter);
    getData();
  }, [page, sort]);

  useEffect(() => {
    console.log("inside filtereuseEffet");
    getFilterData();
  }, [filter]);

  //   useEffect(() => {
  //     console.log("inside sortuseEffet");
  //     getData();
  //   }, [sort]);

  async function getData() {
    if (sort === "age") {
      var { data } = await axios.get(`http://localhost:3001/students?page=${page}&sort=age`);
    } else {
      var { data } = await axios.get(`http://localhost:3001/students?page=${page}`);
    }

    console.log(data.item);
    setData(data.item);
    setTotalPages(data.totalPages);
  }

  async function getFilterData() {
    console.log(filter, "inside getData");
    if (filter !== "") {
      var { data } = await axios.get(
        `http://localhost:3001/students?page=${page}&sort=age&filter=${filter}`
      );
      console.log(data.item);
      setData(data.item);
      setTotalPages(data.totalPages);
    }
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
    </div>
  );
}
