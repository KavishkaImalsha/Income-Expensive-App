import NavBar from "./components/common/NavBar.jsx";
import SideBar from "./components/common/SideBar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import {Route, Routes} from "react-router-dom";
import Wallets from "./components/pages/Wallets.jsx";

const App = () => {
  return (
      <>
          <NavBar/>
          <SideBar/>
          <Dashboard/>
      </>
  )
}

export default App
