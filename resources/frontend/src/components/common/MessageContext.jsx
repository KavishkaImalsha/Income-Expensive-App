import {createContext, useState} from "react";

export const MessageContext = createContext()

const MessageProvider = ({children}) => {
    const [responseMessage, setResponseMessage] = useState('')

    return(
        <MessageContext.Provider value={{responseMessage, setResponseMessage}}>
            {children}
        </MessageContext.Provider>
    )
}

export default MessageProvider
