import wallet from "../../../assets/images/wallet.png";
import {Link} from "react-router-dom";

const WalletsBtn = () => {
    return(
        <>
            <Link to="/dashboard/wallets"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <img src={wallet} alt="Wallet" className='w-5 h-5'/>
                <span className="flex-1 ms-3 whitespace-nowrap">Wallets</span>
            </Link>
        </>
    )
}

export default WalletsBtn
