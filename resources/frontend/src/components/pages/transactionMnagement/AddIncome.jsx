import incomeIcon from "../../../assets/images/income.png";
import {useState} from "react";
import FormSubmitBtn from "./commonFormFields/FormSubmitBtn.jsx";
import FormInputField from "./commonFormFields/FormInputField.jsx";
import FormSelectInput from "./commonFormFields/FormSelectInput.jsx";

const AddIncome = () => {
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
                <div className="p-4 flex justify-between border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                    <div className="flex">
                        <img src={incomeIcon} alt="Income Icon" className="w-9 h-9 mx-1"/>
                        <h1 className="font-bold text-2xl mx-1">Income Management</h1>
                    </div>
                    <div>
                        <button
                            onClick={() => {showModel(isModelVisible)}}
                                className="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                type="button">
                            Add Income
                        </button>

                        {isModelVisible && (
                            <div id="crud-modal" tabIndex="-1" aria-hidden="true"
                                 className="flex justify-center backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                <div className="relative p-4 w-full max-w-md max-h-full">
                                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                        <div
                                            className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                Add Income Details
                                            </h3>
                                            <button type="button"
                                                    onClick={() => {
                                                        showModel(isModelVisible)
                                                    }}
                                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                                    data-modal-toggle="crud-modal">
                                                <svg className="w-3 h-3" aria-hidden="true"
                                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                    <path stroke="currentColor" stroke-linecap="round"
                                                          stroke-linejoin="round" stroke-width="2"
                                                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                                </svg>
                                                <span className="sr-only">Close modal</span>
                                            </button>
                                        </div>
                                        <form className="p-4 md:p-5">
                                            <div className="grid gap-4 mb-4 grid-cols-2">
                                                <FormInputField inputName="incomeAmount" labelName="Income Amount" type="numner" placeHolder="Income Amount"/>
                                                <FormSelectInput labelName="Category" categories={["Salary", "Online Money", "Others"]}/>
                                            </div>
                                            <FormSubmitBtn btnName="Add Income"/>
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
export default AddIncome
