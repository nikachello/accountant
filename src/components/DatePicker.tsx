import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerCustomProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (dates: [Date, Date] | null) => void;
}

const DatePickerCustom = ({
  startDate,
  endDate,
  onChange,
}: DatePickerCustomProps) => {
  return (
    <div className="absolute top-10 sm:top-0 right-10 m-4">
      <DatePicker
        selectsRange
        placeholderText="აირჩიეთ თარიღი"
        startDate={startDate}
        endDate={endDate}
        onChange={onChange}
        dateFormat="yyyy-MM-dd"
      />
    </div>
  );
};

export default DatePickerCustom;
