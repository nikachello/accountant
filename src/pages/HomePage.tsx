import DashboardStatistics from "../compontents/DashboardStatisticsTop";
import Sidebar from "../compontents/sidebar/Sidebar";

function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <DashboardStatistics />
    </div>
  );
}

export default Home;
