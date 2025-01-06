import incomeDashboard from "../../assets/images/incomeDashbord.png";
import expenseDashboard from "../../assets/images/expenseDashboard.png";
import worthDashboard from "../../assets/images/worthDashboard.png";
import DashboardCard from "../common/cards/DashboardCard.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
const MainDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [monthlyTotalIncome, setMonthlyTotalIncome] = useState(null)

    useEffect(() => {
        const fetchTotalIncome = async () => {
            const incomeAmountRes = await axios.get('http://127.0.0.1:8000/api/get-month-income');
            setMonthlyTotalIncome(incomeAmountRes.data.total_income)
        }
        fetchTotalIncome()
        setLoading(false)
    }, []);

    console.log(monthlyTotalIncome)
    return(
        <>
            {loading ? (<div><p>loading</p></div>) : (<div className="p-4 sm:ml-64 mt-12">
                <div className="grid grid-cols-3 gap-2">
                    <DashboardCard image={incomeDashboard} title="Month Income" textColor="green" amount={monthlyTotalIncome}/>
                    <DashboardCard image={expenseDashboard} title="Monthly Expense" textColor="red" amount={2500}/>
                    <DashboardCard image={worthDashboard} title="Current Balance" textColor="blue" amount={100000}/>
                </div>
            </div>)}
        </>
    )
}

export default MainDashboard
