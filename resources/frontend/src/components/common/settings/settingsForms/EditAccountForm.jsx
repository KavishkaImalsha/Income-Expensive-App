import InputLayout from "../../formFields/InputLayout.jsx";
import HandelInputDataAction from "../../../../actions/form/HandelInputDataAction.jsx";
import {useEffect, useState} from "react";

const EditAccountForm = () => {
    const [user, setUser] = useState({})
    const [changePassword, setChangePassword] = useState({currentPassword : "", newPassword : ""})

    useEffect(() => {
        setUser(JSON.parse(sessionStorage.getItem('user')))
    }, []);
    const handlePasswordChange = (event) => {
        setChangePassword((prevState) => {
            return {
                ...prevState,
                [event.target.name] : event.target.value
            }
        })
    }
    const HandelForm = (event) => {
        event.preventDefault()
        console.log(user)
        console.log(changePassword)
    }
    return (
        <div
            className="px-1 max-h-[500px] overflow-y-auto scrollbar-thin">
            <form onSubmit={HandelForm}>
                <div className='border-b'>
                    <h3 className="my-1 text-lg font-bold">Personal Information</h3>
                    <p className='text-gray-500 text-sm'>You can customize personal
                        information.</p>
                </div>
                <div>
                    <h1 className='text-sm my-3 font-bold'>Full name</h1>
                    <div className='flex gap-24'>
                        <InputLayout type='text' inputName='firstName' lableName='First Name'
                                     placeholder="First Name"
                                     onChange={HandelInputDataAction(setUser)}
                                     value={user.firstName} textColor='text-gray-500'/>
                        <InputLayout type='text' inputName='lastName' lableName='Last Name'
                                     placeholder="Last Name"
                                     onChange={HandelInputDataAction(setUser)}
                                     value={user.lastName}
                                     textColor='text-gray-500'/>
                    </div>
                </div>
                <div className='border-b-2 pb-2'>
                    <h1 className='text-sm my-3 font-bold'>Contact Email</h1>
                    {/*<p className='text-gray-500'>Manage your accounts email address for the invoices.</p>*/}
                    <InputLayout type='text' inputName='email' lableName="Email"
                                 placeholder="Email"
                                 value={user.email} onChange={HandelInputDataAction(setUser)}
                                 textColor='text-gray-500'/>
                </div>
                <div className='border-b-2 mb-5 mt-5'>
                    <h3 className="my-1 text-lg font-bold">Security Settings</h3>
                    <p className='text-gray-500 text-sm'>Manage your account's security settings
                        to
                        protect your personal information and enhance privacy.</p>
                </div>
                <div>
                    <h1 className='text-sm my-3 font-bold'>Change Password</h1>
                    <div className='flex gap-24'>
                        <InputLayout type='password' inputName='currentPassword'
                                     lableName='Enter Current Password' placeholder="*********"
                                     onChange={handlePasswordChange}
                                     textColor="text-gray-500"/>
                        <InputLayout type='password' inputName='newPassword'
                                     lableName='Enter New Password' placeholder="*********"
                                     onChange={handlePasswordChange}
                                     textColor="text-gray-500"/>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <button type="submit"
                            className="my-4 w-[40%] text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Save
                        Changes
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditAccountForm
