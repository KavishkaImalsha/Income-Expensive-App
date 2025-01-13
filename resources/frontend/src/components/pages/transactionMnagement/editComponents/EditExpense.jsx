import LoadingSpining from "../../../common/LoadingSpining.jsx";
import ModalCloseBtn from "../commonFields/ModalCloseBtn.jsx";
import FormInputField from "../commonFields/FormInputField.jsx";
import HandelInputDataAction from "../../../../actions/form/HandelInputDataAction.jsx";
import FormSelectInput from "../commonFields/FormSelectInput.jsx";
import FormSubmitBtn from "../commonFields/FormSubmitBtn.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {MessageContext} from "../../../common/MessageContext.jsx";
import {RecentActivitiesContext} from "../../../contextStates/RecentActivitiesContext.jsx";

const EditExpense = () => {
    const expense_id = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [expense, setExpense] = useState({"expense_amount" : null, "expense_category" : null})
    const {responseMessage, setResponseMessage} = useContext(MessageContext)
    const {addRecentActivity} = useContext(RecentActivitiesContext)
    const [expensesNames, setExpensesNames] = useState([])

    useEffect(() => {
        fetchCategory()
        fetchExpense()
    }, []);

    const fetchCategory = async () => {
        const category = await axios.get('http://127.0.0.1:8000/api/get-categories');
        setExpensesNames(category.data.data.filter(category => category.category_type === "Expense").map(expense => expense.category_name))
    }
    const fetchExpense = async () => {
        const expenseResponse = await axios.get(`http://127.0.0.1:8000/api/edit-expense/${expense_id.id}`)
        if(expenseResponse.status === 200){
            setExpense({
                "expense_amount" : expenseResponse.data.expense.expense_amount,
                "expense_category" : expenseResponse.data.expense.expense_category
            })
            setLoading(false)
        }
    }

    const updateExpense = async (event) => {
        event.preventDefault()
        const updateResponse = await axios.put(`http://127.0.0.1:8000/api/update-expense/${expense_id.id}`, expense);

        if(updateResponse.status === 200){
            setResponseMessage(updateResponse.data.message)
            addRecentActivity("Expense", "Edit expense data")
            closeModel()
        }
    }

    const closeModel = () => {
        navigate('/add-expenses')
    }
    return(
        <>
            {loading ? (<div className="mt-20">
                    <LoadingSpining/>
                </div>) :
                (<div id="crud-modal" tabIndex="-1" aria-hidden="true"
                      className="flex backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div
                                className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Edit Expense Details
                                </h3>
                                <ModalCloseBtn onClose={() => {
                                    closeModel()
                                }}/>
                            </div>
                            <form onSubmit={updateExpense} className="p-4 md:p-5">
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <FormInputField inputName="expense_amount" labelName="Expense Amount" type="numner"
                                                    placeHolder="Income Amount" value={expense.expense_amount}
                                                    onChange={HandelInputDataAction(setExpense)}/>
                                    <FormSelectInput labelName="Expense Category" fieldName="expense_category"
                                                     categories={expensesNames}
                                                     value={expense.expense_category}
                                                     onChange={HandelInputDataAction(setExpense)}/>
                                </div>
                                <FormSubmitBtn btnName="Update Expense"/>
                            </form>
                        </div>
                    </div>
                </div>)}
        </>
    )
}

export default EditExpense
