
import "./style.css"

function TablaInfo(){
    return(
        <div class="table-container">
  <table>
    <thead>
      <tr 
      className="write"
      style="background-color: #000000">
        <th>Índice UV</th>
        <th>Riesgo</th>
        <th>Tme*</th>
        <th>Protección Segura</th>
      </tr>
    </thead>
    <tbody>
      <tr className="write" style="background-color: #116530">
        <td> &lt; 2.9</td>
        <td>BAJA </td>
        <td>60+</td>
        <td><svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 11.5V11C11 10.4477 10.5523 10 10 10H6C5.44772 10 5 10.4477 5 11V11.5M11 11.5V13C11 14.1046 10.1046 15 9 15H7C5.89543 15 5 14.1046 5 13V11.5M11 11.5H13M13 11.5V11C13 10.4477 13.4477 10 14 10H18C18.5523 10 19 10.4477 19 11V11.5M13 11.5V13C13 14.1046 13.8954 15 15 15H17C18.1046 15 19 14.1046 19 13V11.5M19 11.5H21M5 11.5H3" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"/>
</svg></td>
      </tr>
      <tr style="background-color: #FFCC1D">
        <td>3.0 A 5.9</td>
        <td>MODERADA</td>
        <td>45</td>
        <td>Valor 8</td>
      </tr>
      <tr style="background-color: #FF9800">
        <td>6.0 A 7.9</td>
        <td>ALTA</td>
        <td>30</td>
        <td>Valor 12</td>
      </tr>
      <tr className="write" style="background-color: #C51605">
        <td>8.0 A 10.9</td>
        <td>MUY ALTO</td>
        <td>25</td>
        <td>Valor 16</td>
      </tr>
      <tr className="write" style="background-color: #D862BC" >
        <td> &gt; 11 </td>
        <td>EXTREMO</td>
        <td>10</td>
        <td>Valor 20</td>
      </tr> 
    </tbody>
  </table>
</div>
    )
}