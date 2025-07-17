"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from "react-chartjs-2";
import { Chart } from "chart.js";
import { useExpenseStore } from "@/store/slices";
import { useEffect, useState } from "react";
import _ from "lodash";
import { CategoryData } from "@/store/slices/expenses/types";

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
          font: {
            size: 12,
          },
        },
      },
      datalabels: {
        color: "#000",
        font: {
          size: 12,
        },
        formatter: (value: number) => value.toLocaleString(),
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            return `${
              tooltipItem.label
            }: ${tooltipItem.raw.toLocaleString()} บาท`;
          },
        },
      },
    },
  };

  // 👇 Plugin เสริม แสดงข้อความตรงกลาง
  const centerTextPlugin = {
    id: "centerText",
    beforeDraw(chart: Chart) {
      const { width, height, ctx } = chart;
      const text = chart?.options?.plugins?.centerText?.text ?? "";
      ctx.save();
      ctx.font = "16px sans-serif";
      ctx.textAlign = "center";
      ctx.fillStyle = "#000";
      ctx.fillText(text, width / 2, height / 2);
      ctx.restore();
    },
  };
  return (
    <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
  );
}
