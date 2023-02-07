import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AppContext } from "../components/app-context";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { LogOut } = useContext(AppContext);
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
            sx={{ fontWeight: 700,fontSize:17}}
            onClick={() => {
              LogOut();
              navigate("/");
            }}
          >
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
