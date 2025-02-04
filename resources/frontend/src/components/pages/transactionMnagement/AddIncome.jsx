import incomeIcon from "../../../assets/images/income.png";
import {useContext, useEffect, useState} from "react";
import FormSubmitBtn from "./commonFields/FormSubmitBtn.jsx";
import FormInputField from "./commonFields/FormInputField.jsx";
import FormSelectInput from "./commonFields/FormSelectInput.jsx";
import ModalCloseBtn from "./commonFields/ModalCloseBtn.jsx";
import AddBtn from "./commonFields/AddBtn.jsx";
import axios from "axios";
import {MessageContext} from "../../common/MessageContext.jsx";
import SuccessAlert from "../../common/alertMessages/SuccessAlert.jsx";
import LoadingSpining from "../../common/LoadingSpining.jsx";
import {Link} from "react-router-dom";
import TableHead from "../../common/table/TableHead.jsx";
import TableThRow from "../../common/table/TableThRow.jsx";
import TableTdRow from "../../common/table/TableTdRow.jsx";
import HandelInputDataAction from "../../../actions/form/HandelInputDataAction.jsx";
import ErrorAlertWithDetails from "../../common/alertMessages/ErrorAlertWithDetails.jsx";
import ShowModel from "../../../actions/ShowModel.jsx";
import {RecentActivitiesContext} from "../../contextStates/RecentActivitiesContext.jsx";
import customApi from "../../api/customApi.jsx";

const AddIncome = () => {
    const [isModelVisible, setIsModelVisible] = useState(false)
    const [incomeCategories, setIncomeCategories] = useState([])
    const [incomeDetails, setIncomeDetails] = useState({"income_amount" : null, "income_category" : ""})
    const [allIncomes, setAllIncomes] = useState({"incomes" : [], "loading": true})
    const {responseMessage, setResponseMessage} = useContext(MessageContext)
    const {addRecentActivity} = useContext(RecentActivitiesContext)
    const user = JSON.parse(sessionStorage.getItem('user'))

    useEffect(()=> {
        const getCategories = async () => {
            const category = await customApi.get(`http://127.0.0.1:8000/api/get-categories/${user.uuid}`)

            if(category.status === 200){
                setIncomeCategories(category.data.data.filter((category) => {
                    return category.category_type === "Income"
                }).map((category) => {return category.category_name}))
            }
        }
        getCategories()
        fetchAllIncomes()
    }, []);

    const fetchAllIncomes = async () => {
        setAllIncomes(await customApi.get(`http://127.0.0.1:8000/api/get-incomes/${user.uuid}`))
    }

    const handelFormData =async (event) => {
        event.preventDefault()
        try{
            const addIncomeResponse = await customApi.post(`http://127.0.0.1:8000/api/add-income/${user.uuid}`, incomeDetails)
            if(addIncomeResponse.status === 200){
                setIncomeDetails({
                    'income_amount' : null,
                    'income_category' : ""
                })
                setResponseMessage(addIncomeResponse.data.message)
                setIsModelVisible(false)
                addRecentActivity("Income", `Add ${incomeDetails.income_amount} to ${incomeDetails.income_category} income`)
                fetchAllIncomes()
            }
        }catch (error){
            setResponseMessage(error.response.data.errors)
        }
    }

    const deleteIncome = async (income_id) => {
        const deleteResponse = await axios.delete(`http://127.0.0.1:8000/api/delete-income/${income_id}/${user.uuid}`)
        if (deleteResponse.status === 200){
            setResponseMessage(deleteResponse.data.message)
            addRecentActivity("Income", `Delete Rs: ${deleteResponse.data.income_amount} from ${deleteResponse.data.income_category} income`)
            fetchAllIncomes()
        }
    }

    return(
        <>
            <div className="p-4 sm:ml-64">
                <div className="p-4 flex justify-between border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                    <div className="flex">
                        <img src={incomeIcon} alt="Income Icon" className="w-9 h-9 mx-1"/>
                        <h1 className="font-bold text-2xl mx-1">Income Management</h1>
                    </div>
                    <div>
                        <AddBtn btnName="Add Income" onClick={() => {ShowModel(setIsModelVisible, setResponseMessage, false)}}/>
                        {isModelVisible && (
                            <div id="crud-modal" tabIndex="-1" aria-hidden="true"
                                 className="flex backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                <div className="relative p-4 w-full max-w-md max-h-full">
                                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                        <div
                                            className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                Add Income Details
                                            </h3>
                                            <ModalCloseBtn onClose={() => {ShowModel(setIsModelVisible, setResponseMessage, true)}}/>
                                        </div>
                                        {responseMessage && (<ErrorAlertWithDetails responseMessage={responseMessage} setResponseMessage={responseMessage}/>)}
                                        <form onSubmit={handelFormData} className="p-4 md:p-5">
                                            <div className="grid gap-4 mb-4 grid-cols-2">
                                                <FormInputField inputName="income_amount" labelName="Income Amount" type="numner" placeHolder="Income Amount" value={incomeDetails.income_amount} onChange={HandelInputDataAction(setIncomeDetails)}/>
                                                <FormSelectInput labelName="Category" fieldName="income_category" categories={incomeCategories} onChange={HandelInputDataAction(setIncomeDetails)}/>
                                            </div>
                                            <FormSubmitBtn btnName="Add Income"/>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {responseMessage && !isModelVisible &&(<SuccessAlert responseMessage={responseMessage} setResponseMessage={setResponseMessage}/>)}

                {allIncomes.loading ? (<LoadingSpining/>) :
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-2">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <TableHead headings={["Income Name", "Income Amount", "Action"]}/>
                            <tbody>
                            {allIncomes.data.incomes.map((income) => {
                                return (
                                    <tr key={income.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <TableThRow data={income.income_category}/>
                                        <TableTdRow data={income.income_amount}/>
                                        <td className="px-6 py-4">
                                            <Link to={`/dashboard/edit-income/${income.id}`}
                                                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link> |
                                            <button
                                                onClick={() => {deleteIncome(income.id)}}
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
export default AddIncome
