import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-google-charts";
import { AppContext } from "./app-context";
import { Container, Box } from "@mui/material";
const StackedChart = () => {
  const { historicalData } = useContext(AppContext);
  const [chartData, setchartData] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      await axios.get(
        "https://jsonplaceholder.typicode.com/todos/",
        {
          params: {
            data: historicalData,
          },
        }
      ).then((res)=>setchartData(res.data))
      .catch((err)=>console.log(err));
      ;
    };

    fetchPosts();
  }, []);
  var data = [
    ["Year", "Sales", "Expenses"],
    ["2013", 1500, 400],
    ["2014", 1170, 460],
    ["2015", 660, 1120],
    ["2016", 1030, 540],
    ["2017", 1060, 590],
    ["2018", 1300, 640],
    ["2019", 1430, 760],
  ];

  const options = {
    isStacked: true,
    height: 700,
    legend: { position: "top", maxLines: 3 },
    vAxis: { minValue: 0, ticks: [300, 600, 900, 1200, 1500] },
    backgroundColor: "#ffffff",
    colors: ["#b3b8ed", "#b3dbed"],
  };
  return (
    <Container maxWidth="lg">
      <Box sx={{ margin: "30px auto" }}>
        <Chart
          chartType="AreaChart"
          width="100%"
          height="400px"
          loader={<div>Loading Chart</div>}
          data={data}
          // data={chartData}
          options={options}
        />
      </Box>
    </Container>
  );
};

export default StackedChart;
