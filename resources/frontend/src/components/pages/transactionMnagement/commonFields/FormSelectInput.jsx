const FormSelectInput = ({labelName, categories, value, onChange, fieldName}) => {
    return(
        <>
            <div className="col-span-2">
                <label htmlFor="category"
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labelName}</label>
                <select name={fieldName}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        value={value}
                        onChange={(event) => {onChange(event)}}
                >
                    <option selected="" value="">Select category</option>
                    {categories.map((category, index) => {
                        return <option key={index} value={category}>{category}</option>
                    })}
                </select>
            </div>
        </>
    )
}

export default FormSelectInput
