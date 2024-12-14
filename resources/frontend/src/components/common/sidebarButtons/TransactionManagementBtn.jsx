import transactionIcon from "../../../assets/images/transactionIcon.png";

const TransactionManagementBtn = () => {
    return(
        <>
            <a href="#"
               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <img src={transactionIcon} alt="TransactionIcon" className="w-5 h-5"/>
                <span className="flex-1 ms-3 whitespace-nowrap">Transaction Management</span>
            </a>
        </>
    )
}

export default TransactionManagementBtn
