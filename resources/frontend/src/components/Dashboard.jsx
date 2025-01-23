import {Route, Routes} from "react-router-dom";
import Wallets from "./pages/Wallets.jsx";
import MainDashboard from "./pages/MainDashboard.jsx";
import AddIncome from "./pages/transactionMnagement/AddIncome.jsx";
import AddExpenses from "./pages/transactionMnagement/AddExpenses.jsx";
import AddCategories from "./pages/transactionMnagement/AddCategories.jsx";
import EditCategory from "./pages/transactionMnagement/editComponents/EditCategory.jsx";
import EditIncome from "./pages/transactionMnagement/editComponents/EditIncome.jsx";
import EditExpense from "./pages/transactionMnagement/editComponents/EditExpense.jsx";
import {RecentActivitiesProvider} from "./contextStates/RecentActivitiesContext.jsx";
import MessageProvider from "./common/MessageContext.jsx";
import NavBar from "./common/NavBar.jsx";
import SideBar from "./common/SideBar.jsx";

const Dashboard = () => {
    return(
        <>
            <NavBar/>
            <SideBar/>
            <RecentActivitiesProvider>
                <MessageProvider>
                    <Routes>
                        <Route path='/' element={<MainDashboard/>}/>
                        <Route path='/wallets' element={<Wallets/>}/>
                        <Route path='/add-income' element={<AddIncome/>}/>
                        <Route path='/add-expenses' element={<AddExpenses/>}/>
                        <Route path='/add-categories' element={<AddCategories/>}/>
                        <Route path='/edit-category/:id' element={<EditCategory/>}/>
                        <Route path='/edit-income/:id' element={<EditIncome/>}/>
                        <Route path='edit-expense/:id' element={<EditExpense/>}/>
                    </Routes>
                </MessageProvider>
            </RecentActivitiesProvider>
        </>
    )
}

export default Dashboard
