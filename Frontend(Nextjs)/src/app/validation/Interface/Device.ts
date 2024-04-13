import { ObjectId } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export default interface GetDevicesRegister {
    name_device: string;
    created_at: string;
    room_Assignment: string;
    amount_sensors: string;
    is_active: boolean;
    id_device:string;
    sensors: string
  }

export default interface Inputs {
  id_lroom: string;
  name_device: string;
  description: string;
  size: string;
}

type UUID = string;
const device_id : UUID = uuidv4();

export default interface GetDevicesSensor {
  id: ObjectId;
  device_id : typeof device_id ;
  name_device: string;
}