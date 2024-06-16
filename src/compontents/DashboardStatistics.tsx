import InfoCard from "./InfoCard";
import { useEffect, useState } from "react";
import { calculateProfitDetails } from "../utils/dataUtils";
import storeDatabase from "../data/MockData";

function DashboardStatistics() {
  // const profitDetails = {
  //   "სულ გაყიდვები": "1500$",
  //   "საკომისიოს პროცენტი": "15",
  //   ხარჯები: "60",
  // };

  // const salesHistoryDetails = {
  //   "Louis Vuitton - Neverfull": "3500$",
  //   "Dior - Lady": "4100$",
  // };

  // const salesDetails = {
  //   "2548964": "520",
  //   "2548963": "370",
  // };

  // const clientsDetails = {
  //   "Sandra Colantonio": "1700",
  //   "Ranjit Sandhu": "2500",
  // };

  const [profitDetails, setProfitDetails] = useState({});
  // const [salesDetails, setSalesDetails] = useState({});
  // const [salesHistoryDetails, setSalesHistoryDetails] = useState({});
  // const [clientsDetails, setClientsDetails] = useState({});

  useEffect(() => {
    const sellerProfitData = calculateProfitDetails(storeDatabase.userID);

    setProfitDetails(sellerProfitData);
  }, []);

  return (
    <div className="px-4 py-4 font-BPG-Glaho w-full">
      <div className="grid md:grid-cols-2 gap-4">
        <InfoCard title="გამომუშავებული თანხა" details={profitDetails} />
        {/* <InfoCard title="ბოლო გაყიდვები" details={salesDetails} />
        <InfoCard title="გაყიდვების ისტორია" details={salesHistoryDetails} />
        <InfoCard title="მომხმარებლების ინფორმაცია" details={clientsDetails} /> */}
      </div>
    </div>
  );
}

export default DashboardStatistics;
