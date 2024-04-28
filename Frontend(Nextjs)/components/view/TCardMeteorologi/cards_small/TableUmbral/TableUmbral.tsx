import "./style.css"
import { PiSunglassesFill } from "react-icons/pi";
import { BsUmbrellaFill } from "react-icons/bs";
import { FaRedhat } from "react-icons/fa6";
import { FaTshirt, FaCloudSun, FaHouseUser } from "react-icons/fa";
import { TbSunOff } from "react-icons/tb";
export function CO(){
    return(
        <div className="table-container">
  <table className="bg-red-600">
    <thead>
    <tr>
        <th>Concentración de CO(ppm)</th>
        <th>Indice</th>
        <th>Recomendación</th>
      </tr>
    </thead>
    <tbody>
      <tr className="cobuena">
        <td className="texttableumbral"> 20 A 200</td>
        <td className="texttableumbral">BUENO</td>
        <td className="texttableumbral">Ambiente en condiciones normales.</td>
      </tr>
      <tr  className="comoderado">
        <td className="texttableumbral">200 A 400</td>
        <td className="texttableumbral">MODERADO</td>
        <td className="texttableumbral">Ambiente aceptable, se debe monitorear continuamente.</td>

      </tr>
      <tr className="conormal">
        <td className="texttableumbral">400 A 700</td>
        <td className="texttableumbral">NORMAL</td>
        <td className="texttableumbral">Alerta, puede causar malestar como dolor de cabez en personas sensibles.</td> 
      </tr>
      <tr className="comediocre">
        <td className="texttableumbral">700 A 1100 </td>
        <td className="texttableumbral">MEDIOCRE</td>
        <td className="texttableumbral">Peligro, en el aula se necesita una ventilación adecuada.</td>
      </tr> 
       <tr className="comalo">
        <td className="texttableumbral">1100 A 1600 </td>
        <td className="texttableumbral">MALO</td>
        <td className="texttableumbral text-left">Riesgo significativo, ventilación urgente.</td>
       
      </tr>
       <tr className="coextramalo">
        <td className="write-dark">1600 A 2000 </td>
        <td className="write-dark">EXT. MALO</td>
        <td className="write-dark">Peligro extremo, evacuación inmediata reuqerida.</td>
      </tr>  
    </tbody>
  </table>
</div>
    )
}

export function Iluminacion(){
  return(

<div className="table-container">
<table>
  <thead>
  <tr>
      <th>Luminosidad</th>
      <th>Indice</th>
      <th>Recomendación</th>
      
    </tr>
  </thead>
  <tbody>
    <tr className="write luminobaja">
      <td className="texttableumbral"> 0 A 20</td>
      <td className="texttableumbral">MUY BAJA </td>
      <td className="texttableumbral">Iluminación minima o inexistente.</td>
    </tr>
    <tr className="lumibaja">
      <td className="texttableumbral">20 A 40</td>
      <td className="texttableumbral">BAJA</td>
      <td className="texttableumbral">Ambiente oscuro pero con algo de luz.</td>
    </tr>
    <tr className="write lumimoderada">
      <td className="texttableumbral">40 A 60</td>
      <td className="texttableumbral">MODERADA</td>
      <td className="texttableumbral">Iluminación suficientemente moderada.</td>

    </tr>
    <tr className="write lumialta">
      <td className="texttableumbral">60 A 80 </td>
      <td className="texttableumbral">ALTA</td>
      <td className="texttableumbral">Ambiente con buena iluminación.</td>
     
    </tr> 
     <tr className="write lumimuyalta">
      <td className="texttableumbral">80 A 100 </td>
      <td className="texttableumbral">MUY  ALTA</td>
      <td className="texttableumbral">Luz intensa, ambiente en optimas condiciones.</td>
    </tr> 
  </tbody>
</table>
</div>
  )
}

