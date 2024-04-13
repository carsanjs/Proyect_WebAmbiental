import { ApexOptions } from "apexcharts";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axiosInstance from "@/services/axios";

const options: ApexOptions = {
  legend: {
    show: false,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },
    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: "straight",
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: "#fff",
    strokeColors: ["#3056D3", "#80CAEE"],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: "category",
    categories: [
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: "0px",
      },
    },
    min: 0,
    max: 100,
  },
};

interface SensorData {
  timestamp: string;
  data: number;
}

interface SensorHistory {
  id_history: string;
  sensor_id: string;
  data: SensorData[];
}

const ChartOne: React.FC = () => {
  const [state, setState] = useState<SensorHistory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get<SensorHistory[]>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/sensors/history/`
        );
        console.log(response);
        setState(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000); // Actualiza los datos cada 5 segundos

    return () => clearInterval(intervalId);

  }, []);

  const prepareChartData = () => {
    return state.map((historyItem) => ({
      name: historyItem.sensor_id,
      data: Array.isArray(historyItem.data)
        ? historyItem.data.map((item) => {
            const dataObj: { [key: string]: number } = {}; // Inicializar como un objeto vacío
            Object.assign(dataObj, item.data); // Actualizar con las propiedades de item.data
            return {
              x: item.timestamp, // Suponiendo que timestamp está formateado correctamente
              y: dataObj['temperatura (C):'] || 0, // Acceder a 'temperatura (C):' de manera dinámica
              uv: dataObj['uv'] || 0, // Acceder a 'uv' de manera dinámica
              humedad: dataObj['humedad'] || 0, // Acceder a 'humedad' de manera dinámica
              co2: dataObj['co2'] || 0, // Acceder a 'co2' de manera dinámica
            };
          })
        : [],
    }));
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={prepareChartData()}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
