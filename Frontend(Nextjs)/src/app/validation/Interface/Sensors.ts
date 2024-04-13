
export default interface GetSensorsRegister {
    name_sensor: string;
    create_at: string;
    device_id: string;
    is_active: boolean;
  }

export default interface Inputs{
  device_id :string;
  name_sensor: string;
  description:string;
  size:string;
}

interface Data {
  [key: string]: any;
}
export default interface DataSensorsCard{
  id_sensor: string;
  description:string;
  name_sensor: string;
  data:Data;
  create_at: string;
  device_id: string;
  is_active: boolean;
  size:string;
  room:string
}

//cards
export default interface Sensor {
  id_sensor: string;
  name_sensor: string;
  is_active: boolean;
  device_id: string;
  description: string;
  data: { [key: string]: any };
}