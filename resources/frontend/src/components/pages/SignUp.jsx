import {Link} from "react-router-dom";
import InputLayout from "../common/formFields/InputLayout.jsx";
import ButtonLayout from "../common/formFields/ButtonLayout.jsx";

const SignUp = () => {
    return(
        <>
            <div className="h-screen w-full bg-[url('/public/images/signup_bg.png')] bg-no-repeat bg-cover">
                <div
                    className="flex flex-col items-start justify-center bg-opacity-25 px-6 py-8 mx-20 md:h-screen lg:py-0">
                    <div
                        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create An Account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <InputLayout type="text" lableName="First Name" inputName="firstName" placeholder="First Name"/>

                                <InputLayout type="text" lableName="Last Name" inputName="lastName" placeholder="Last Name"/>

                                <InputLayout type="email" lableName="Your email" inputName="email" placeholder="name@company.com"/>

                                <InputLayout type="password" lableName="Password" inputName="password" placeholder="••••••••"/>

                                <ButtonLayout type="submit" btnName="Sign Up"/>

                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <Link to="/"
                                                                   className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp
