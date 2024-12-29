import categoriesIcon from "../../../assets/images/catagories.png";
import {useEffect, useState} from "react";
import FormSubmitBtn from "./commonFields/FormSubmitBtn.jsx";
import FormInputField from "./commonFields/FormInputField.jsx";
import FormSelectInput from "./commonFields/FormSelectInput.jsx";
import ModalCloseBtn from "./commonFields/ModalCloseBtn.jsx";
import AddBtn from "./commonFields/AddBtn.jsx";
import axios from "axios";
import {Link} from "react-router-dom";

const AddCategories = () => {
    const [isModelVisible, setIsModelVisible] = useState(false)
    const [formData, setFormData] = useState({
        'category_name' : "",
        'category_type' : ""
    })
    const [message , setMessage] = useState({'message' : '', 'color' : ''})
    const [categories , setCategories] = useState({'categories' : [], 'loading' : true})
    const [editCategory, setEditCategory] = useState({'editCategory' : [], 'loading' : true})

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
                        <AddBtn btnName="Add Category" onClick={() => {showModel(false)}}/>
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
                                            <ModalCloseBtn onClose={() => {showModel(true)}}/>
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
                {categories.loading ? (<div className="flex items-center justify-center mt-2">
                        <div role="status">
                            <svg aria-hidden="true"
                                 className="inline w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"/>
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"/>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>) :
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
