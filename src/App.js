import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { AppContextProvider } from "./components/app-context";
import ChartPage from "./pages/ChartPage";

function App() {
  return (
    <AppContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chart" element={<ChartPage/>}/>
        </Routes>
      </Router>
    </AppContextProvider>
  );
}

export default App;