export function CalidadAire(){
  return(
      <div className="table-container">
      <table>
        <thead>
        <tr>
            <th>Calidad del Aire</th>
            <th>Indice</th>
            <th>Recomendación</th>
            
          </tr>
        </thead>
        <tbody>
          <tr className="write caliexcelente">
            <td className="texttableumbral"> 0 A 60</td>
            <td className="texttableumbral">EXCELENTE</td>
            <td className="texttableumbral">La calidad del aire es excelente hoy, con niveles bajos de gases nocivos.</td>
            
          </tr>
        
          <tr className="calibuena">
            <td className="texttableumbral">60 A 120</td>
            <td className="texttableumbral">BUENA</td>
            <td className="texttableumbral">La calidad del aire es buena hoy, lo que significa que el ambiente es seguro y saludable..</td>
          </tr>
          <tr className="write calidnormal">
            <td className="texttableumbral">120 A 160</td>
            <td className="texttableumbral">NORMAL</td>
            <td className="texttableumbral">La calidad del aire está dentro de los límites normales hoy.</td>
          </tr>
          <tr className="write calidamediocre">
            <td className="texttableumbral">160 A 210 </td>
            <td className="texttableumbral">MEDIOCRE</td>
            <td className="texttableumbral">La calidad del aire es mediocre hoy, lo que indica una ligera elevación en los niveles de gases nocivos.</td>
          </tr> 
           <tr className="write calimalo">
            <td className="texttableumbral">210 A 310 </td>
            <td className="texttableumbral">MALO</td>
            <td className="texttableumbral">La calidad del aire es mala hoy, con niveles elevados de gases nocivos.</td>
    
          </tr>
           <tr className="write calidaextramalo">
            <td className="write-dark">310 A 1000 </td>
            <td className="write-dark">EXT. MALO</td>
            <td className="write-dark">La calidad del aire es extremadamente mala hoy, con niveles muy altos de gases nocivos. Es fundamental que tomes medidas urgentes.</td>
          </tr>  
        </tbody>
      </table>
    </div>
     
  )
}



export function CO2(){
  return(
      <div className="table-container">
<table>
  <thead>
  <tr>
      <th>Concentración CO2</th>
      <th>Riesgo</th>
      <th>Recomendación</th>
    </tr>
  </thead>
  <tbody>
    <tr className="write co2exce">
      <td className="texttableumbral"> 350 A 1600</td>
      <td className="texttableumbral">EXCELENTE </td>
      <td className="texttableumbral">Ambiente en condiciones muy favorables.</td>
    </tr>
    <tr className="co2buena">
      <td className="texttableumbral">1600 A 3100</td>
      <td className="texttableumbral">BUENA</td>
      <td className="texttableumbral">Ambiente en condiciones apropiadas.</td>
  
    </tr>
    <tr className="co2moderada">
      <td className="texttableumbral">3100 A 4600</td>
      <td className="texttableumbral">MODERADA</td>
      <td className="texttableumbral">Ambiente en condiciones aceptable.</td>
    </tr>
    <tr className="write co2mala">
      <td className="texttableumbral">4600 A 7600</td>
      <td className="texttableumbral">MALA</td>
      <td className="texttableumbral">EL ambiente no se encuentra en condiciones apropiadas.</td>
   
    </tr>
    <tr className="write co2peligrosa" >
      <td className="write-dark"> 7600 A 10000</td>
      <td className="write-dark">PELIGROSA</td>
      <td className="write-dark">Ambiente interior muy malo y contaminado.</td>
    
    </tr> 
  </tbody>
</table>
</div>
  )
}

