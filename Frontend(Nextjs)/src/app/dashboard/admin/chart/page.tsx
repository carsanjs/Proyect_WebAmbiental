"use client";
import Breadcrumb from '../../../../../components/Breadcrumb/Breadcrumb';
import ChartFour from '../../../../../components/view/Chart/ChartFour';
import ChartOne from '../../../../../components/view/Chart/ChartOne';
import ChartThree from '../../../../../components/view/Chart/ChartThree';
import ChartTwo from '../../../../../components/view/Chart/ChartTwo';
import Header from "../../../../../components/share/Header/HeaderCabezera";
import { useState} from "react";
export default function Chart(){
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
     <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="mx-auto max-w-screen-2xl h-screen md:p-2 2xl:p-0">
      <Breadcrumb pageName="Chart" />
{/* 
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12">
          <ChartFour />
        </div>
        <ChartOne />
        <ChartTwo />
        <ChartThree />
      </div> */}
      </div>
    </>
  );
};
