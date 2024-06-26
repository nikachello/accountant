import { sellerExpenses } from "../utils/dataUtils";
import storeDatabase from "../data/MockData";
import { sellerOrders, sellerTotalUSD } from "../utils/dataUtils.tsx";

import { BsExclamationLg } from "react-icons/bs";
import { FaBoxOpen, FaMoneyBillWave } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";

import "react-datepicker/dist/react-datepicker.css";

interface DashboardStatisticsProps {
  startDate: Date | null;
  endDate: Date | null;
}

const DashboardStatistics: React.FC<DashboardStatisticsProps> = ({
  startDate,
  endDate,
}) => {
  return (
    <div className="w-full">
      <div className="sm:flex flex-wrap justify-between gap-4">
        {/* გაყიდვები */}
        <div className="flex gap-4 items-center bg-white py-5 px-6 rounded-lg flex-1 min-w-[200px] max-w-[300px]">
          <div className="relative">
            <div className="h-16 w-16 bg-[#EFF5FF] rounded-full flex items-center justify-center">
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
        <div className="flex gap-4 items-center bg-white py-5 px-6 rounded-lg flex-1 min-w-[200px] max-w-[300px]">
          <div className="relative">
            <div className="h-16 w-16 bg-[#cff4df] rounded-full flex items-center justify-center">
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
        <div className="flex gap-4 items-center bg-white py-5 px-6 rounded-lg flex-1 min-w-[200px] max-w-[300px]">
          <div className="relative">
            <div className="h-16 w-16 bg-[#fadeda] rounded-full flex items-center justify-center">
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
        <div className="flex gap-4 items-center bg-white py-5 px-6 rounded-lg flex-1 min-w-[200px] max-w-[300px]">
          <div className="relative">
            <div className="h-16 w-16 bg-[#ffefd5] rounded-full flex items-center justify-center">
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
      </div>
    </div>
  );
};

export default DashboardStatistics;
