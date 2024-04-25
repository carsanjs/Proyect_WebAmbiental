"use client";
import Breadcrumb from "../../../../../components/Breadcrumb/Breadcrumb";
import BtnDeletHistory from "../../../../../components/share/History/BtnDeletHistory";
import Header from "../../../../../components/share/History/HeaderHistory";
import { useEffect, useState } from "react";
import DropdownFilter from "../../../../../components/share/Filter/DropdownFilter";
import { fetchHistoryDate, fetchSensorNameById } from "@/services/axios";
import "./style.css";
import { formatDateToLocal } from "@/components/functions/getFecha";
import { GrHistory } from "react-icons/gr";
import { GiEmptyHourglass } from "react-icons/gi";
import { BtnDeletAllHistory } from "../../../../../components/share/History/BtnDeletHistory";
import CsvDownloadButton from "react-json-to-csv";
import { IoReloadCircleOutline } from "react-icons/io5";
import { Suspense, useTransition } from "react";
import HistoryReload from "../../../../../components/sckeletos/dashboard/historyreload";
interface Data {
  [key: string]: string;
}

interface History {
  id_history: string;
  sensor_id: string;
  timestamp: string;
  data: Data;
}

export default function TablaUsers() {
  const [history, setHistory] = useState<History[]>([]);
  const [sensorname, setSensorName] = useState<{ [key: string]: string }>({});
  console.log(sensorname);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const handlehistory = async () => {
      try {
        if (selectedDate !== null) {
          const currentDate = new Date(selectedDate);
          console.log(selectedDate);
          const selectedDate_ = currentDate.toISOString().replace("T", " ");
          const response = await fetchHistoryDate(selectedDate_);
          setHistory(response);
        }
      } catch (error) {
        console.error("Error fetching History:", error);
        setHistory([]);
      }
    };
    handlehistory();
  }, [selectedDate]);

  // const handleReloadHistory = () => {
  //   handlehistory();
  // };
  const handleSensorId = async (id_sensor: string) => {
    try {
      const name = await fetchSensorNameById({ id_sensor });
      if (name) {
        setSensorName((prevNames) => ({ ...prevNames, [id_sensor]: name }));
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error("Error handling sensor ID:", error);
    }
  };

  useEffect(() => {
    history.forEach((item) => {
      const id_sensor = item.sensor_id;
      if (!sensorname[id_sensor]) {
        handleSensorId(id_sensor);
      }
    });
  }, []);

  // useEffect(() => {
  //   // Filtrar los datos cuando la fecha seleccionada cambie
  //   if (selectedDate) {
  //     console.log(selectedDate);
  //     const filteredData = history.filter((item) => {
  //       const entryDate = new Date(item.timestamp);
  //       console.log(entryDate);
  //       let filter_ = entryDate.toDateString() === selectedDate.toDateString();
  //       console.log(filter_);
  //       return filter_;
  //     });
  //     setFilteredHistory(filteredData);
  //   } else {
  //     // Si no hay fecha seleccionada, mostrar todos los datos
  //     setFilteredHistory(history);
  //   }
  //   // selectedDate, history
  // }, [selectedDate, history]);
  const handleDeleteSuccess = () => {
    console.log("deleting");
  };
  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date);
  };
  const ExportButton = () => {
    return (
      <CsvDownloadButton
        className="c01183 c01184"
        data={history}
        filename={"datos.csv"}
      >
        <span className="c01175 c01185">
          <span aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" className="c01173">
              <path
                d="M2.5 4c.28 0 .5.22.5.5v11a.5.5 0 01-1 0v-11c0-.28.22-.5.5-.5zm11.35 1.65l4 4a.5.5 0 010 .7l-4 4a.5.5 0 01-.7-.7l3.14-3.15H5.5a.5.5 0 010-1h10.8l-3.15-3.15a.5.5 0 01.7-.7z"
                fill-rule="nonzero"
              ></path>
            </svg>
          </span>
          <span className="c01174"> Exportar datos como CSV</span>
        </span>
      </CsvDownloadButton>
    );
  };
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <Header
        sidebarOpen={sidebarOpen}
        onSelectDate={setSelectedDate}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="max-w-screen-2xl h-screen md:p-2 2xl:p-0">
        <Breadcrumb pageName="Historial" />
        <div className="c0179 c0182">
          <div className="c01154 c0142 c0164">
            <div className="conthistory">
              <div className="c01170" aria-label="Todos" role="region">
                <div className="c01171">
                  <h2
                    className="c01110 c01115 c01101 c01106 c01160"
                    // onClick={handleReloadHistory}
                  >
                    Todos{" "}
                    <i className="items-center text-center">
                      <IoReloadCircleOutline />
                    </i>
                  </h2>

                  <div className="c01172 sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
                    <ExportButton />
                    <BtnDeletAllHistory onDeleteSuccess={handleDeleteSuccess} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* comienza content  */}

        <div role="presentation" className="presetacion_">
          <h3
            id="sectionHeader_0"
            className="text-left c011969 c011976 c011961 c011966 c017"
          >
            Recientes
          </h3>
          <div id="history-card-0" className="c011979">
            {/* {filteredHistory && filteredHistory.length === 0 && selectedDate && (
              <div className="c012004 c011981">
                <div role="option" className="c011984">
                  <div className="c012005 c012002" aria-hidden="true">
                    <GiEmptyHourglass />
                  </div>
                  <div className="c011987"></div>
                  <div className="c011995">
                    <p className="bg-red500 flex">
                      No hay resultados para la fecha selecionada.
                    </p>
                  </div>
                </div>
              </div>
            )} */}
            {!selectedDate && history === null || history.length === 0 && (
              <div>
              {history === null ? (  <p className="text-red-500">No hay registro de historial</p>):( <p className="text-red-500">
                  No hay resultados para la fecha selecionada.
                </p>)}
              </div>
            )}

            {/* {selectedDate && history && history.length === 0 && (
              <div>
                {" "}
                <p className="text-red-500">
                  No hay resultados para la fecha selecionada.
                </p>
              </div>
            )} */}
            {/* aqui mapeo el history */}

            <>
              {history != null && history.length > 0 && (
                  history.map((key, index) => (
                    <div className="c012004 c011981" key={index}>
                      <div role="option" className="c011984">
                        <div className="c012005 c012002" aria-hidden="true">
                          <GrHistory />
                        </div>
                        <div className="c011985" aria-hidden="true">
                          {/* el siguiente dic contiene una imagen */}
                          <div className="c011986"></div>
                        </div>
                        <div className="c011987">
                          <a
                            className="c0112637 card_clickable_title"
                            target="_self"
                            dir="auto"
                            rel="noreferrer"
                          >
                            {sensorname[key.sensor_id]}
                          </a>
                        </div>
                        <div className="c011995">
                          <p className="c0112639 flex">
                            {Object.entries(key.data).map(
                              ([key, value], index) => {
                                const [attribute, temperature] = key.split(":");
                                return (
                                  <>
                                    <p className="pr-1 pl-1">{key} </p>
                                    <p
                                      key={index}
                                      className={`${
                                        parseInt(value) >= 35
                                          ? "text-red-500"
                                          : ""
                                      }`}
                                    >
                                      {value}
                                    </p>
                                  </>
                                );
                              }
                            )}
                          </p>
                          <div className="cont2pre">
                            <p className="c0112644" dir="auto">
                              {formatDateToLocal(key.timestamp)}
                            </p>
                          </div>
                        </div>
                        <BtnDeletHistory
                          id={key.id_history}
                          onDeleteSuccess={handleDeleteSuccess}
                        />
                      </div>
                    </div>
                  ))
                )
              }
            </>
          </div>
        </div>

        {/* finaliza content  */}
      </div>
    </>
  );
}
