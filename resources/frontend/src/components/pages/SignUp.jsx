import {Link} from "react-router-dom";
import InputLayout from "../common/formFields/InputLayout.jsx";
import ButtonLayout from "../common/formFields/ButtonLayout.jsx";
import {useContext, useState} from "react";
import HandelInputDataAction from "../../actions/form/HandelInputDataAction.jsx";
import axios from "axios";
import {MessageContext} from "../common/MessageContext.jsx";
import ErrorAlertWithDetails from "../common/alertMessages/ErrorAlertWithDetails.jsx";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';


const SignUp = () => {
    const [userDetails, setUserDetails] = useState({firstName : "", lastName : "", email : "", password : ""})
    const {responseMessage, setResponseMessage} = useContext(MessageContext)
    const [showToast, setShowToast] = useState(false)

    const submitUserRegForm = async (event) => {
        event.preventDefault()
        try{
            const userRegResponse = await axios.post('http://127.0.0.1:8000/api/add-registered-user', userDetails)

            if(userRegResponse.status === 200){
                setUserDetails({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: ""
                })
                toast.success(userRegResponse.data.message)
                setResponseMessage("")
            }
        }catch(error){
            setResponseMessage(error.response.data.errors)
        }
    }
    return(
        <>
            <div className="h-screen w-full bg-[url('/images/signup_bg.png')] bg-no-repeat bg-cover bg-center bg-fixed">
                <div
                    className="flex flex-col items-start justify-center bg-opacity-25 px-6 py-8 mx-20 md:h-screen lg:py-0">
                    <div
                        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 overflow ">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create An Account
                            </h1>
                            {responseMessage && <ErrorAlertWithDetails responseMessage={responseMessage}/>}
                            <form className="space-y-4 md:space-y-6" onSubmit={submitUserRegForm}>
                                <InputLayout type="text" lableName="First Name" inputName="firstName"
                                             placeholder="First Name" value={userDetails.firstName} onChange={HandelInputDataAction(setUserDetails)}/>

                                <InputLayout type="text" lableName="Last Name" inputName="lastName"
                                             placeholder="Last Name" value={userDetails.lastName} onChange={HandelInputDataAction(setUserDetails)}/>

                                <InputLayout type="email" lableName="Your email" inputName="email"
                                             placeholder="name@company.com"
                                             value={userDetails.email}
                                             onChange={HandelInputDataAction(setUserDetails)}/>

                                <InputLayout type="password" lableName="Password" inputName="password"
                                             placeholder="••••••••"
                                             value={userDetails.password}
                                             onChange={HandelInputDataAction(setUserDetails)}/>

                                <ButtonLayout type="submit" btnName="Sign Up"/>

                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <Link to="/"
                                                                   className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign
                                    in</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
                <ToastContainer/>
            </div>
        </>
    )
}

export default SignUp
