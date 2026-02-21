import AccountIcon from "../../../../assets/icons/AccountIcon.jsx";
import {Link} from "react-router-dom";

const AccountBtn = () => {
    return(
        <>
            <div className="pl-2 hover:rounded-r-lg hover:bg-gray-50 cursor-pointer">
                <Link to='/dashboard/settings/edit-account' className='flex'>
                    <AccountIcon/>
                    <span className='text-lg font-poppins my-auto'>Account</span>
                </Link>
            </div>
        </>
    )
}

export default AccountBtn
