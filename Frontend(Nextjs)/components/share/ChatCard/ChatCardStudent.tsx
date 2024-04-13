import { useState, useEffect } from "react";
import axiosInstance from "@/services/axios";
import PostRegisterStudent from "@/app/validation/Interface/Studen";
import {formatDate} from "@/components/functions/Convert";

const ChatCardStudents = () => {
  const [students, setStudents] = useState<PostRegisterStudent[]>([]);

  useEffect(() => {
   
    const fetchStudents = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/users`
        );
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching classrooms:", error);
      } finally {
        console.log("finally");
      }
    };
    

      fetchStudents();

    return () => {

      //se Cancelan las solicitudes pendientes si es necesario
    };
  }, [setStudents]);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Estudiantes Registrados
      </h4>
      <div>
        {students.map((student, index) => (
          <div
            key={index}
            className="flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4"
          >
            <div className="relative h-14 w-14 rounded-full flex items-center justify-center">
              <span
                className={`absolute h-3.5 w-3.5 rounded-full border-2 text-white ${
                  student.is_active ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
            </div>
            <div className="flex flex-1 items-center justify-between">
              <div>
                <h5 className="text-left font-medium text-black dark:text-white">
                  {student.nombre}
                </h5>
                <p>
                  <span className="text-xs text-black">
                    Creado. &#8594; {formatDate(student.created_at)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatCardStudents;
