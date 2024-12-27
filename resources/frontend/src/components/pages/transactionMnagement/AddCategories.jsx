import categoriesIcon from "../../../assets/images/catagories.png";
import {useState} from "react";
import FormSubmitBtn from "./commonFields/FormSubmitBtn.jsx";
import FormInputField from "./commonFields/FormInputField.jsx";
import FormSelectInput from "./commonFields/FormSelectInput.jsx";
import ModalCloseBtn from "./commonFields/ModalCloseBtn.jsx";
import AddBtn from "./commonFields/AddBtn.jsx";
import axios from "axios";

const AddCategories = () => {
    const [isModelVisible, setIsModelVisible] = useState(false)
    const [formData, setFormData] = useState({
        'category_name' : "",
        'category_type' : ""
    })
    const [message , setMessage] = useState({'message' : '', 'color' : ''})

    const handleInputData = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name] : event.target.value
        }))
    }

    const handelFormData = async (event) => {
        event.preventDefault()

        try{
            const response = await axios.post('http://127.0.0.1:8000/api/add-category', formData)
            if(response.status === 200){
                setMessage({
                    'message': response.data.message,
                    'color' : 'bg-green-400'
                })
                setFormData({
                    "category_name": "",
                    'category_type': ""
                })
            }
        }catch (error) {
            setMessage({
                'message': error.response.data.message,
                'color' : 'bg-red-400'
            })
        }
    }
    const showModel = (isVisible) => {
        if(!isVisible){
            setIsModelVisible(true)
            return
        }
        setIsModelVisible(false)
        setMessage({'message': '', 'color': ''})
    }
    return(
        <>
            <div className="p-4 sm:ml-64">
                <div
                    className="p-4 flex justify-between border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                    <div className="flex">
                        <img src={categoriesIcon} alt="Income Icon" className="w-9 h-9 mx-1"/>
                        <h1 className="font-bold text-2xl mx-1">Category Management</h1>
                    </div>
                    <div>
                        <AddBtn btnName="Add Category" onClick={() => {showModel(false)}}/>
                        {isModelVisible && (
                            <div id="crud-modal" tabIndex="-1" aria-hidden="true"
                                 className="flex justify-center backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                <div className="relative p-4 w-full max-w-md max-h-full">
                                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                        <div
                                            className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                Add Category Details
                                            </h3>
                                            <ModalCloseBtn onClose={() => {showModel(true)}}/>
                                        </div>
                                        {message && <div className={`${message.color} my-2 mx-4 rounded`} >
                                            <p className="text-center text-white">{message.message}</p>
                                        </div>}
                                        <form onSubmit={handelFormData} className="p-4 md:p-5">
                                            <div className="grid gap-4 mb-4 grid-cols-2">
                                                <FormInputField inputName="category_name" labelName="Category Name" type="text" placeHolder="Category Name" value={formData.categoryName} onChange={handleInputData}/>
                                                <FormSelectInput labelName="Category Type" categories={["Income", "Expense"]} value={formData.categoryType} onChange={handleInputData}/>
                                            </div>
                                            <FormSubmitBtn btnName="Add Category"/>
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
export default AddCategories
