import {Route, Routes} from "react-router-dom";
import Wallets from "./pages/Wallets.jsx";
import MainDashboard from "./pages/MainDashboard.jsx";
import AddIncome from "./pages/transactionMnagement/AddIncome.jsx";
import AddExpenses from "./pages/transactionMnagement/AddExpenses.jsx";
import AddCategories from "./pages/transactionMnagement/AddCategories.jsx";
import EditCategory from "./pages/transactionMnagement/editComponents/EditCategory.jsx";

const Dashboard = () => {
    return(
        <>
            <Routes>
                <Route path='/main-dashboard' element={<MainDashboard/>}/>
                <Route path='/wallets' element={<Wallets/>}/>
                <Route path='/add-income' element={<AddIncome/>}/>
                <Route path='/add-expenses' element={<AddExpenses/>}/>
                <Route path='/add-categories' element={<AddCategories/>}/>
                <Route path='/edit-category/:id' element={<EditCategory/>}/>
            </Routes>
        </>
    )
}

export default Dashboard
