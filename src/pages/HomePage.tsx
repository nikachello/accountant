import DashboardStatistics from "../components/DashboardStatisticsTop";
import Sidebar from "../components/sidebar/Sidebar";
import DatePickerCustom from "../components/DatePicker";
import { useEffect, useState } from "react";
import OrdersChart from "../components/OrdersChart";

function Home() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const sevenDaysAgo = () => {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    return sevenDaysAgo;
  };

  // Initialize the date range using useEffect
  useEffect(() => {
    setStartDate(sevenDaysAgo());
    setEndDate(new Date()); // Defaults to today
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const onChange = (dates: [Date, Date] | null) => {
    if (dates) {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };

  return (
    <div className="flex flex-row bg-pageBG min-h-screen relative">
      <Sidebar />
      <div className="w-full">
        <div className="p-5">
          <h1 className="text-lg">ზოგადი ინფორმაცია</h1>
        </div>
        <DashboardStatistics startDate={startDate} endDate={endDate} />
        <DatePickerCustom
          startDate={startDate}
          endDate={endDate}
          onChange={onChange}
        />
        <div className="w-2/3 bg-white ml-4 p-3 rounded-lg">
          <OrdersChart startDate={startDate} endDate={endDate} />
        </div>
      </div>
    </div>
  );
}

export default Home;
