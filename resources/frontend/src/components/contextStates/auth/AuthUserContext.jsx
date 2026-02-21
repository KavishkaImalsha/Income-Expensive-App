import {createContext, useState} from "react";

export const AuthUserContext = createContext()

export const AuthProvider = ({children}) => {
    const [isLogin, setIsLogin] = useState(true)

    const login = (userDetails) => {
    }

    const logout = () => {
        sessionStorage.removeItem('user')
        localStorage.removeItem('auth_token')
    }
    return(
        <>
            <AuthUserContext.Provider value={{login, logout, isLogin, setIsLogin}}>
                {children}
            </AuthUserContext.Provider>
        </>
    )
}
