import {useState} from "react";
import {Eye, EyeOff} from "lucide-react";

const InputLayout = ({type, inputName, lableName, placeholder, onChange, value, textColor}) => {
    const [isPasswordShow, setIsPasswordShow] = useState(false)

    const showPassword = () => {
        isPasswordShow ? setIsPasswordShow(false) : setIsPasswordShow(true)
    }
    return(
        <>
            <div>
                <label htmlFor={inputName}
                       className={`block mb-2 text-sm font-medium ${textColor ? textColor : 'text-gray-900'} dark:text-white`}>{lableName}</label>
                <div className='relative'>
                    <input type={isPasswordShow ? 'text' : type} name={inputName} id={inputName}
                           className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           onChange={(event) => {
                               onChange(event)
                           }}
                           placeholder={placeholder} required=""
                           value={value}
                           autoComplete="off"
                    />
                    {type === 'password' &&
                        <button
                            type='button'
                            onClick={() => {showPassword()}}
                            className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500'>
                            {isPasswordShow ? <EyeOff size={18}/> : <Eye size={18}/>}
                        </button>}
                </div>
            </div>
        </>
    )
}

export default InputLayout
