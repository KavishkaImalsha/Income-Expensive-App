import NavBar from "./components/common/NavBar.jsx";
import SideBar from "./components/common/SideBar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import {Route, Routes} from "react-router-dom";
import Wallets from "./components/pages/Wallets.jsx";
import Login from "./components/pages/Login.jsx";
import SignUp from "./components/pages/SignUp.jsx";
import MessageProvider from "./components/common/MessageContext.jsx";

const App = () => {
  return (
      <>
          <NavBar/>
          <SideBar/>
          <MessageProvider>
              <Dashboard/>
          </MessageProvider>

          {/*<Routes>*/}
          {/*    <Route path="/" element={<Login/>}/>*/}
          {/*    <Route path="/sign-up" element={<SignUp/>}/>*/}
          {/*</Routes>*/}
      </>
  )
}

export default App
