import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axiosInstance from '@/services/axios';

interface SensorData {
  timestamp: string;
  'temperatura (C):'?: number;
  'temperatura (F):'?: number;
  humedad?: number;
}

interface SensorHistory {
  id_history: string;
  sensor_id: string;
  data: SensorData;
}

interface ChartThreeState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    type: 'donut',
  },
  colors: ['#10B981', '#375E83', '#259AE6', '#FFA70B'],
  labels: ['Temperature (C)', 'Temperature (F)', 'Humidity'],
  legend: {
    show: true,
    position: 'bottom',
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        background: 'transparent',
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const ChartThree: React.FC = () => {
  const [state, setState] = useState<ChartThreeState>({
    series: [0, 0, 0],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get<SensorHistory[]>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/sensors/history/`
        );
        const { data } = response;
        const temperatureCCount = data.filter(
          (item) => item.data['temperatura (C):'] !== undefined
        ).length;
        const temperatureFCount = data.filter(
          (item) => item.data['temperatura (F):'] !== undefined
        ).length;
        const humidityCount = data.filter((item) => item.data.humedad !== undefined).length;
        setState({
          series: [temperatureCCount, temperatureFCount, humidityCount],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000); // Actualiza los datos cada 5 segundos

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
      <h5 className="text-xl font-semibold text-black dark:text-white">three</h5>
      <div id="chartThree" className="mb-2">
        <ReactApexChart options={options} series={state.series} type="donut" />
      </div>
      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-primary"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span>Temperature (C)</span>
              <span>{state.series[0]}%</span>
            </p>
          </div>
        </div>
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#6577F3]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span>Temperature (F)</span>
              <span>{state.series[1]}%</span>
            </p>
          </div>
        </div>
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#8FD0EF]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span>Humidity</span>
              <span>{state.series[2]}%</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
