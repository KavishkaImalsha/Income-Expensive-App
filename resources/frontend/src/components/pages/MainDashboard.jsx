import incomeDashboard from "../../assets/images/incomeDashbord.png";
import expenseDashboard from "../../assets/images/expenseDashboard.png";
import worthDashboard from "../../assets/images/worthDashboard.png";
import DashboardCard from "../common/cards/DashboardCard.jsx";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import DoughnutChart from "../common/charts/DoughnutChart.jsx";
import LoadingSpining from "../common/LoadingSpining.jsx";
import {RecentActivitiesContext} from "../contextStates/RecentActivitiesContext.jsx";
import customApi from "../api/customApi.jsx";
const MainDashboard = () => {
    const {recentActivities} = useContext(RecentActivitiesContext)
    const [loading, setLoading] = useState(true);
    const [monthlyTotalIncome, setMonthlyTotalIncome] = useState(null)
    const [currentMonthIncomes, setCurrentMonthIncomes] = useState([])
    const [monthlyTotalExpense, setMonthlyTotalExpense] = useState(null)
    const [currentMonthExpense, setCurrentMonthExpenses] = useState([])
    const [title, setTitle] = useState("income")

    useEffect(() => {
        const fetchTotalIncome = async () => {
            const incomeAmountRes = await customApi.get('http://127.0.0.1:8000/api/get-month-income');
            const expenseAmountRes = await customApi.get('http://127.0.0.1:8000/api/get-monthly-expense');
            const incomesRes = await customApi.get('http://127.0.0.1:8000/api/get-current-month-incomes')
            const expenseRes = await customApi.get('http://127.0.0.1:8000/api/get-current-month-expense')
            setCurrentMonthIncomes(incomesRes.data.incomes)
            setCurrentMonthExpenses(expenseRes.data.expenses)
            setMonthlyTotalIncome(incomeAmountRes.data.total_income)
            setMonthlyTotalExpense(expenseAmountRes.data.total_expense)
            setLoading(false)
        }
        fetchTotalIncome()
    }, []);
    const titleSetter = (event) => {
        setTitle(event.target.value)
    }
    return(
        <>
            {loading ? (<div className="mt-[20%] ml-[10%]"><LoadingSpining/></div>) : (<div className="p-4 sm:ml-64 mt-12">
                <div className="grid grid-cols-3 gap-2">
                    <DashboardCard image={incomeDashboard} title="Month Income" textColor="green" amount={monthlyTotalIncome}/>
                    <DashboardCard image={expenseDashboard} title="Monthly Expense" textColor="red" amount={monthlyTotalExpense}/>
                    <DashboardCard image={worthDashboard} title="Current Balance" textColor="blue" amount={100000}/>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="border border-1 p-5 rounded-lg shadow-lg">
                        <div className="flex justify-between">
                            <h1 className="pt-2 mb-4 font-poppins text-xl leading-none tracking-tight text-gray-900 dark:text-white">{title === "income" ? "Income Summery" : "Expense Summery"}</h1>
                            <select name="selector"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[25%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={(event) => {
                                        titleSetter(event)
                                    }}>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>

                        {title === "income" ? <DoughnutChart details={currentMonthIncomes}/> : <DoughnutChart details={currentMonthExpense}/>
                        }
                    </div>
                    <div className="border border-1 shadow-lg rounded-lg p-5 font-poppins">
                        <h1 className="text-xl">Recent Activities</h1>
                        {recentActivities.map((activity, index) => {
                            const date = new Date(activity.timestamp)
                            const formatedDate = date.toLocaleDateString()
                            const formatedTime = date.toLocaleTimeString()
                            return(
                                <div key={index} className="border-b-2 p-3 my-2">
                                    <p className="text-sm">{activity.description}</p>
                                    <div className="flex justify-between">
                                        <p className={`${activity.type === "Income" ? "text-green-500" : "text-red-500"} text-sm`}>{activity.type}</p>
                                        <p className="text-sm text-gray-500">{`${formatedDate}, ${formatedTime}`}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>)}
        </>
    )
}

export default MainDashboard
