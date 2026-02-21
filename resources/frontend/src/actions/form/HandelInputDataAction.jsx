const HandelInputDataAction = (setState) => {
    return (event) => {
        setState((prevState) => ({
            ...prevState,
            [event.target.name] : event.target.value
        }))
    }
}

export default HandelInputDataAction
