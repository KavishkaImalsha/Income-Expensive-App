import {Route, Routes} from "react-router-dom";
import Wallets from "./pages/Wallets.jsx";
import MainDashboard from "./pages/MainDashboard.jsx";

const Dashboard = () => {
    return(
        <>
            <Routes>
                <Route path='/' element={<MainDashboard/>}/>
                <Route path='/wallets' element={<Wallets/>}/>
            </Routes>
        </>
    )
}

export default Dashboard
