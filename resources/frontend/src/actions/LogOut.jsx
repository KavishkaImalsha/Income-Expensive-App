import {redirect, useNavigate} from "react-router-dom";
const LogOut = () => {
    console.log("hello")
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('auth_token')
    window.location.reload()
}

export default LogOut
