import {Link} from "react-router-dom";

const TableActionButtons = ({id, click}) => {
    return(
        <>
            <td className="px-6 py-4">
                <Link to={`/dashboard/edit-category/${id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link> |
                <button
                    onClick={click}
                    className="mx-2 font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
            </td>
        </>
    )
}

export default TableActionButtons
