"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from "react-chartjs-2";
// import { Chart } from "chart.js";
import { useExpenseStore } from "@/store/slices";
import { useEffect, useState } from "react";
import _ from "lodash";
import { CategoryData } from "@/store/slices/expenses/types";
import { formatNumber } from "@/utils/number";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
interface DataDoughnut {
  labels: string[];
  data: number[];
  backgroundColor: string[];
}

export default function DoughnutChart() {
  const { dataDashboard } = useExpenseStore();
  const [dataDoughnut, setDataDoughnut] = useState<DataDoughnut>({
    labels: [""],
    data: [0],
    backgroundColor: [""],
  });

  useEffect(() => {
    if (!_.isEmpty(dataDashboard?.data)) {
      return setDataDoughnut({
        labels: _.map(dataDashboard?.data, (item: CategoryData) => {
          return item?.categoryInfo?.name ?? "";
        }),
        data: _.map(dataDashboard?.data, (item: CategoryData) => {
          return item?.totalAmount ?? 0;
        }),
        backgroundColor: _.map(dataDashboard?.data, (item: CategoryData) => {
          return item?.categoryInfo?.color ?? "";
        }),
      });
    } else {
      return setDataDoughnut({
        labels: [""],
        data: [0],
        backgroundColor: [""],
      });
    }
  }, [dataDashboard]);

  const data = {
    labels: dataDoughnut.labels,
    datasets: [
      {
        label: "Expenses",
        data: dataDoughnut.data,
        backgroundColor: dataDoughnut.backgroundColor,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          font: { size: 10 },
        },
      },
      datalabels: {
        color: "#000",
        font: { size: 10 },
        formatter: (value: number, context: any) => {
          const chart = context.chart;
          const dataset = chart.data.datasets[0];
          const meta = chart.getDatasetMeta(0);

          const totalVisible = dataset.data.reduce((sum: number, val: number, i: number) => {
            return !meta.data[i].hidden ? sum + val : sum;
          }, 0);

          const percent = totalVisible === 0 ? 0 : (value / totalVisible) * 100;
          return `${percent.toFixed(1)}%`;
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const chart = tooltipItem.chart;
            const dataset = chart.data.datasets[0];
            const meta = chart.getDatasetMeta(0);

            const totalVisible = dataset.data.reduce((sum: number, val: number, i: number) => {
              return !meta.data[i].hidden ? sum + val : sum;
            }, 0);

            const value = tooltipItem.raw;
            const percent = totalVisible === 0 ? 0 : (value / totalVisible) * 100;
            return `${tooltipItem.label}: ${formatNumber(value)} บาท (${percent.toFixed(1)}%)`;
          },
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
}
