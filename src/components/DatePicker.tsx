import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

interface DatePickerCustomProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onChange: (dates: [Date, Date] | null) => void;
}

const DatePickerCustom = ({
  startDate,
  endDate,
  onChange,
}: DatePickerCustomProps) => {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
    startDate || null
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(
    endDate || null
  );

  const handleDateChange = (dates: Date | [Date, Date] | null) => {
    if (Array.isArray(dates)) {
      const [start, end] = dates;
      setSelectedStartDate(start);
      setSelectedEndDate(end);
      onChange(dates);
    } else {
      setSelectedStartDate(dates);
      setSelectedEndDate(null);
      onChange(null);
    }
  };

  return (
    <div className="absolute top-10 sm:top-0 right-10 m-4">
      <DatePicker
        selectsRange
        placeholderText="აირჩიეთ თარიღი"
        // @ts-ignore
        startDate={selectedStartDate}
        // @ts-ignore
        endDate={selectedEndDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
      />
    </div>
  );
};

export default DatePickerCustom;
