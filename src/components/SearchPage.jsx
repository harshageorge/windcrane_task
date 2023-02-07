import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import DataList from "./DataList";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

import {
  TextField,
  Container,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  Divider,
  Typography,
  Grid,
  Pagination,
} from "@mui/material";
import { AppContext } from "./app-context";
const BoxWrapper = styled(Box)(({ theme }) => ({
 
  padding: "10px",
}));
const PaginationWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
}));

function SearchPage() {
  const [tasks, setTasks] = useState([]);
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([tasks]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(10);
  const { getSelectedListId, sethistoricalData, setgetSelectedListId } =
    useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setAllData(res.data);
      setTasks(res.data);
      setFilteredData(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Change page

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = tasks.filter((data) => {
      return data.name.toLowerCase().search(value) != -1;
    });
    console.log({ result });
    setFilteredData(result);
  };

  // Get current tasks
  function getCurrentTasks(tasks) {
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    return tasks.slice(indexOfFirstTask, indexOfLastTask);
  }

  const getHistoricData = () => {
  let selectedData = [];
    for (const listId in getSelectedListId) {
      console.log(getSelectedListId[listId]);
      let selectedListItems = allData.filter(
        (item) => item.id == getSelectedListId[listId]
      );
      selectedData.push(selectedListItems);
    }
    sethistoricalData(selectedData);
    setgetSelectedListId([]);
    navigate("/chart");
    return selectedData;
  };
  return (
    <Container maxWidth="lg" sx={{padding:'10px',}}>
      <Box sx={{ display: "flex", flexDirection: "column", padding:'5px'}}>
        <Box sx={{ display: "flex", flexDirection: "row",gap:'5px',marginTop:'20px',}}>
          <TextField
            label="Search"
            sx={{  width: "70%" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={(event) => handleSearch(event)}
          />
          <Button
            variant="contained"
            size="small"
            disabled={getSelectedListId.length === 0}
            onClick={() => getHistoricData()}
            style={{
              margin: "auto",
              minWidth: "100px",
              paddingLeft: "10px",
              paddingRight: "10px",
              paddingTop: "5px",
              paddingBottom: "5px",
              borderRadius: "15px",
            }}
          >
            Get Data
          </Button>
        </Box>
        <Grid container spacing={3} >
          <Grid item xs={12} sm={9} >
           
              <List>
                <ListItem   style={{display:'flex' }}>
                  <ListItemText
                   style={{ flex:'1 1 0'}}
                   >
                    <Typography
                      style={{ fontWeight: 600 }}
                      variant="subtitle2"
                      color="primary"
                    ></Typography>
                  </ListItemText>
                  <ListItemText 
                  style={{flex:'2 1 0'}}
                  >
                    <Typography
                      style={{ fontWeight: 600 }}
                      variant="subtitle2"
                      color="primary"
                    >
                      Device
                    </Typography>
                  </ListItemText>
                  <ListItemText
                    style={{
                      flex:'2 1 0',
                    }}
                  >
                    <Typography
                      style={{ fontWeight: 600 }}
                      variant="subtitle2"
                      color="primary"
                    >
                      {" "}
                      Site name
                    </Typography>
                  </ListItemText>
                </ListItem>
              </List>
              <Divider style={{  marginRight: "12px" }} />
            
            <DataList tasks={getCurrentTasks(filteredData)} loading={loading} />
            <PaginationWrapper>
              <Pagination
                onChange={handlePageChange}
                count={Math.ceil(filteredData.length / tasksPerPage)}
                page={currentPage}
                color="primary"
              />
            </PaginationWrapper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default SearchPage;
