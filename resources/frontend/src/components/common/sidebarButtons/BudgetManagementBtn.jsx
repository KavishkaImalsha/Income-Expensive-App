import budgetIcon from "../../../assets/images/budgetIcon.png";

const BudgetManagementBtn = () => {
    return(
        <>
            <a href="#"
               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <img src={budgetIcon} alt="BudgetIcon" className="w-5 h-5"/>
                <span className="flex-1 ms-3 whitespace-nowrap">Budget Management</span>
            </a>
        </>
    )
}

export default BudgetManagementBtn
