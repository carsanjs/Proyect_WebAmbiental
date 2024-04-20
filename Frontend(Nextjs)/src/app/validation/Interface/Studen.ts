


// export default interface GetStudents {
//   id:string;
//   user_name: string;
//   nombre: string;
//   correo: string;
//   carrera: string;
// }


export default interface Inputs {
  user_name: string;
  nombre: string;
  correo: string;
  carrera: string;
  passw: string;
}

export default interface NameRace {
  nombre: string;
  carrera: string;
}

//components chartCard
export default interface GetRegisterStudent {
  nombre: string;
  is_active: boolean;
  created_at: string;
}