export function UV(){
  return(
      
      <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Índice UV</th>
            <th>Riesgo</th>
            <th>Tme*</th>
            <th>Protección Segura</th>
          </tr>
        </thead>
        <tbody>
          <tr className="write uvbajs">
            <td className="texttableumbral"> &lt; 2.9</td>
            <td className="texttableumbral">BAJA </td>
            <td className="texttableumbral">60+</td>
            <td className="flex texttableumbral">< PiSunglassesFill/>, <FaCloudSun /></td>
          </tr>
          <tr className="uvmoderadas">
            <td className="texttableumbral">3.0 A 5.9</td>
            <td className="texttableumbral">MODERADA</td>
            <td className="texttableumbral">45</td>
            <td className="flex texttableumbral"><PiSunglassesFill />, <BsUmbrellaFill /></td>
          </tr>
          <tr className="uvalta">
            <td className="texttableumbral">6.0 A 7.9</td>
            <td className="texttableumbral">ALTA</td>
            <td className="texttableumbral">30</td>
            <td className="flex texttableumbral"><PiSunglassesFill />, <BsUmbrellaFill />,<FaRedhat />,<TbSunOff />.</td>
          </tr>
          <tr className="write uvmuyalto">
            <td className="texttableumbral">8.0 A 10.9</td>
            <td className="texttableumbral">MUY ALTO</td>
            <td className="texttableumbral">25</td>
            <td className="flex texttableumbral"><PiSunglassesFill />, <BsUmbrellaFill />,<FaRedhat />,<TbSunOff />, <FaTshirt />. </td>
          </tr>
          <tr className="write uvextremo">
            <td className="write-dark"> &gt; 11 </td>
            <td className="write-dark">EXTREMO</td>
            <td className="write-dark">10</td>
            <td className="flex write-dark">Manténgase en interiores y evite la exposición al sol. <FaHouseUser /></td>
          </tr> 
        </tbody>
      </table>
    </div>
  )
}

export function Dht21(){
  return(

<div className="table-container">
<table>
  <thead>
  <tr>
      <th >Temperatura (°C)</th>
      <th >Indice</th>
      <th>Recomendación</th>
    </tr>
  </thead>
  <tbody>
    <tr className="write temmuyfrio">
      <td className="texttableumbral"> &lt; 10</td>
      <td className="texttableumbral">MUY FRIO </td>
      <td className="texttableumbral">Ambiente muy helado, asegurese de abrigarse bien.</td> 
    </tr>
    <tr  className="temfrio">
      <td className="texttableumbral">10 A 20</td>
      <td className="texttableumbral">FRIO</td>
      <td className="texttableumbral">Ambiente frio, el clima puede ser agradable, pero se recomienda abrigarse.</td>
     
    </tr>
    <tr className="write temfresco">
      <td className="texttableumbral">20 A 30</td>
      <td className="texttableumbral">FRESCO</td>
      <td className="texttableumbral">Ambiente fresco, completamente agradable.</td>
    </tr>
    <tr className="write temcalido">
      <td className="texttableumbral">30 A 37 </td>
      <td className="texttableumbral">CALIDO</td>
      <td className="texttableumbral">Ambiente templado, utiliza ropa ligera.</td>
    </tr> 
     <tr className="write temcaluroso"  >
      <td className="texttableumbral"> 37 A 42 </td>
      <td className="texttableumbral">CALUROSO</td>
      <td className="texttableumbral">El ambiente experimenta temperatura bastantes elevadas, tomar precauciones.</td>
    </tr> 
     <tr className="write temextemo">
      <td className="write-dark"> &gt; 42 </td>
      <td className="write-dark">EXTREMO</td>
      <td className="write-dark">Atención, la temperatura en el ambiente ha 
        superado los 43°C, lo cual es
        extremadamente alta.
      </td>
    </tr> 
  </tbody>
</table>
</div>
  )
}


export function LLuvia(){
  return(
      <div className="table-container">
      <table>
        <thead>
        <tr>
            <th>Índice Lluvia</th>
            <th>Recomendación</th>
          </tr>
        </thead>
        <tbody>
          <tr className="write lluvitrue">
            <td className="texttableumbral">LLUVIOSO</td>
            <td className="texttableumbral">Parcialmente lluvioso, asegurese de llevar un paraguas o impermeable.</td>
    
          </tr>
          <tr className="llviafalse">
            <td className="texttableumbral">DESPEJADO</td>
            <td className="texttableumbral">No hay precipitación, cielo despejado.</td>
        
          </tr>
        </tbody>
      </table>
    </div>

  )
}
