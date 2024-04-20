import { useEffect, useState, useCallback, useMemo } from "react";
import axiosInstance from "@/services/axios";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface NameSensor {
  sensor_id: string;
  name_sensor: string;
}

interface DataMap {
  [key: string]: string | number;
}

interface SensorHistory {
  id_history: string;
  sensor_id: string;
  timestamp: string;
  data: DataMap;
}

const LineChartComponent = () => {
  const [namesensorMap, setNameSensorMap] = useState<{ [key: string]: string }>({});
  const [sensorHistory, setSensorHistory] = useState<SensorHistory[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const [historyResponse, nameResponse] = await Promise.all([
        axiosInstance.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sensors/history/`),
        axiosInstance.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sensors`),
      ]);
      setSensorHistory(historyResponse.data);
      const nameMap = nameResponse.data.reduce((acc: { [key: string]: string }, sensor: NameSensor) => {
        acc[sensor.sensor_id] = sensor.name_sensor;
        return acc;
      }, {});
      setNameSensorMap(nameMap);
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 12000);

    return () => clearInterval(interval);
  }, [fetchData]);

  const data_ = useMemo(() => sensorHistory.map((item) => item.data), [sensorHistory]);
  const data__ = useMemo(() => sensorHistory.find((item) => Object.keys(item.data).length > 0)?.data, [sensorHistory]);

  const Datachart = useMemo(
    () => [
      {
        sensor: Object.values(namesensorMap),
        ...data__,
      },
    ],
    [namesensorMap, data__]
  );

  const dataKeys = useMemo(() => Object.keys(Datachart[0]).filter((key) => key !== 'sensor'), [Datachart]);

  return (
    <LineChart
      width={700}
      height={300}
      data={Datachart}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="sensor" padding={{ left: 30, right: 30 }} />
      <YAxis />
      <Tooltip />

      {dataKeys.map((key, index) => (
        <Line
          key={index}
          type="monotone"
          dataKey={key}
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
      ))}
    </LineChart>
  );
};

export default LineChartComponent;


// import {useCallback,useMemo, useEffect, useState } from "react";
// import axiosInstance from "@/services/axios";
// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
// } from "recharts";

// interface NameSensor {
//   name_sensor: string;
// }

// interface DataMap {
//   [key: string]: string | number;
// }
// //map the contents of the sensors
// interface SensorHistory {
//   id_history: string;
//   sensor_id: string;
//   timestamp: string;
//   data: DataMap;
// }

// const LineChartComponent = ()=> {
//   const [namesensor, setNameSensor] = useState<NameSensor[]>([]);
//   const [sensorHistory, setSensorHistory] = useState<SensorHistory[]>([]);
//   // const data__ = sensorHistory.find((item) => Object.keys(item.data).length > 0)?.data;

//   // sensorHistory.map(async (index) => {
//   //   const response = await axiosInstance.get(
//   //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/sensors/${index.sensor_id}`
//   //   );
//   //   return setNameSensor(response.data.name_sensor);
//   // });

//   useEffect(() => {
//     sensorHistory.forEach(async (index) => {
//       const response = await axiosInstance.get(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/sensors/${index.sensor_id}`
//       );
//       setNameSensor((prevNames) => [
//         ...prevNames,
//         { name_sensor: response.data.name_sensor },
//       ]);
//     });
//   }, [sensorHistory]);

//   // const Datachart = [
//   //   {
//   //     sensor: namesensor,
//   //     ...data__,
//   //   },
//   // ];
//   // const dataKeys = Object.keys(Datachart[0]).filter(key => key !== 'sensor');

//   const fetchSensorData = useCallback(async () => {
//     try {
//       const response = await axiosInstance.get(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/sensors/history/`
//       );
//       setSensorHistory(response.data);
//     } catch (error) {
//       console.error("Error fetching sensor data:", error);
//     }
//   }, []);

//   useEffect(() => {
//     fetchSensorData();
//     const interval = setInterval(fetchSensorData, 12000);

