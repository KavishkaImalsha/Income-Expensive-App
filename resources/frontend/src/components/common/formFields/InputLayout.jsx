const InputLayout = ({type, inputName, lableName, placeholder, onChange, value}) => {
    return(
        <>
            <div>
                <label htmlFor={inputName}
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{lableName}</label>
                <input type={type} name={inputName} id={inputName}
                       className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       onChange={(event) => {onChange(event)}}
                       placeholder={placeholder} required=""
                        value={value}
                />
            </div>
        </>
    )
}

export default InputLayout
