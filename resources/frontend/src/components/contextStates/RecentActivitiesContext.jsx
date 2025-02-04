import {createContext, useEffect, useState} from "react";
import customApi from "../api/customApi.jsx";

export const RecentActivitiesContext = createContext();

export const RecentActivitiesProvider = (({children}) => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [recentActivities, setRecentActivities] = useState([])

    useEffect(() => {
        const fetchRecentActivities = async () => {
            const savedActivities = await customApi.get(`http://127.0.0.1:8000/api/get-recent-activities/${user.uuid}`);
            savedActivities ? setRecentActivities(savedActivities.data.recent_activities) : []
        }
        fetchRecentActivities()
    }, []);

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