//     return () => clearInterval(interval);
//     // const fetchSensorData = useCallback(async() => {
//     //   try {
//     //     const response = await axiosInstance.get(
//     //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/sensors/history/`
//     //     );
//     //     return setSensorHistory(response.data);
//     //   } catch (error) {
//     //     console.error("Error fetching sensor data:", error);
//     //   }
//     // }; 
//     // fetchSensorData();
//     // const interval = setInterval(fetchSensorData, 12000);

//     // return () => clearInterval(interval);
//   }, [fetchSensorData]);
//   const data_ = useMemo(() => sensorHistory.map((item) => item.data), [sensorHistory]);
//   const data__ = useMemo(() => sensorHistory.find((item) => Object.keys(item.data).length > 0)?.data, [sensorHistory]);

//   const Datachart = useMemo(
//     () => [
//       {
//         sensor: namesensor,
//         ...data__,
//       },
//     ],
//     [namesensor, data__]
//   );

//   const dataKeys = useMemo(() => Object.keys(Datachart[0]).filter((key) => key !== 'sensor'), [Datachart]);

//     return(
//       <LineChart
//           width={700}
//           height={300}
//           data={Datachart}
//           margin={{
//             top: 5,
//             right: 30,
//             left: 20,
//             bottom: 5,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="sensor" padding={{ left: 30, right: 30 }}  />
//           <YAxis />
//           <Tooltip />
          
//           {dataKeys.map((key, index) => (
//         <Line
//           key={index}
//           type="monotone"
//           dataKey={key}
//           stroke="#8884d8" strokeWidth={2} 
//           activeDot={{ r: 8 }}
//         />
//       ))}

//           {/* <Line type="monotone" dataKey="" stroke="#8884d8" activeDot={{ r: 8 }} />
//           <Line type="monotone" dataKey="humedad" stroke="#8884d8" strokeWidth={2} /> */}
//         </LineChart>
//     )
// };

// export default LineChartComponent;

// interface ChartFourState {
//   series: { data: number[] }[];
// }

// const ChartFour: React.FC = () => {

// const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];
//   const [state, setState] = useState<ChartFourState>({
//     series: [
//       {
//         data: [
//           168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112, 123, 212,
//           270, 190, 310, 115, 90, 380, 112, 223, 292, 170, 290, 110, 115, 290,
//           380, 312,
//         ],
//       },
//     ],
//   });

//   const options: ApexOptions = {
//     colors: ['#3C50E0', '#80CAEE', '#FF0000'], // Agrega el color para la humedad
//     chart: {
//       fontFamily: 'Satoshi, sans-serif',
//       type: 'bar',
//       height: 350,
//       toolbar: {
//         show: false,
//       },
//     },
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         columnWidth: '55%',
//         borderRadius: 2,
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     stroke: {
//       show: true,
//       width: 4,
//       colors: ['transparent'],
//     },
//     xaxis: {
//       type: 'category',
//       labels: {
//         show: true,
//         rotate: 0,
//         formatter: (val: string, index: number) => `Day ${index + 1}`,
//       },
//     },
//     legend: {
//       show: true,
//       position: 'top',
//       horizontalAlign: 'left',
//       fontFamily: 'inter',
//       markers: {
//         radius: 99,
//       },
//     },
//     grid: {
//       yaxis: {
//         lines: {
//           show: false,
//         },
//       },
//     },
//     fill: {
//       opacity: 1,
//     },
//     tooltip: {
//       x: {
//         show: false,
//       },
//     },
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get<SensorHistory[]>(
//           `${process.env.NEXT_PUBLIC_BACKEND_URL}/sensors/history/`
//         );
//         const combinedData = response.data.map((sensor) => sensor.data.humedad);
//         console.log(response);
//         setState({ series: [{ data: combinedData }] });
//       } catch (error) {
//         console.error("Error al obtener datos del servidor:", error);
//       }
//     };
//     fetchData();
//     const intervalId = setInterval(fetchData, 1000); // Actualiza los datos cada 5 segundos

//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
//       <div>
//         <h3 className="text-xl font-semibold text-black dark:text-white">
//          four
//         </h3>
//       </div>

//       <div className="mb-2">
//         <div id="chartFour" className="-ml-5">
//           <ReactApexChart
//             options={options}
//             series={state.series}
//             type="bar"
//             height={350}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChartFour;
