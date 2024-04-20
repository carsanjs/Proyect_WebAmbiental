import { useState, useEffect, useCallback } from "react";
import {fetchStudents} from "@/services/axios";
import PostRegisterStudent from "@/app/validation/Interface/Studen";
import {formatDate} from "@/components/functions/Convert";
import Ellipsis from "../../ui/Button/ButtonEllipsis/ButtonEllipsis";
import Modal from "../Modal/Modal";
import Table from "../Table/table"
import { useRouter } from "next/navigation";


const ChatCardStudents = () => {
  const router = useRouter()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [students, setStudents] = useState<PostRegisterStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchStudentsData = async () => {
    try {
      let studentsdata = await fetchStudents();
      if(studentsdata) {
        setStudents(studentsdata);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }

  useEffect(() => {
    fetchStudentsData();
  }, []);


  // const abrirModal = () => {
  //   router.push("/dashboard/admin/users/detail")
  //   setShowModal(true);
  // };

  // const cerrarModal = () => {
  //   setShowModal(false);
  // };
  return (
  
    <div>
    {loading ? ( 
      <p>Cargando estudiantes...</p>
    ) : (
      <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      
      <div className="flex justify-around">
        <h4 className="px-7.5 text-xl font-semibold text-black dark:text-white">
          Usuarios Registrados
        </h4>
        <Ellipsis 
        to="/dashboard/admin/users/detail"
        />
      </div>
      {/* {showModal && (
        <Modal onClose={cerrarModal}
        children={
        <Table
        
        />}
        >

        </Modal>
      )} */}
      <div>
      {students.length === 0 ? (
          <span className="cero-device text-sm px-7.5 dark:text-gray-400">
            No hay Usuarios registrados
          </span>
        ) : (
        <>
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
        </>
        )}
      </div>
    </div>
    )}
  </div>
  
  );
};

export default ChatCardStudents;
