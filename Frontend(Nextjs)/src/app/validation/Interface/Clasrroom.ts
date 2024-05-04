
import { v4 as uuidv4 } from 'uuid';

type UUID = string;
const id_lroom: UUID = uuidv4();

export default interface GetClassroomDevice {
  // id: ObjectId;
  id_lroom: string;
  number_lroom: number;
}


export default interface Classroom {
  id_lroom: string;
  name_lroom: string;
  number_lroom: number;
  is_active: boolean;
  created_at: string;
}
