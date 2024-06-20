import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";
import "chart.js/auto";
import storeDatabase from "../data/MockData";
import { sellerExpensesUSD, sellerTotalUSD } from "../utils/dataUtils";

const IncomeDoughnut = ({
  startDate,
  endDate,
}: {
  startDate: Date | null;
  endDate: Date | null;
}) => {
  const [hasData, setHasData] = useState(false);

  const soldUSD = sellerTotalUSD(storeDatabase.userID, startDate, endDate);
  const expensesUSD = sellerExpensesUSD(
    storeDatabase.userID,
    startDate,
    endDate
  );
  const profitSeller = soldUSD - expensesUSD;

  let data = [
    {
      label: "საკომისიო",
      value: profitSeller,
      color: "rgba(22, 160, 133, 1)",
      cutout: "50%",
    },
    {
      label: "ხარვეზი",
      value: expensesUSD,
      color: "rgba(255, 76, 48, 1)",
      cutout: "50%",
    },
  ];

  useEffect(() => {
    setHasData(data.some((item) => item.value > 0));
  }, [startDate, endDate, profitSeller, expensesUSD]);

  const options: ChartOptions<"doughnut"> = {
    plugins: {
      responsive: true,
      legend: {
        display: false,
      },
    },
    cutout: data.map((item) => item.cutout),
  };

  const finalData: ChartData<"doughnut"> = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => Math.round(item.value)),
        backgroundColor: data.map((item) => item.color),
        borderColor: data.map((item) => item.color),
        borderWidth: 1,
        // dataVisibility: new Array(data.length).fill(true),
      },
    ],
  };

  return (
    <div>
      {hasData ? (
        <Doughnut data={finalData} options={options} />
      ) : (
        <div className="font-BPG-Glaho">მონაცემები არ მოიძებნა</div>
      )}
    </div>
  );
};

export default IncomeDoughnut;
