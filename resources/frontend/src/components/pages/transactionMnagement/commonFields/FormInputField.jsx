import {useState} from "react";

const FormInputField = ({inputName, type, labelName, placeHolder, value, onChange}) => {


    return(
        <>
            <div className="col-span-2">
                <label htmlFor={inputName}
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labelName}</label>
                <input type={type} name={inputName} id={inputName}
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                       placeholder={placeHolder} required=""
                       value={value}
                       onChange={(event) => {onChange(event)}}
                />
            </div>
        </>
    )
}

export default FormInputField
