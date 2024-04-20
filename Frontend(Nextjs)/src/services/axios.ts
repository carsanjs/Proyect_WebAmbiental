
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

export const fetchDevices = async () => {
    try {
      const response = await axiosInstance.get(`${baseURL}/device/get`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching devices:", error);
      return null;
    }
  };


  export const fetchSensors = async () => {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sensors/getitems/`);
        console.log(response.data);
        return response.data;
        } catch (error) {
         console.error("Error fetching classrooms:", error);
         return null;
        } 
  };


export const fetchStudents = async () => {
  
    try {
      const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/users/`);
      console.log(response.data);
      return response.data;

    } catch (error) {
      console.error("Error fetching users:", error);
      return null;
    }
  };

interface ID{
  user_id:string
}
interface IDHistory{
  id_history:string;
}
  export const DeleteUserId = async (user:ID) => {
    try {
      const response = await axiosInstance.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/delet/${user.user_id}`);
      console.log(response);
      return response
    } catch (error) {
      console.error("Error fetching users:", error);
      return null;
    }
  };

  export const DeleteAllHistory = async () => {
    try {
  await axiosInstance.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sensors/historydelete/-all`);
    } catch (error) {
      console.error("Error fetching users:", error);
      return null;
    }
  };

  export const DeleteHistoryId = async (history:IDHistory) => {
    try {
      await axiosInstance.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sensors/history/${history.id_history}`);
    } catch (error) {
      console.error("Error fetching users:", error);
      return null;
    }
  };

export const fetchHistory = async () => {
    try {
      const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sensors/history/`);
     console.log(response.data);
      return response.data;
  
    } catch (error) {
      console.error("Error fetching History:", error);
      return null;
    }
  };
//   try {
//     const response = await axiosInstance.get(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/sensors/getitems/`
//     );
//     setSensors(response.data);
//     console.log(response.data);
//   } catch (error) {
//     console.error("Error fetching classrooms:", error);
//   } finally {
//     console.log("finally");
//   }