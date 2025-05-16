import { Calendar } from "primereact/calendar";
import { CalendarIcon } from "../../../assets/icons/Icon";
import { useRef } from "react";

interface CalendarProps {
  value: Date | string | null;
  placeholder: string;
  error: boolean;
  loading: boolean;
  disabled?: boolean;
  id: number;
  handleChange: (e: { value: Date | string | null }) => void;
}

const Input_Calendar: React.FC<CalendarProps> = ({
  value,
  placeholder,
  error,
  handleChange,
  id,
  loading,
  disabled,
}) => {
  const calendarRef = useRef(null);

  const handleIconClick = () => {
    if (calendarRef.current) {
      calendarRef.current.show();
    }
  };
  return (
    <div
      className={`relative input   flex items-center gap-2 !px-0 !border-0     ${
        error ? "border-error-800" : ""
      }`}
    >
      <span
        onClick={handleIconClick}
        className={`flex_center w-6 h-6 absolute z-10 right-4 `}
      >
        <CalendarIcon />
      </span>

      <Calendar
        ref={calendarRef}
        value={value}
        inputId={id}
        onChange={(e) => handleChange(e)}
        placeholder={placeholder}
        className="flex-1 !border-none !shadow-none w-full"
        disabled={disabled || loading}
      />
    </div>
  );
};

export default Input_Calendar;
