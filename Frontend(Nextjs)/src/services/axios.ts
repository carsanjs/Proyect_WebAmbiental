
import axios from "axios";

const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`

const axiosInstance = axios.create({baseURL})

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
)

export default axiosInstance;