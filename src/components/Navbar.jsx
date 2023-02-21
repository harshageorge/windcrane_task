import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AppContext } from "../components/app-context";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { LogOut, setloggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Home
          </Typography>
          <Button
            color="inherit"
            sx={{ fontWeight: 700, fontSize: 17 }}
            onClick={() => {
              let APIToken = JSON.parse(localStorage.getItem("Token"));
              let axiosConfig = {
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${APIToken}`,
                },
              };
              fetch(
                `https://user.windcrane.com/manager/api/v1/logout`,
                axiosConfig
              )
                .then((response) => response.json())
                .then((resData) => {
                  if (resData.response.status_code == 200) {
                    LogOut();
                    setloggedIn(false);
                    navigate("/");
                  }
                })
                .catch((err) => {
                  console.log(err.message);
                });
            }}
          >
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
