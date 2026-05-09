"use client";

import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useExpenseStore } from "@/store/slices";
import { useEffect, useState } from "react";
import _ from "lodash";
import { CategoryData, Expense } from "@/store/slices/expenses/types";
import { formatNumber } from "@/utils/number";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart() {
  const { dataDashboard, selectDate } = useExpenseStore();
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (!dataDashboard || _.isEmpty(dataDashboard.data)) {
      setChartData({ labels: [], datasets: [] });
      return;
    }

    // 1. Collect all unique dates/months from all expenses in all categories
    const allExpenses: Expense[] = _.flatMap(dataDashboard.data, "expenses");
    if (_.isEmpty(allExpenses)) {
      setChartData({ labels: [], datasets: [] });
      return;
    }

    // Determine if we show Daily or Monthly
    // If range > 31 days, show Monthly
    const start = selectDate.startDate ? new Date(selectDate.startDate) : null;
    const end = selectDate.endDate ? new Date(selectDate.endDate) : null;
    
    let isMonthly = false;
    if (start && end) {
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 31) {
        isMonthly = true;
      }
    }

    const formatKey = (dateStr: string) => {
      const d = new Date(dateStr);
      if (isMonthly) {
        return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
      }
      return d.toLocaleDateString("en-US", { day: "numeric", month: "short" });
    };

    // Sort expenses by date
    const sortedExpenses = _.sortBy(allExpenses, "date");
    const uniqueTimeLabels = _.uniq(_.map(sortedExpenses, e => formatKey(e.date)));

    // 2. Prepare datasets (one per category)
    const datasets = dataDashboard.data.map((catData: CategoryData) => {
      // For this category, aggregate amounts by the time labels
      const categoryExpenses = catData.expenses;
      const groupedByTime = _.groupBy(categoryExpenses, e => formatKey(e.date));
      
      const data = uniqueTimeLabels.map(label => {
        const expensesInTime = groupedByTime[label] || [];
        return _.sumBy(expensesInTime, e => Math.abs(e.amount));
      });

      return {
        label: catData.categoryInfo?.name || "Unknown",
        data: data,
        backgroundColor: catData.categoryInfo?.color || "#cbd5e1",
        borderRadius: 4,
      };
    });

    setChartData({
      labels: uniqueTimeLabels,
      datasets: datasets,
    });

  }, [dataDashboard, selectDate]);

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          boxWidth: 10,
          usePointStyle: true,
          pointStyle: "circle",
          font: { size: 11, family: "'DM Sans', sans-serif" },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: ฿${formatNumber(context.raw)}`;
          },
        },
      },
      datalabels: {
        display: false, // Disable datalabels for Bar chart as it can be messy
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        ticks: { font: { size: 10 } },
      },
      y: {
        stacked: true,
        grid: { color: "#f1f5f9" },
        ticks: { 
          font: { size: 10 },
          callback: (value: any) => "฿" + formatNumber(value),
        },
      },
    },
  };

  return (
    <div className="w-full h-full">
      {chartData.labels.length > 0 ? (
        <Bar data={chartData} options={options} />
      ) : (
        <div className="flex items-center justify-center h-full text-[#a8a49c] text-[13px]">
          No data available for the selected period
        </div>
      )}
    </div>
  );
}
