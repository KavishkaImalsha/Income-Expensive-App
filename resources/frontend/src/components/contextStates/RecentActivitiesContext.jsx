import {createContext, useEffect, useState} from "react";
import customApi from "../api/customApi.jsx";

export const RecentActivitiesContext = createContext();

export const RecentActivitiesProvider = (({children}) => {
    const [recentActivities, setRecentActivities] = useState(() => {
        const savedActivities = localStorage.getItem("recentActivities");

        return savedActivities ? JSON.parse(savedActivities) : []
    })

    useEffect(() => {
        localStorage.setItem('recentActivities', JSON.stringify(recentActivities))
    }, [recentActivities]);

    const addRecentActivity = async (userId ,type, description) => {
        const data = {
            user_id: userId,
            type: type,
            activity: description
        }

        const recentActivitiesRes = await customApi.post('http://127.0.0.1:8000/api/add-recent-activity', data)

        if(recentActivitiesRes.status){
            console.log(recentActivitiesRes.data.message)
        }
    }

    return (
        <RecentActivitiesContext.Provider value={{recentActivities, addRecentActivity}}>
            {children}
        </RecentActivitiesContext.Provider>
    )
})
