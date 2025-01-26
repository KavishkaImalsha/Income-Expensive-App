import {createContext, useState} from "react";

export const AuthUserContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState()

    const login = (userDetails) => {
        setUser(userDetails)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('auth_token')
    }
    return(
        <>
            <AuthUserContext.Provider value={{user, login, logout}}>
                {children}
            </AuthUserContext.Provider>
        </>
    )
}
