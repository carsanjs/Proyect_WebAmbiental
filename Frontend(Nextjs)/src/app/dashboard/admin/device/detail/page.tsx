"use client";
import Breadcrumb from '../../../../../../components/Breadcrumb/Breadcrumb';
import Tabla from '../../../../../../components/share/Table/Device/table';
import { useState, useEffect} from "react";
import { useRouter } from 'next/navigation';
import { IoChevronBackCircleOutline } from "react-icons/io5";

export default function TablaUsers(){
  const router = useRouter();
  // const [isloading, setIsloading] = useState<boolean>(false);

  const handleButtonClick = () => {
    router.back();
  };

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setIsloading(false);
  //   }, 4000);
  //   return () => clearTimeout(timeout);
  // }, []);

  return (
    <>
     {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
      <div className="mx-auto max-w-screen-2xl h-screen md:p-2 2xl:p-0">
      <button className="btnback" onClick={handleButtonClick}>
        <IoChevronBackCircleOutline
      /></button>
      <Breadcrumb pageName="Tabla/Dispositivos" />
      <Tabla></Tabla>
      </div>
    </>
  );
};
