import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import log from "eslint-plugin-react/lib/util/log.js";
import LoadingSpining from "../../../common/LoadingSpining.jsx";
import ModalCloseBtn from "../commonFields/ModalCloseBtn.jsx";
import FormInputField from "../commonFields/FormInputField.jsx";
import FormSelectInput from "../commonFields/FormSelectInput.jsx";
import FormSubmitBtn from "../commonFields/FormSubmitBtn.jsx";
import HandelInputDataAction from "../../../../actions/form/HandelInputDataAction.jsx";
import {MessageContext} from "../../../common/MessageContext.jsx";

const EditIncome = () => {
    const income_id = useParams()
    const [loading, setLoading] = useState(true)
    const [income, setIncome] = useState({"income_amount" : null, "income_category" : null});
    const navigate = useNavigate()
    const [incomeCategories, setIncomeCategories] = useState([])
    const {responseMessage, setResponseMessage} = useContext(MessageContext)

    useEffect(() => {
        getCategories()
        fetchIncome()
    }, []);

    const fetchIncome = async () => {
        const response = await axios.get(`http://127.0.0.1:8000/api/edit-income/${income_id.id}`)

        if (response.status === 200){
            setIncome({
                "income_amount" : response.data["income"].income_amount,
                "income_category" : response.data["income"].income_category
            })
            setLoading(false)
        }
    }

    const getCategories = async () => {
        const category = await axios.get('http://127.0.0.1:8000/api/get-categories')

        if(category.status === 200){
            setIncomeCategories(category.data.data.filter((category) => {
                return category.category_type === "Income"
            }).map((category) => {return category.category_name}))
        }
    }

    const handelEditFormSubmit = async (event) => {
        event.preventDefault()
        const submitResponse = await axios.put(`http://127.0.0.1:8000/api/update-income/${income_id.id}`, income);
        if (submitResponse.status === 200){
            setResponseMessage(submitResponse.data.message);
            closeModel()
        }

    }

    const closeModel = () => {
        navigate('/add-income')
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
                                    Edit Income Details
                                </h3>
                                <ModalCloseBtn onClose={() => {
                                    closeModel()
                                }}/>
                            </div>
                            <form onSubmit={handelEditFormSubmit} className="p-4 md:p-5">
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <FormInputField inputName="income_amount" labelName="Income Amount" type="numner"
                                                    placeHolder="Income Amount" value={income.income_amount}
                                                    onChange={HandelInputDataAction(setIncome)}/>
                                    <FormSelectInput labelName="Category" fieldName="income_category"
                                                     categories={incomeCategories}
                                                     value={income.income_category}
                                                     onChange={HandelInputDataAction(setIncome)}/>
                                </div>
                                <FormSubmitBtn btnName="Update Income"/>
                            </form>
                        </div>
                    </div>
                </div>)}
        </>
    )
}

export default EditIncome
