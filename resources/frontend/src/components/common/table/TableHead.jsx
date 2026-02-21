const TableHead = ({headings}) => {
    return(
        <>
            <thead
                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {
                    headings.map((heading, index) => {
                        return(
                            <th key={index} scope="col" className="px-6 py-3">
                                {heading}
                        </th>
                        )
                    })
                }
            </tr>
            </thead>
        </>
    )
}

export default TableHead
