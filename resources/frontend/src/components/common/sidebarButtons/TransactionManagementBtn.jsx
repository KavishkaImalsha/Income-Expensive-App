import transactionIcon from "../../../assets/images/transactionIcon.png";
import incomeIcon from "../../../assets/images/income.png"
import expensesIcon from "../../../assets/images/expenses.png"
import categoriesIcon from "../../../assets/images/catagories.png"
import {Link} from "react-router-dom";
import {useState} from "react";

const TransactionManagementBtn = () => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false)

    const showDropDown = (isVisible) => {
        if(!isVisible){
            setIsDropdownVisible(true)
            return
        }
        setIsDropdownVisible(false)
    }


    return(
        <>
            <Link to="/add-income"
                  onClick={() => {showDropDown(isDropdownVisible)}}
               className="flex items-center py-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <img src={transactionIcon} alt="TransactionIcon" className="w-5 h-5"/>
                <span className="flex ms-3 whitespace-nowrap">
                    Transaction Management
                    <svg className="w-5 h-5 my-1" viewBox="0 0 15 15" fill="#000000" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                            fill="#000000"
                        />
                    </svg>
                </span>
            </Link>

            {
                isDropdownVisible && (
                    <ul className="mx-10 space-y-3">
                        <li><Link to="/add-income" className="flex">
                            <img src={incomeIcon} alt="Income Icon" className="w-5 h-5 mx-1"/>
                            Add Income
                        </Link></li>
                        <li><Link to="/add-expenses" className="flex">
                            <img src={expensesIcon} alt="Income Icon" className="w-5 h-5 mx-1"/>
                            Add Expenses</Link></li>
                        <li><Link to="/add-categories" className="flex">
                            <img src={categoriesIcon} alt="Income Icon" className="w-5 h-5 mx-1"/>
                            Add Categories</Link></li>
                    </ul>
                )
            }
        </>
    )
}

export default TransactionManagementBtn
