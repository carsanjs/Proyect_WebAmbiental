"use client";
import Breadcrumb from '../../../../../../components/Breadcrumb/Breadcrumb';
import Tabla from '../../../../../../components/share/Table/Device/table';
import { useRouter } from 'next/navigation';
import { IoChevronBackCircleOutline } from "react-icons/io5";

export default function TablaUsers(){
  const router = useRouter();
  const handleButtonClick = () => {
    router.back();
  };

  return (
      <div className="w-full h-screen md:p-2 2xl:p-0">
      <button className="btnback" onClick={handleButtonClick}>
        <IoChevronBackCircleOutline
      /></button>
      <Breadcrumb pageName="Tabla/Dispositivos" />
      <Tabla></Tabla>
      </div>
  );
};
