import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axiosInstance from "@/services/axios";

interface SensorData {
  "temperatura (C):": number;
  "temperatura (F):": number;
  humedad: number;
}

interface SensorHistory {
  id_history: string;
  sensor_id: string;
  timestamp: string;
  data: SensorData;
}

interface ChartFourState {
  series: { data: number[] }[];
}

const ChartFour: React.FC = () => {
  const [state, setState] = useState<ChartFourState>({
    series: [
      {
        data: [
          168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112, 123, 212,
          270, 190, 310, 115, 90, 380, 112, 223, 292, 170, 290, 110, 115, 290,
          380, 312,
        ],
      },
    ],
  });

  const options: ApexOptions = {
    colors: ['#3C50E0', '#80CAEE', '#FF0000'], // Agrega el color para la humedad
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 2,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ['transparent'],
    },
    xaxis: {
      type: 'category',
      labels: {
        show: true,
        rotate: 0,
        formatter: (val: string, index: number) => `Day ${index + 1}`,
      },
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'inter',
      markers: {
        radius: 99,
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      x: {
        show: false,
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get<SensorHistory[]>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/sensors/history/`
        );
        const combinedData = response.data.map((sensor) => sensor.data.humedad);
        console.log(response);
        setState({ series: [{ data: combinedData }] });
      } catch (error) {
        console.error("Error al obtener datos del servidor:", error);
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 1000); // Actualiza los datos cada 5 segundos

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div>
        <h3 className="text-xl font-semibold text-black dark:text-white">
         four
        </h3>
      </div>

      <div className="mb-2">
        <div id="chartFour" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartFour;
