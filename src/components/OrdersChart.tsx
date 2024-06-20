import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { ChartData, ChartOptions } from "chart.js";
import storeDatabase from "../data/MockData";
import { sellerOrders } from "../utils/dataUtils";

const OrdersChart = ({
  startDate,
  endDate,
}: {
  startDate: Date | null;
  endDate: Date | null;
}) => {
  const [chartData, setChartData] = useState<ChartData<"line"> | null>(null);

  useEffect(() => {
    let filteredOrders = [];
    if (startDate && endDate) {
      filteredOrders = sellerOrders(storeDatabase.userID, startDate, endDate);
    }
    const ordersByDate: { [key: string]: number } = {};
    filteredOrders.forEach((order) => {
      const dateStr = order.date.toISOString().split("T")[0];
      if (!ordersByDate[dateStr]) {
        ordersByDate[dateStr] = 0;
      }
      ordersByDate[dateStr] += order.total;
    });

    const labels = Object.keys(ordersByDate).sort(); // Sort dates in ascending order
    const data = labels.map((label) => ordersByDate[label]);

    setChartData({
      labels,
      datasets: [
        {
          label: "შეკვეთის თანხა",
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data,
          tension: 0.4,
          fill: false,
        },
      ],
    });
  }, [startDate, endDate]);

  if (!chartData) {
    return <div>დაელოდეთ...</div>;
  }

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "შეკვეთები დროის მანძილზე",
      },
    },
    scales: {
      x: { grid: { display: false } },
    },
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default OrdersChart;
