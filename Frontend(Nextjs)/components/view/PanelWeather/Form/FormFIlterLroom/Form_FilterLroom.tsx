import React, { useState } from "react";
import "./index.css";
import { TbNumber } from "react-icons/tb";
import { SiAqua, SiGoogleclassroom } from "react-icons/si";
import { ImSearch } from "react-icons/im";
import { fetchFilterName_Number } from "@/services/axios";
import Classroom from "@/app/validation/Interface/Clasrroom";
import { toast } from "react-toastify";
// { onFormSubmit}
const Form = ({ onFilterSubmit }: { onFilterSubmit: (filterData: any) => void }) => {
  const [namelroom, setNameLroom] = useState<string>("");
  console.log(namelroom);
  const [loading, setLoading] = useState(false);
  const [numberlroom, setNumberLroom] = useState<number>();
  console.log(numberlroom);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue: string = e.target.value;
    if (/^[A-Za-z\s]+$/.test(inputValue)) {
      setNameLroom(inputValue);
    } else {
      setNameLroom("");
      return null;
    }
  };

  const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue: string = e.target.value.trim();
    if (inputValue === '') { 
      setNumberLroom(undefined);
    } else if (/^\d*$/.test(inputValue)) {
      setNumberLroom(Number(inputValue));
    } else {
      setNumberLroom(undefined);
    }
  };

  const handlefecthfilter = async () => {
    console.log(namelroom);
    console.log(numberlroom); 
    if (namelroom || numberlroom) {
      setLoading(true);
      const nameParam = namelroom !== "" ? `name=${encodeURIComponent(namelroom)}` : null; 
      const numberParam = numberlroom !== undefined ? `number=${numberlroom}` : null;
      const queryParams = [nameParam, numberParam].filter(param => param !== "").join("&");
      
      const response = await fetchFilterName_Number(`?${queryParams}`);
      if (response && Object.keys(response).length === 0) {
        // Mostrar mensaje de toast si no se encontraron salones
        toast.error("No se encontraron salones que coincidan con la búsqueda.");
      } else {
        // Actualizar el estado filterlroom con la respuesta de la petición
        onFilterSubmit((prevFilterlroom: Classroom[]) => [
          ...prevFilterlroom,
          response
        ]);
      }
      // onFilterSubmit((prevFilterlroom: Classroom[]) => [
      //   ...prevFilterlroom,
      //   response
      // ]);
      // onFilterSubmit(response);
      console.log(response);
      setLoading(false);
    } else {
      console.log("Por favor ingrese un valor de búsqueda válido.");
    }
  };
  return (
    <div className="contfilter1 sel">
      <div>
        <div className="field_input_icon posrel mb0 input_focus">
          <form
            className="w-full flex items-center contform"
            onSubmit={(e) => {
              e.preventDefault(), console.log("enviado");
            }}
          >
            <div className="relative flex items-center w-full">
              <span className="icon i_find">
                <SiGoogleclassroom className="whiconfilter" />
              </span>
              <input
                minLength={1}
                maxLength={100}
                id="searchName"
                type="text"
                value={namelroom}
                placeholder="Nombre Salon"
                className="iptctyy w-full border focus:outline-none focus:border-none focus:ring-0 bg-transparent"
                onChange={handleChangeName}
              />
            </div>
            {loading ? <span>Cargando...</span> : null}
          </form>
        </div>
        <div className="field_input_icon posrel bl1 input_focus">
          <form
            className="contform"
            onSubmit={(e) => {
              e.preventDefault(), console.log("enviado");
            }}
          >
            {/* <div className="relative flex items-center w-full"> */}
            <span className="icon i_find">
              <TbNumber className="whiconfilter" />
            </span>
            <input
              id="searchNumber"
              min="0"
              max="999"
              type="search"
              minLength={0}
              inputMode="numeric"
              maxLength={1000}
              value={numberlroom === undefined ? '' : numberlroom}
              placeholder="Numero Salon"
              className="iptctyy w-full border focus:outline-none focus:border-none focus:ring-0 bg-transparent"
              onChange={handleChangeNumber}
            />
            {/* </div> */}
            {loading ? <span>Cargando...</span> : null}
          </form>
        </div>
      </div>
      <button
        onClick={handlefecthfilter}
        className="btnfiltersearch rounded"
        type="submit"
        title="..search"
      >
        <span className="icon i_search">
          {<ImSearch className="whiconfilter" />}
        </span>
      </button>
    </div>
  );
};

export default Form;
