"use client";
import Breadcrumb from "../../../../../components/Breadcrumb/Breadcrumb";
import BtnDeletHistory from "../../../../../components/share/History/BtnDeletHistory";
import Header from "../../../../../components/share/History/HeaderHistory";
import { useEffect, useState } from "react";
import DropdownFilter from "../../../../../components/share/Filter/DropdownFilter";
import Tabla from "../../../../../components/share/Table/table";
import { fetchHistory } from "@/services/axios";
import "./style.css";
import { formatDateToLocal } from "@/components/functions/getFecha";
import { GrHistory } from "react-icons/gr";
import { BtnDeletAllHistory } from "../../../../../components/share/History/BtnDeletHistory";
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

  const [filteredHistory, setFilteredHistory] = useState<History[]>([]);
  console.log(filteredHistory)


  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  console.log(selectedDate)


  const handlehistory = async () => {
    const response = await fetchHistory();
    setHistory(response);
  };
  useEffect(() => {
    handlehistory();
  }, []);

  useEffect(() => {
    // Filtrar los datos cuando la fecha seleccionada cambie
    if (selectedDate) {
      const filteredData = history.filter((item) => {
        const entryDate = new Date(item.timestamp);
        return entryDate.toDateString() === selectedDate.toDateString();
      });
      setFilteredHistory(filteredData);
    } else {
      // Si no hay fecha seleccionada, mostrar todos los datos
      setFilteredHistory(history);
    }
    // selectedDate, history
  }, []);
  const handleDeleteSuccess = () => {
    handlehistory();
  };
  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date);
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <Header 
      sidebarOpen={sidebarOpen} 
      onSelectDate={handleDateSelect}
      selectedDate={selectedDate}
      setSidebarOpen={setSidebarOpen} />
      <div className="max-w-screen-2xl h-screen md:p-2 2xl:p-0">
        <Breadcrumb pageName="Historial" />
        <div className="c0179 c0182">
          <div className="c01154 c0142 c0164">
            <div className="conthistory">
              <div className="c01170" aria-label="Todos" role="region">
                <div className="c01171">
                  <h2 className="c01110 c01115 c01101 c01106 c01160">Todos</h2>
                  <div className="c01172 sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
                    <button
                      id="export-browsing-data"
                      title="Exportar datos de navegación"
                      className="c01183 c01184"
                    >
                      <span className="c01175 c01185">
                        <span aria-hidden="true">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            className="c01173"
                          >
                            <path
                              d="M2.5 4c.28 0 .5.22.5.5v11a.5.5 0 01-1 0v-11c0-.28.22-.5.5-.5zm11.35 1.65l4 4a.5.5 0 010 .7l-4 4a.5.5 0 01-.7-.7l3.14-3.15H5.5a.5.5 0 010-1h10.8l-3.15-3.15a.5.5 0 01.7-.7z"
                              fill-rule="nonzero"
                            ></path>
                          </svg>
                        </span>
                        <span className="c01174">
                          Exportar datos de navegación
                        </span>
                      </span>
                    </button>
                   <BtnDeletAllHistory
                   onDeleteSuccess={handleDeleteSuccess}
                   />
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
            {/* aqui mapeo el history */}
            {history.map((key, index) => (
              <div className="c012004 c011981" key={key.id_history}>
                <div role="option" className="c011984">
                  <div className="c012005 c012002" aria-hidden="true">
                    <GrHistory/>
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
                      {key.sensor_id}
                    </a>
                  </div>
                  <div className="c011995">
                    <p className="c0112639 flex">
                      {Object.entries(key.data).map(([key, value], index) => {
                        const [attribute, temperature] = key.split(":");
                        return (
                          <>
                            <p className="pr-1 pl-1">{key} </p>
                            <p
                              key={index}
                              className={`${
                                parseInt(value) >= 35 ? "text-red-500" : ""
                              }`}
                            >
                              {value}
                            </p>
                          </>
                        );
                      })}
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
            ))}
          </div>
        </div>

        {/* finaliza content  */}
      </div>
    </>
  );
}

{
  /* <div className="col-span-12">
</div> */
}
