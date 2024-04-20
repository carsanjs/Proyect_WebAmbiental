import { BsClockHistory } from "react-icons/bs";
import clsx from 'clsx';
import { FaCircleCheck } from "react-icons/fa6";

interface Props{
  status:boolean
}

//activo true
// inactivo false

{/* <span
className={`absolute h-3.5 w-3.5 rounded-full border-2 text-white ${
  student.is_active ? "bg-green-500" : "bg-red-500"
}`}
></span> */}

export default function InvoiceStatus({ status }:Props) {
  return (
    <span
      className={`${status ? "bg-green-500" : "bg-red-500"} absolute h-3.5 w-3.5 rounded-full border-2 text-white text-xs`}
    >
      {/* {status === 'pending' ? (
        <>
          Pending
          <BsClockHistory className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'paid' ? (
        <>
          Paid
          <FaCircleCheck className="ml-1 w-4 text-white" />
        </>
      ) : null} */}
    </span>
  );
}
