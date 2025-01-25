import axios from "axios";

const customApi = axios.create({
    baseURL: "http://127.0.0.1:8000/api"
})

customApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("auth_token")

        if(config){
            config.headers.Authorization = `Bearer ${token}`
        }

        config.headers["content_type"] = "application/json"
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default customApi
