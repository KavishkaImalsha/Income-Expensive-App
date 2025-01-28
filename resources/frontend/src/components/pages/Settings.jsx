import {useNavigate, Routes, Route, Navigate} from "react-router-dom";
import AccountIcon from "../../assets/icons/AccountIcon.jsx";
import InputLayout from "../common/formFields/InputLayout.jsx";
import {useEffect, useState} from "react";
import HandelInputDataAction from "../../actions/form/HandelInputDataAction.jsx";
import AccountBtn from "../common/settings/settingsSideBarButtons/AccountBtn.jsx";
import EditAccountForm from "../common/settings/settingsForms/EditAccountForm.jsx";

const Settings = () => {
    const navigate = useNavigate()

    const closeSettings = () => {
        navigate('/dashboard')
    }

    const HandelForm = (event) => {
        event.preventDefault()
        console.log(user)
        console.log(changePassword)
    }
    return (
        <>
            <div id="default-modal" tabIndex="-1" aria-hidden="true"
                 className="flex backdrop-blur overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-[90%]">
                <div className="relative w-full max-w-5xl max-h-[90%] border border-1 rounded-lg shadow-lg">

                    <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                        <div
                            className="flex items-center justify-between p-4 md:p-5 border-b-2 rounded-t dark:border-gray-600 border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Settings
                            </h3>
                            <button type="button"
                                    onClick={() => {closeSettings()}}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    data-modal-hide="default-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                     fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                          stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <div className='grid grid-cols-[30%_70%] divide-x divide-solid p-2'>
                            <div>
                                <ul>
                                    <li><AccountBtn/></li>
                                </ul>
                            </div>
                            <div>
                                <Routes>
                                    <Route path='/' element={<Navigate to='/dashboard/settings/edit-account'/>}/>
                                    <Route path='/edit-account' element={<EditAccountForm/>}/>
                                </Routes>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Settings
