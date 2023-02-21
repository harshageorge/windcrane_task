import React, { useContext } from "react";
import {
  List,
  ListItemText,
  Box,
  Divider,
  Checkbox,
  ListItemButton,
} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import { AppContext } from "./app-context";

const DataList = ({ tasks, loading }) => {
  const { setgetSelectedListId } = useContext(AppContext);
  const [checked, setChecked] = React.useState([]);

  const handleToggle = (task) => () => {
    const currentIndex = checked.indexOf(task);
    console.log(currentIndex);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(task);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    console.log(newChecked);
    setChecked(newChecked);
    setgetSelectedListId(newChecked);
  };

  if (!loading) {
    return <h2>Loading...</h2>;
  }
  if (loading) {
    return (
      <List>
        {tasks.map((task, index) => (
          <Box
            key={index}
            style={{ background: "#ffffff", marginBottom: "10px" }}
          >
            <ListItemButton
              style={{ marginTop: "15px", display: "flex", columnGap: "7px" }}
              key={index}
              onClick={handleToggle(task.imei)}
              dense
            >
              <ListItemIcon style={{ flex: "1 1 0" }}>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(task.imei) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": task.imei }}
                />
              </ListItemIcon>
              <ListItemText style={{ flex: "2 1 0", wordBreak: "break-all" }}>
                {task.name}
              </ListItemText>
              <ListItemText
                style={{
                  wordBreak: "break-all",
                  flex: "3 1 0",
                }}
              >
                {task.project_site.name}
              </ListItemText>
              <ListItemText
                style={{
                  wordBreak: "break-all",
                  flex: "2 1 0",
                }}
              >
                {task.imei}
              </ListItemText>
              <ListItemText
                style={{
                  wordBreak: "break-all",
                  flex: "1 1 0",
                }}
              >
                {task.status}
              </ListItemText>
            </ListItemButton>
            <Divider style={{ height: "1px", background: "#00A0DF" }} />
          </Box>
        ))}
      </List>
    );
  }
};

export default DataList;
