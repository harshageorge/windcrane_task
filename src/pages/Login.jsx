import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Grid, Paper, TextField, Button } from "@mui/material";
import { AppContext } from "../components/app-context";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [values, setvalues] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, seterrorMessage] = useState("");
  const { LogIn, setloggedIn } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    const APIToken = JSON.parse(localStorage.getItem("Token"));
    if (APIToken) {
      setloggedIn(true);
      navigate("/home");
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(
        "https://user.windcrane.com/manager/api/v1/login",
        JSON.stringify({
          email: values.username,
          password: values.password,
        }),
        axiosConfig
      )
      .then((res) => {
        localStorage.setItem(
          "Token",
          JSON.stringify(res.data.response.response_body.user.access_token)
        );
        if (res.data.response.status_code == 200) {
          LogIn();
          navigate("/home");
        }
      })
      .catch((err) => {
        seterrorMessage(err.response.data.response.message);
        console.log(err.response.data.response.message);
      });
  };
  const paperStyle = { padding: 15, minheight: "60vh" };
  const btnstyle = { margin: "20px 0" };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh", padding: 10 }}
    >
      <Paper elevation={10} style={paperStyle}>
        <form onSubmit={handleSubmit}>
          <Grid align="center">
            <h2>Log In</h2>
          </Grid>
          <TextField
            label="Username"
            type="text"
            onChange={(e) => setvalues({ ...values, username: e.target.value })}
            placeholder="Enter username"
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <br></br>
          <TextField
            label="Password"
            onChange={(e) => setvalues({ ...values, password: e.target.value })}
            placeholder="Enter password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          {errorMessage ? errorMessage : ""}
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Log in
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;
