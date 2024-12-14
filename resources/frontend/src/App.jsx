import NavBar from "./components/common/NavBar.jsx";
import SideBar from "./components/common/SideBar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import {Route, Routes} from "react-router-dom";
import Wallets from "./components/Wallets.jsx";

const App = () => {
  return (
      <>
          <NavBar/>
          <SideBar/>

          <Routes>
              <Route path='/' element={<Dashboard/>}/>
              <Route path='/wallets' element={<Wallets/>}/>
          </Routes>
      </>
  )
}

export default App
