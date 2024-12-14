const FormSelectInput = ({labelName, categories}) => {
    return(
        <>
            <div className="col-span-2">
                <label htmlFor="category"
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labelName}</label>
                <select name="category"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                    <option selected="">Select category</option>
                    {categories.map((value, index) => {
                        return <option key={index} value="salary">{value}</option>
                    })}
                </select>
            </div>
        </>
    )
}

export default FormSelectInput
