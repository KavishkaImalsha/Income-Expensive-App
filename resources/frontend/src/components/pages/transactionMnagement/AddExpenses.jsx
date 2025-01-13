import expensesIcon from "../../../assets/images/expenses.png";
import {useContext, useEffect, useState} from "react";
import FormSubmitBtn from "./commonFields/FormSubmitBtn.jsx";
import FormInputField from "./commonFields/FormInputField.jsx";
import FormSelectInput from "./commonFields/FormSelectInput.jsx";
import ModalCloseBtn from "./commonFields/ModalCloseBtn.jsx"
import AddBtn from "./commonFields/AddBtn.jsx";
import axios from "axios";
import HandelInputDataAction from "../../../actions/form/HandelInputDataAction.jsx";
import {MessageContext} from "../../common/MessageContext.jsx";
import ShowModel from "../../../actions/ShowModel.jsx";
import SuccessAlert from "../../common/alertMessages/SuccessAlert.jsx";
import {Link, useNavigate} from "react-router-dom";
import ErrorAlertWithDetails from "../../common/alertMessages/ErrorAlertWithDetails.jsx";
import LoadingSpining from "../../common/LoadingSpining.jsx";
import TableHead from "../../common/table/TableHead.jsx";
import TableThRow from "../../common/table/TableThRow.jsx";
import TableTdRow from "../../common/table/TableTdRow.jsx";
import {RecentActivitiesContext} from "../../contextStates/RecentActivitiesContext.jsx";

const AddExpenses = () => {
    const [isModelVisible, setIsModelVisible] = useState(false)
    const [loading, setLoading] = useState(true)
    const {responseMessage, setResponseMessage} = useContext(MessageContext)
    const {addRecentActivity} = useContext(RecentActivitiesContext)
    const [expensesNames, setExpensesNames] = useState([])
    const [expense, setExpense] = useState({"expense_amount" : null, "expense_category" : null})
    const [expenses, setExpenses] = useState([])

    useEffect(() => {
        fetchCategory()
        fetchExpenses()
    }, []);

    const fetchCategory = async () => {
        const category = await axios.get('http://127.0.0.1:8000/api/get-categories');
        setExpensesNames(category.data.data.filter(category => category.category_type === "Expense").map(expense => expense.category_name))
        setLoading(false)
    }

    const fetchExpenses = async () => {
        const getExpenseResponse = await axios.get('http://127.0.0.1:8000/api/get-expenses')
         if(getExpenseResponse.status === 200){
             setExpenses(getExpenseResponse.data.expenses)
             setLoading(false)
         }
    }

    const handelFormSubmit = async (event) => {
        event.preventDefault()
        try{
            const submitResponse = await axios.post('http://127.0.0.1:8000/api/add-expense', expense);
            if(submitResponse.status === 200){
                setResponseMessage(submitResponse.data.message)
                setIsModelVisible(false)
                addRecentActivity("Expense", `Add Rs: ${expense.expense_amount} to ${expense.expense_category} expense`)
                fetchExpenses()
            }
        }catch (error){
            setResponseMessage(error.response.data.errors)
        }
    }

    const deleteExpense = async (expense_id) => {
        const deleteExpenseResponse = await axios.delete(`http://127.0.0.1:8000/api/delete-expense/${expense_id}`);
        if(deleteExpenseResponse.status === 200){
            setResponseMessage(deleteExpenseResponse.data.message)
            addRecentActivity("Expense", `Delete Rs: ${deleteExpenseResponse.data.expense_amount} from ${deleteExpenseResponse.data.expense_category} expense`)
            fetchExpenses()
        }
    }

    return(
        <>
            <div className="p-4 sm:ml-64">
                <div
                    className="p-4 flex justify-between border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                    <div className="flex">
                        <img src={expensesIcon} alt="Income Icon" className="w-9 h-9 mx-1"/>
                        <h1 className="font-bold text-2xl mx-1">Expenses Management</h1>
                    </div>
                    <div>
                        <AddBtn btnName="Add Expense" onClick={() => {ShowModel(setIsModelVisible, setResponseMessage, false)}}/>
                        {isModelVisible && (
                            <div id="crud-modal" tabIndex="-1" aria-hidden="true"
                                 className="flex backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                <div className="relative p-4 w-full max-w-md max-h-full">
                                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                        <div
                                            className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                Add Expenses Details
                                            </h3>
                                            <ModalCloseBtn onClose={() => {ShowModel(setIsModelVisible, setResponseMessage, true)}}/>
                                        </div>
                                        {responseMessage && isModelVisible && <ErrorAlertWithDetails responseMessage={responseMessage} setResponseMessage={setResponseMessage}/>}
                                        <form onSubmit={handelFormSubmit} className="p-4 md:p-5">
                                            <div className="grid gap-4 mb-4 grid-cols-2">
                                                <FormInputField inputName="expense_amount" type="number" labelName="Expense Amount" placeHolder="Expense Amount" onChange={HandelInputDataAction(setExpense)}/>
                                                <FormSelectInput fieldName="expense_category" labelName="Expense Category" categories={expensesNames} onChange={HandelInputDataAction(setExpense)}/>
                                            </div>
                                            <FormSubmitBtn btnName="Add Expense"/>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {responseMessage && !isModelVisible && <SuccessAlert responseMessage={responseMessage} setResponseMessage={setResponseMessage}/>}
                {loading ? (<LoadingSpining/>) :
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-2">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <TableHead headings={["Expense Name", "Expense Amount", "Action"]}/>
                            <tbody>
                            {expenses.map((expense) => {
                                return (
                                    <tr key={expense.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <TableThRow data={expense.expense_category}/>
                                        <TableTdRow data={expense.expense_amount}/>
                                        <td className="px-6 py-4">
                                            <Link to={`/edit-expense/${expense.id}`}
                                                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link> |
                                            <button
                                                onClick={() => {deleteExpense(expense.id)}}
                                                className="mx-2 font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </>
    )
}

export default AddExpenses
