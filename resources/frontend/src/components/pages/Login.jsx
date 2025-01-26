import {Link, useNavigate} from "react-router-dom";
import InputLayout from "../common/formFields/InputLayout.jsx";
import ButtonLayout from "../common/formFields/ButtonLayout.jsx";
import {useContext, useState} from "react";
import axios from "axios";
import HandelInputDataAction from "../../actions/form/HandelInputDataAction.jsx";
import { ToastContainer, toast } from 'react-toastify';
import {AuthUserContext} from "../contextStates/auth/AuthUserContext.jsx";

const Login = () => {
    const [userCredentials, setUserCredentials] = useState({email : "", password : ""})
    const navigate = useNavigate()
    const {login} = useContext(AuthUserContext)

    const handelLogin = async (event) => {
        event.preventDefault()

        try {
            const loginResponse = await axios.post('http://127.0.0.1:8000/api/login', userCredentials)
            if(loginResponse.status === 200){
                localStorage.setItem("auth_token", loginResponse.data.token)
                navigate('/dashboard')
                login(loginResponse.data.user)
            }
            else{
                toast.error("Invalid Credentials", {
                    position: "top-center"
                })
            }
        }catch (error){
            toast.error("Invalid Credentials", {
                position: "top-center"
            })
        }
    }
    return(
        <>
            <div className="h-screen w-full bg-[url('/public/images/login_bg.png')] bg-cover bg-no-repeat">
                    <div className="flex flex-col items-end justify-center bg-opacity-25 px-6 py-8 mx-20 md:h-screen lg:py-0">
                        <div
                            className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Sign in to your account
                                </h1>
                                <form className="space-y-4 md:space-y-6" onSubmit={handelLogin}>
                                    <InputLayout type="email" lableName="Your email" inputName="email" placeholder="name@company.com"
                                        onChange={HandelInputDataAction(setUserCredentials)}
                                    />

                                    <InputLayout type="password" lableName="Password" inputName="password" placeholder="••••••••"
                                        onChange={HandelInputDataAction(setUserCredentials)}
                                    />

                                    <ButtonLayout type="submit" btnName="Sign In"/>

                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Don’t have an account yet? <Link to="/sign-up"
                                                                      className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign
                                        up</Link>
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

export default Login
