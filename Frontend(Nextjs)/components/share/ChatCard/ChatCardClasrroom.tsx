import { useState, useEffect } from "react";
import axiosInstance from "@/services/axios";
import { formatDate } from "@/components/functions/Convert";

interface getClassroom {
  name_lroom: string;
  number_lroom: number;
  is_active: boolean;
  created_at: string;
  amount_devices: string;
}

const ChatCardClasrroom = () => {
  const [classrooms, setClassrooms] = useState<getClassroom[]>([]);
  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/livingroom/get/`
        );
        setClassrooms(response.data);
      } catch (error) {
        console.error("Error fetching classrooms:", error);
      } finally {
        console.log("finally");
      }
    };
    
    fetchClassrooms();
    return () => {
      // Cancela las solicitudes pendientes si es necesario
    };
  }, [classrooms]);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Salones Registrados
      </h4>
      <div>
      {classrooms.length === 0 ? (
          <span className="cero-device text-sm text-black-500 px-7.5 dark:text-gray-400">
            No hay Salones registrados
          </span>
        ) : (
       <>
       {classrooms.map((classroom, index) => (
          <div
            key={index}
            className="flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4"
          >
            <div className="relative h-14 w-14 rounded-full flex items-center justify-center">
              <span
                className={`absolute h-3.5 w-3.5 rounded-full border-2 text-white ${
                  classroom.is_active ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
            </div>
            <div className="flex flex-1 items-center justify-between">
              <div>
                <h5 className="text-left font-medium text-black dark:text-white">
                  {classroom.number_lroom}
                </h5>
                <p>
                  <span className="text-sm text-black dark:text-white">
                    {classroom.name_lroom}
                  </span>
                  <span className="text-xs text-black">
                    {" "}
                    .{formatDate(classroom.created_at)}
                  </span>
                </p>
              </div>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                {classroom.amount_devices !== null ? (
                  <span className="text-sm font-medium text-white">0</span>
                ) : (
                  <span className="text-sm font-medium text-white">
                    {classroom.amount_devices}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
       </>
       )}
      </div>
    </div>
  );
};

export default ChatCardClasrroom;
