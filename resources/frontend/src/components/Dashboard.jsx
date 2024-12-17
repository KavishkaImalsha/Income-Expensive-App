import {Route, Routes} from "react-router-dom";
import Wallets from "./pages/Wallets.jsx";
import MainDashboard from "./pages/MainDashboard.jsx";
import AddIncome from "./pages/transactionMnagement/AddIncome.jsx";
import AddExpenses from "./pages/transactionMnagement/AddExpenses.jsx";
import AddCategories from "./pages/transactionMnagement/AddCategories.jsx";

const Dashboard = () => {
    return(
        <>
            <Routes>
                <Route path='/main-dashboard' element={<MainDashboard/>}/>
                <Route path='/wallets' element={<Wallets/>}/>
                <Route path='/add-income' element={<AddIncome/>}/>
                <Route path='/add-expenses' element={<AddExpenses/>}/>
                <Route path='/add-categories' element={<AddCategories/>}/>
            </Routes>
        </>
    )
}

export default Dashboard
