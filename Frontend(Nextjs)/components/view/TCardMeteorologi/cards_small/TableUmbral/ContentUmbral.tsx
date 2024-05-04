import {
  CO,
  Iluminacion,
  CalidadAire,
  CO2,
  UV,
  Dht21,
  LLuvia,Ds18b20
} from "./TableUmbral"; // Importa tus componentes aquí
import { ReactNode } from "react";

interface Sensor {
  id: string;
  componente: ReactNode;
}

export const sensorComponentes: Sensor[] = [
  { id: "07b1bdee-70e9-45c2-89ff-7857874512da", componente: <Ds18b20/> },
  { id: "1a91c5a3-ae04-4e3f-a488-e297d6118a75", componente: <CO/> },
  { id: "1b4c16e8-ccd1-4091-a567-1c71ad8ef2e5", componente: <Iluminacion/> },
  { id: "3b3f06d9-bff0-48db-95a9-ad31b312798a", componente: <CalidadAire/>},
  { id: "7bdcad4f-6bee-422a-a398-280317fca439", componente: <CO2/> },
  { id: "c64bde89-67fe-418c-9df8-1ff0c3db29de", componente: <UV/>},
  { id: "eb0b2abf-9b97-41cf-85e1-50fe9f2bb00d", componente:  <Dht21/> },
  { id: "4bd7a3c4-36fc-4607-a04d-7e825f7e98b8", componente:<LLuvia/> },
];
