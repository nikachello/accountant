import DashboardStatistics from "../components/DashboardStatisticsTop";
import Sidebar from "../components/sidebar/Sidebar";
import DatePickerCustom from "../components/DatePicker";
import { useEffect, useState } from "react";
import OrdersChart from "../components/OrdersChart";
import IncomeDoughtnut from "../components/IncomeDoughtnut";
import RecentOrders from "../components/recentOrders";
import TopSellingProducts from "../components/TopSellingProducts";

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
      <Sidebar activeTab="მთავარი" />
      <div className="w-full">
        <div className="p-5">
          <h1 className="text-lg font-BPG-Glaho">ზოგადი ინფორმაცია</h1>
        </div>
        <div className="p-5">
          <DashboardStatistics startDate={startDate} endDate={endDate} />
        </div>
        <DatePickerCustom
          startDate={startDate}
          endDate={endDate}
          onChange={onChange}
        />
        <div className="sm:flex gap-7 p-5">
          <div className="w-2/3 sm:w-2/3 mb-5 sm:mb-0 bg-white rounded-lg p-5">
            <OrdersChart startDate={startDate} endDate={endDate} />
          </div>
          <div className="w-1/3 sm:w-1/3 bg-white rounded-lg p-5">
            <IncomeDoughtnut startDate={startDate} endDate={endDate} />
          </div>
        </div>
        <div className="sm:flex gap-7 p-5">
          <div className="sm:w-2/3 bg-white rounded-lg p-5">
            <RecentOrders startDate={startDate} endDate={endDate} />
          </div>
          <div className="sm:w-1/3 bg-white rounded-lg p-5">
            <TopSellingProducts
              amountToShow={10}
              startDate={startDate}
              endDate={endDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
