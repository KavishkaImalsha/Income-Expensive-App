import {createContext, useEffect, useState} from "react";

export const RecentActivitiesContext = createContext();

export const RecentActivitiesProvider = (({children}) => {
    const [recentActivities, setRecentActivities] = useState(() => {
        const savedActivities = localStorage.getItem("recentActivities");

        return savedActivities ? JSON.parse(savedActivities) : []
    })

    useEffect(() => {
        localStorage.setItem('recentActivities', JSON.stringify(recentActivities))
    }, [recentActivities]);

    const addRecentActivity = (type, description) => {
        setRecentActivities((prevState) => [{
            type : type,
            description : description,
            timestamp : new Date()
        },
            ...prevState.slice(0 , 4)])
    }

    return (
        <RecentActivitiesContext.Provider value={{recentActivities, addRecentActivity}}>
            {children}
        </RecentActivitiesContext.Provider>
    )
})
