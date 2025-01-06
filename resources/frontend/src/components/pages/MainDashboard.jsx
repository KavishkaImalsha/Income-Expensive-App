import incomeDashboard from "../../assets/images/incomeDashbord.png";
import expenseDashboard from "../../assets/images/expenseDashboard.png";
import worthDashboard from "../../assets/images/worthDashboard.png";
import DashboardCard from "../common/cards/DashboardCard.jsx";
const MainDashboard = () => {
    return(
        <>
            <div className="p-4 sm:ml-64 mt-12">
                <div className="grid grid-cols-3 gap-2">
                    <DashboardCard image={incomeDashboard} title="Month Income" textColor="green" amount={20000}/>
                    <DashboardCard image={expenseDashboard} title="Monthly Expense" textColor="red" amount={2500}/>
                    <DashboardCard image={worthDashboard} title="Current Balance" textColor="blue" amount={100000}/>
                </div>
            </div>
        </>
    )
}

export default MainDashboard
