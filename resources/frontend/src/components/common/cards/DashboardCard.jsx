const DashboardCard = ({image, title, textColor, amount}) => {
    return(
        <>
            <div
                className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img src={image} className="w-12 h-12 m-auto text-gray-500 dark:text-gray-400 mb-3"
                     alt="image"/>
                <h1 className="text-2xl text-center">{title}</h1>
                <p className={`text-2xl font-bold text-center text-${textColor}-500`}>Rs: {amount}</p>
            </div>
        </>
    )
}

export default DashboardCard
