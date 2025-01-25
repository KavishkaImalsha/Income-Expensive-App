import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import ModalCloseBtn from "../commonFields/ModalCloseBtn.jsx";
import FormInputField from "../commonFields/FormInputField.jsx";
import FormSelectInput from "../commonFields/FormSelectInput.jsx";
import FormSubmitBtn from "../commonFields/FormSubmitBtn.jsx";
import LoadingSpining from "../../../common/LoadingSpining.jsx";
import {useContext} from "react";
import {MessageContext} from "../../../common/MessageContext.jsx";
import {RecentActivitiesContext} from "../../../contextStates/RecentActivitiesContext.jsx";
import customApi from "../../../api/customApi.jsx";

const EditCategory = () => {
    const id = useParams()
    const navigate = useNavigate()
    const {setResponseMessage} = useContext(MessageContext)
    const {addRecentActivity} = useContext(RecentActivitiesContext)
    const [loading , setLoading] = useState(true)
    const [formData, setFormData] = useState({'category_name' : '', 'category_type' : ''})

    useEffect(() => {
        const fetchCategory = async () => {
           const responseCategory = await customApi.get(`http://127.0.0.1:8000/api/edit-category/${id.id}`)
            if(responseCategory.status === 200){
                setFormData({
                    'category_name' : responseCategory.data.data.category_name,
                    'category_type' : responseCategory.data.data.category_type
                })
                setLoading(false)
            }
        }
        fetchCategory()
    }, []);

    const handelFormData = (event) => {
        setFormData((prevState) => ({
            ...prevState,
                [event.target.name] : event.target.value
        }))
    }

    const handelFormSubmit = async (event) => {
        event.preventDefault()
        const updateResponse = await customApi.put(`http://127.0.0.1:8000/api/update-category/${id.id}`, formData);
        if (updateResponse.status === 200){
            setResponseMessage(updateResponse.data.message)
            addRecentActivity(formData.category_type, `Edit ${formData.category_name} as ${formData.category_type}`)
        }
        navigate('/add-categories')
    }

    const closeModel = () => {
        navigate('/dashboard/add-categories')
    }
    return(
            <>
                {loading ? (<div className="mt-20">
                        <LoadingSpining/>
                    </div>) :
                    (<div id="crud-modal" tabIndex="-1" aria-hidden="true"
                         className="flex justify-center backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div className="relative p-4 w-full max-w-md max-h-full">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <div
                                    className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Edit Category Details
                                    </h3>
                                    <ModalCloseBtn onClose={closeModel}/>
                                </div>
                                <form onSubmit={handelFormSubmit} className="p-4 md:p-5">
                                    <div className="grid gap-4 mb-4 grid-cols-2">
                                        <FormInputField inputName="category_name" labelName="Category Name" type="text"
                                                        placeHolder="Category Name"
                                                        value={formData.category_name} onChange={handelFormData}/>
                                        <FormSelectInput labelName="Category Type" categories={["Income", "Expense"]} fieldName="category_type"
                                                         value={formData.category_type} onChange={handelFormData}/>
                                    </div>
                                    <FormSubmitBtn btnName="Update Category"/>
                                </form>
                            </div>
                        </div>
                    </div>)}
            </>
    )
}

export default EditCategory
