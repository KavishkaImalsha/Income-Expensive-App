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
import ErrorAlertWithDetails from "../../common/alertMessages/ErrorAlertWithDetails.jsx";
import TableHead from "../../common/table/TableHead.jsx";
import TableThRow from "../../common/table/TableThRow.jsx";
import TableActionButtons from "../../common/table/TableActionButtons.jsx";
import HandelInputDataAction from "../../../actions/form/HandelInputDataAction.jsx";
import ShowModel from "../../../actions/ShowModel.jsx";
import {RecentActivitiesContext} from "../../contextStates/RecentActivitiesContext.jsx";
import customApi from "../../api/customApi.jsx";

const AddCategories = () => {
    const {responseMessage, setResponseMessage} = useContext(MessageContext)
    const {addRecentActivity} = useContext(RecentActivitiesContext)
    const [isModelVisible, setIsModelVisible] = useState(false)
    const [formData, setFormData] = useState({
        'category_name' : "",
        'category_type' : ""
    })
    const [categories , setCategories] = useState({'categories' : [], 'loading' : true})
    const user = JSON.parse(sessionStorage.getItem('user'))

    useEffect(() => {
        fetchCategories()
    }, []);

    const fetchCategories = async () => {
        const categoriesResponse = await customApi.get(`http://127.0.0.1:8000/api/get-categories/${user.uuid}`);
        if(categoriesResponse.status === 200){
            setCategories({
                'categories' : categoriesResponse.data.data,
                'loading' : false
            })
        }
    }

    const handelFormData = async (event) => {
        event.preventDefault()
        try{
            const response = await customApi.post(`http://127.0.0.1:8000/api/add-category/${user.uuid}`, formData)
            if(response.status === 200){
                setFormData({
                    "category_name": "",
                    'category_type': ""
                })
                setIsModelVisible(false)
                setResponseMessage(response.data.message)
                addRecentActivity(formData.category_type, `Add ${formData.category_name} as ${formData.category_type} category type`)
                fetchCategories()
            }
        }catch (error) {
            setResponseMessage(error.response.data.errors)
        }
    }

    const deleteCategory = async ($category_id) => {
        const deleteResponse = await customApi.delete(`http://127.0.0.1:8000/api/delete-category/${$category_id}/${user.uuid}`)
        if(deleteResponse.status === 200){
            setResponseMessage(deleteResponse.data.message)
            fetchCategories()
        }
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
                            ShowModel(setIsModelVisible, setResponseMessage, false)
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
                                                ShowModel(setIsModelVisible, setResponseMessage, true)
                                            }}/>
                                        </div>
                                        {responseMessage && (<ErrorAlertWithDetails responseMessage={responseMessage} setResponseMessage={setResponseMessage}/>)}
                                        <form onSubmit={handelFormData} className="p-4 md:p-5">
                                            <div className="grid gap-4 mb-4 grid-cols-2">
                                                <FormInputField inputName="category_name" labelName="Category Name" type="text" placeHolder="Category Name" value={formData.category_name} onChange={HandelInputDataAction(setFormData)}/>
                                                <FormSelectInput labelName="Category Type" fieldName="category_type" categories={["Income", "Expense"]} value={formData.category_type} onChange={HandelInputDataAction(setFormData)}/>
                                            </div>
                                            <FormSubmitBtn btnName="Add Category"/>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {responseMessage && !isModelVisible && (<SuccessAlert responseMessage={responseMessage} setResponseMessage={setResponseMessage}/>)}
                {categories.loading ? (<LoadingSpining/>) :
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-2">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <TableHead headings={["Category Name", "Category Type", "Actions"]}/>
                            <tbody>
                            {categories.categories.map((category) => {
                                return (
                                    <tr key={category.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <TableThRow data={category.category_name}/>
                                        <td className={`px-6 py-4 ${category.category_type === 'Expense' ? 'text-red-500' : 'text-green-500'}`}>
                                            {category.category_type}
                                        </td>
                                        <TableActionButtons id={category.id} click={() => {deleteCategory(category.id)}}/>
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
