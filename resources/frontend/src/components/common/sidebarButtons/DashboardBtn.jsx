import {Link} from "react-router-dom";
import dashboardIcon from "../../../assets/images/dashboard.png"

const DashboardBtn = () => {
    return(
        <>
            <Link to='/dashboard/main-dashboard'
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <img src={dashboardIcon} alt="Dashboard Icon" className="w-5 h-5"/>
                <span className="ms-3">Dashboard</span>
            </Link>
        </>
    )
}

export default DashboardBtn
