import {Navigate} from "react-router-dom";

const ProtectRoutes = ({children}) => {
    const token = sessionStorage.getItem('auth_token')

    if(!token){
        return <Navigate to="/"/>
    }

    return children
}

export default ProtectRoutes
