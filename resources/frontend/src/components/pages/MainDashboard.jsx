import incomeDashboard from "../../assets/images/incomeDashbord.png";
import expenseDashboard from "../../assets/images/expenseDashboard.png";
import worthDashboard from "../../assets/images/worthDashboard.png";
import DashboardCard from "../common/cards/DashboardCard.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import DoughnutChart from "../common/charts/DoughnutChart.jsx";
const MainDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [monthlyTotalIncome, setMonthlyTotalIncome] = useState(null)
    const [currentMonthIncomes, setCurrentMonthIncomes] = useState([])
    const [monthlyTotalExpense, setMonthlyTotalExpense] = useState(null)
    const [title, setTitle] = useState("income")

    useEffect(() => {
        const fetchTotalIncome = async () => {
            const incomeAmountRes = await axios.get('http://127.0.0.1:8000/api/get-month-income');
            const expenseAmountRes = await axios.get('http://127.0.0.1:8000/api/get-monthly-expense');
            const incomesRes = await axios.get('http://127.0.0.1:8000/api/get-current-month-incomes')
            setCurrentMonthIncomes(incomesRes.data.incomes)
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
            {loading ? (<div><p>loading</p></div>) : (<div className="p-4 sm:ml-64 mt-12">
                <div className="grid grid-cols-3 gap-2">
                    <DashboardCard image={incomeDashboard} title="Month Income" textColor="green" amount={monthlyTotalIncome}/>
                    <DashboardCard image={expenseDashboard} title="Monthly Expense" textColor="red" amount={monthlyTotalExpense}/>
                    <DashboardCard image={worthDashboard} title="Current Balance" textColor="blue" amount={100000}/>
                </div>

                <div className="m-3 w-[50%]">
                    <div className="flex justify-between">
                        <h1 className="pt-2 mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">{title === "income" ? "Income Summery" : "Expense Summery"}</h1>
                        <select name="selector"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[25%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={(event) => {
                                    titleSetter(event)
                                }}>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>

                    {title === "income" ? <DoughnutChart details={currentMonthIncomes}/> : <div>I am expense</div>
                    }
                </div>
            </div>)}
        </>
    )
}

export default MainDashboard
