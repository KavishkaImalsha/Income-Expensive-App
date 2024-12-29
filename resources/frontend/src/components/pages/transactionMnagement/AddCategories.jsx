import categoriesIcon from "../../../assets/images/catagories.png";
import {useContext, useEffect, useState} from "react";
import FormSubmitBtn from "./commonFields/FormSubmitBtn.jsx";
import FormInputField from "./commonFields/FormInputField.jsx";
import FormSelectInput from "./commonFields/FormSelectInput.jsx";
import ModalCloseBtn from "./commonFields/ModalCloseBtn.jsx";
import AddBtn from "./commonFields/AddBtn.jsx";
import axios from "axios";
import {Link} from "react-router-dom";
import LoadingSpining from "../../common/LoadingSpining.jsx";
import {MessageContext} from "../../common/MessageContext.jsx";
import SuccessAlert from "../../common/alertMessages/SuccessAlert.jsx";

const AddCategories = () => {
    const {responseMessage, setResponseMessage} = useContext(MessageContext)
    console.log(responseMessage)
    const [isModelVisible, setIsModelVisible] = useState(false)
    const [formData, setFormData] = useState({
        'category_name' : "",
        'category_type' : ""
    })
    const [message , setMessage] = useState({'message' : '', 'color' : ''})
    const [categories , setCategories] = useState({'categories' : [], 'loading' : true})

    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesResponse = await axios.get('http://127.0.0.1:8000/api/get-categories');
            if(categoriesResponse.status === 200){
                setCategories({
                    'categories' : categoriesResponse.data.data,
                    'loading' : false
                })
            }
        }
        fetchCategories()
    }, []);

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
        window.location.reload()
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
                        <AddBtn btnName="Add Category" onClick={() => {
                            showModel(false)
                        }}/>
                        {isModelVisible && (
                            <div id="crud-modal" tabIndex="-1" aria-hidden="true"
                                 className="flex justify-center backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                <div className="relative p-4 w-full max-w-md max-h-full">
                                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                        <div
                                            className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                Add Category Details
                                            </h3>
                                            <ModalCloseBtn onClose={() => {
                                                showModel(true)
                                            }}/>
                                        </div>
                                        {message && <div className={`${message.color} my-2 mx-4 rounded`} >
                                            <p className="text-center text-white">{message.message}</p>
                                        </div>}
                                        <form onSubmit={handelFormData} className="p-4 md:p-5">
                                            <div className="grid gap-4 mb-4 grid-cols-2">
                                                <FormInputField inputName="category_name" labelName="Category Name" type="text" placeHolder="Category Name" value={formData.category_name} onChange={handleInputData}/>
                                                <FormSelectInput labelName="Category Type" categories={["Income", "Expense"]} value={formData.category_type} onChange={handleInputData}/>
                                            </div>
                                            <FormSubmitBtn btnName="Add Category"/>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {responseMessage && (<SuccessAlert responseMessage={responseMessage}/>)}
                {categories.loading ? (<LoadingSpining/>) :
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-2">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead
                                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Category Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category Type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {categories.categories.map((category) => {
                                return (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {category.category_name}
                                        </th>
                                        <td className={`px-6 py-4 ${category.category_type === 'Expense' ? 'text-red-500' : 'text-green-500'}`}>
                                            {category.category_type}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link to={`/edit-category/${category.id}`}
                                               className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
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
export default AddCategories
