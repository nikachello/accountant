import { useState } from "react";
import { sellerExpenses } from "../utils/dataUtils";
import storeDatabase from "../data/MockData";
import { sellerOrders, sellerTotalUSD } from "../utils/dataUtils.tsx";

import { BsExclamationLg } from "react-icons/bs";
import { FaBoxOpen, FaMoneyBillWave } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DashboardStatistics() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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
    <div className="p-2 w-3/4">
      <div className="flex justify-between">
        {/* გაყიდვები */}
        <div className="flex gap-2 items-center">
          <div className="relative">
            <div className="h-16 w-16 bg-[#EFF5FF] rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FaBoxOpen className="text-[#5B93FF] fill-current h-10 w-10" />
            </div>
          </div>
          <div className="flex flex-col text-lg">
            <span className="font-Nunito font-extrabold">
              {sellerOrders(storeDatabase.userID, startDate!, endDate!).length}
            </span>
            <span className="font-BPG-Glaho">გაყიდვა</span>
          </div>
        </div>

        {/* საკომისიო */}
        <div className="flex gap-2 items-center">
          <div className="relative">
            <div className="h-16 w-16 bg-[#cff4df] rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FaMoneyBillWave className="text-[#2ecc71] fill-current h-10 w-10" />
            </div>
          </div>
          <div className="flex flex-col text-lg">
            <span className="font-Nunito font-extrabold">
              ${sellerTotalUSD(storeDatabase.userID, startDate!, endDate!)}
            </span>
            <span className="font-BPG-Glaho">საკომისიო</span>
          </div>
        </div>

        {/* ხარვეზი */}
        <div className="flex gap-2 items-center">
          <div className="relative">
            <div className="h-16 w-16 bg-[#fadeda] rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <BsExclamationLg className="text-[#e74c3c] fill-current h-10 w-10" />
            </div>
          </div>
          <div className="flex flex-col text-lg">
            <span className="font-Nunito font-extrabold">
              {
                sellerExpenses(storeDatabase.userID, startDate!, endDate!)
                  .length
              }
            </span>
            <span className="font-BPG-Glaho">ხარვეზი</span>
          </div>
        </div>

        {/* მომხმარებელი */}
        <div className="flex gap-2 items-center">
          <div className="relative">
            <div className="h-16 w-16 bg-[#ffefd5] rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FaUserGroup className="text-[#f39c12] fill-current h-10 w-10" />
            </div>
          </div>
          <div className="flex flex-col text-lg">
            <span className="font-Nunito font-extrabold">
              {sellerOrders(storeDatabase.userID).length}
            </span>
            <span className="font-BPG-Glaho">მომხმარებელი</span>
          </div>
        </div>

        <div>
          <DatePicker
            showIcon
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            dateFormat="yyyy-MM-dd"
            endDate={endDate}
            selectsRange
            isClearable
            placeholderText="აირჩიეთ თარიღი"
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardStatistics;
