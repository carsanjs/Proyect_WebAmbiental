import axios from "axios";
const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

const axiosInstance = axios.create({ baseURL });
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

export const fetchDevices = async () => {
  try {
    const response = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/device/get`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching devices:", error);
    return null;
  }
};

export const fetchClassroom = async () => {
  try {
    const response = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/livingroom/get/`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching classroom", error);
    return null;
  }
};

interface SensorId {
  id_sensor: string;
}
export const fetchSensorNameById = async (
  id: SensorId
): Promise<string | null> => {
  try {
    const response = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/sensors/${id.id_sensor}`
    );
    console.log(response.data);
    return response.data.name_sensor;
  } catch (error) {
    console.error("Error fetching sensor name:", error);
    return null;
  }
};

export const fetchSensors = async () => {
  try {
    const response = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/sensors/getitems/`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const fetchStudents = async () => {
  try {
    const response = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/users/`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
};

interface ID {
  user_id: string;
}
interface IDHistory {
  id_history: string;
}
export const DeleteUserId = async (user: ID) => {
  try {
    const response = await axiosInstance.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/delet/${user.user_id}`
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
};

export const DeleteAllHistory = async () => {
  try {
    await axiosInstance.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/history/historydelete`
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
};

export const DeleteHistoryId = async (history: IDHistory) => {
  try {
    await axiosInstance.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/history/delet/${history.id_history}`
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
};

export const fetchHistoryDate = async (date: string | null = null) => {
  try {
    const response = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/history/filter/${date}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching History:", error);
    return null;
  }
};

interface FilterData {
  name_lroom: string;
  number_lroom: number;
}

export const fetchFilterName_Number = async (filter: string): Promise<FilterData | null> => {
  try {
    const response = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/livingroom/filter-lroom${filter}`
    );
    // const { name_lroom, number_lroom } = response.data; 
    // console.log(name_lroom);
    // console.log(number_lroom)
    const data_ = response.data
    console.log(response.data);
    return data_ ;
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
