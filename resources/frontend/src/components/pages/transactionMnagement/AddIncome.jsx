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

const AddIncome = () => {
    const [isModelVisible, setIsModelVisible] = useState(false)
    const [incomeCategories, setIncomeCategories] = useState([])
    const [incomeDetails, setIncomeDetails] = useState({"income_amount" : null, "income_category" : ""})
    const [incomes, setIncomes] = useState({"data" : [], "loading" : true})

    const {responseMessage, setResponseMessage} = useContext(MessageContext)

    useEffect(()=> {
        setResponseMessage("")
        const getCategories = async () => {
            const category = await axios.get('http://127.0.0.1:8000/api/get-categories')

            if(category.status === 200){
                setIncomeCategories(category.data.data.filter((category) => {
                    return category.category_type === "Income"
                }).map((category) => {return category.category_name}))
            }
        }
        getCategories()
    }, []);

    const handelInputData = (event) => {
        setIncomeDetails((prevState) => ({
            ...prevState,
            [event.target.name] : event.target.value
        }))
    }

    const handelFormData =async (event) => {
        event.preventDefault()
        try{
            const addIncomeResponse = await axios.post('http://127.0.0.1:8000/api/add-income', incomeDetails)
            if(addIncomeResponse.status === 200){
                setIncomeDetails({
                    'income_amount' : null,
                    'income_category' : ""
                })
                setResponseMessage(addIncomeResponse.data.message)
                showModel(true)
            }
        }catch (error){
            setResponseMessage(error.response.data.errors)
        }
    }
    const showModel = (isVisible) => {
        if(!isVisible){
            setIsModelVisible(true)
            return
        }
        setIsModelVisible(false)
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
                        <AddBtn btnName="Add Income" onClick={() => {showModel(false)}}/>
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
                                            <ModalCloseBtn onClose={() => {showModel(true)}}/>
                                        </div>
                                        <form onSubmit={handelFormData} className="p-4 md:p-5">
                                            <div className="grid gap-4 mb-4 grid-cols-2">
                                                <FormInputField inputName="income_amount" labelName="Income Amount" type="numner" placeHolder="Income Amount" value={incomeDetails.income_amount} onChange={handelInputData}/>
                                                <FormSelectInput labelName="Category" fieldName="income_category" categories={incomeCategories} onChange={handelInputData}/>
                                            </div>
                                            <FormSubmitBtn btnName="Add Income"/>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {responseMessage && (<SuccessAlert responseMessage={responseMessage} setResponseMessage={setResponseMessage}/>)}
            </div>
        </>
    )
}
export default AddIncome
