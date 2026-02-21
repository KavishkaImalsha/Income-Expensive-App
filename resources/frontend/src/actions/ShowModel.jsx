const ShowModel = (setState, setResponseMessage, isVisible) => {
    if(!isVisible){
        setState(true)
        setResponseMessage("")
        return
    }
    setState(false)
    setResponseMessage("")
}

export default ShowModel
