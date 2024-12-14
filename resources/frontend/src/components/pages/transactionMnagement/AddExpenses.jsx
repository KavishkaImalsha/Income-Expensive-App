import expensesIcon from "../../../assets/images/expenses.png";
import {useState} from "react";
import FormSubmitBtn from "./commonFields/FormSubmitBtn.jsx";
import FormInputField from "./commonFields/FormInputField.jsx";
import FormSelectInput from "./commonFields/FormSelectInput.jsx";
import ModalCloseBtn from "./commonFields/ModalCloseBtn.jsx"
import AddBtn from "./commonFields/AddBtn.jsx";

const AddExpenses = () => {
    const [isModelVisible, setIsModelVisible] = useState(false)

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
                <div
                    className="p-4 flex justify-between border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                    <div className="flex">
                        <img src={expensesIcon} alt="Income Icon" className="w-9 h-9 mx-1"/>
                        <h1 className="font-bold text-2xl mx-1">Expenses Management</h1>
                    </div>
                    <div>
                        <AddBtn btnName="Add Expense" onClick={() => {showModel(false)}}/>
                        {isModelVisible && (
                            <div id="crud-modal" tabIndex="-1" aria-hidden="true"
                                 className="flex justify-center backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                <div className="relative p-4 w-full max-w-md max-h-full">
                                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                        <div
                                            className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                Add Expenses Details
                                            </h3>
                                            <ModalCloseBtn onClose={() => {showModel(true)}}/>
                                        </div>
                                        <form className="p-4 md:p-5">
                                            <div className="grid gap-4 mb-4 grid-cols-2">
                                                <FormInputField inputName="expenseAmount" type="number" labelName="Expense Amount" placeHolder="Expense Amount"/>
                                                <FormSelectInput labelName="Category" categories={["Home", "Foods", "Transport"]}/>
                                            </div>
                                            <FormSubmitBtn btnName="Add Expense"/>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddExpenses
