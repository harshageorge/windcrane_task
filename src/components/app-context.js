import { createContext, useState } from "react";

export const AppContext = createContext(null);
export const AppContextProvider = (props) => {
  const [loggedIn, setloggedIn] = useState(false);
  const [getSelectedListId, setgetSelectedListId] = useState([]);
  const [historicalData, sethistoricalData] = useState([]);

  const LogIn = () => {
    const APIToken = JSON.parse(localStorage.getItem("Token"));
    if (APIToken) {
      setloggedIn(true);
    }
  };

  const LogOut = () => {
    localStorage.removeItem("Token");
    setloggedIn(false);
  };

  const contextValue = {
    LogIn,
    LogOut,
    loggedIn,
    setloggedIn,
    getSelectedListId,
    setgetSelectedListId,
    historicalData,
    sethistoricalData,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};
