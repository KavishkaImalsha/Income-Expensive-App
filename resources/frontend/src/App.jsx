import NavBar from "./components/common/NavBar.jsx";
import SideBar from "./components/common/SideBar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import {Route, Routes} from "react-router-dom";
import Wallets from "./components/pages/Wallets.jsx";
import Login from "./components/pages/Login.jsx";
import SignUp from "./components/pages/SignUp.jsx";
import MessageProvider from "./components/common/MessageContext.jsx";
import ProtectRoutes from "./authendication/ProtectRoutes.jsx";

const App = () => {
  return (
      <>
          <MessageProvider>
              <Routes>
                  <Route path="/" element={<Login/>}/>
                  <Route path="/sign-up" element={<SignUp/>}/>
                  <Route path="/dashboard/*"
                         element={
                      <ProtectRoutes>
                          <Dashboard/>
                      </ProtectRoutes>}/>
              </Routes>
          </MessageProvider>
      </>
  )
}

export default App
