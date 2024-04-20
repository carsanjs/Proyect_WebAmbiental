import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { CiFilter } from "react-icons/ci";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

interface DropdownFilterProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date | null) => void;
}

const DropdownFilter = ({
  selectedDate,
  onSelectDate,
}: DropdownFilterProps) => {
  const [value, setValue] = useState<Dayjs | null>(dayjs());
  console.log(value);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const handleDateChange = (newValue: Dayjs | null) => {
    setValue(newValue); // Actualiza el estado con la nueva fecha seleccionada
    onSelectDate(newValue ? newValue.toDate() : null); // Llama a la función onSelectDate con la nueva fecha
  };

  const handleNotificationClick = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <li
      className="sticky top-0 z-999 flex w-full bg-white dark:bg-boxdark dark:drop-shadow-none"
      x-data="{ dropdownOpen: false, notifying: true }"
    >
      <Link
        ref={trigger}
        onClick={handleNotificationClick}
        href="#"
        className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
      >
        <CiFilter />
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute -left-1 mt-2.5 p-2 flex h-23 w-80 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-60 ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker value={value} onChange={handleDateChange} />
          </DemoContainer>
        </LocalizationProvider>
      </div>
    </li>
  );
};

export default DropdownFilter;
