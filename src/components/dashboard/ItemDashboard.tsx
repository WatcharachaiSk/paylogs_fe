"use client";

import DoughnutChart from "@/components/chart/DoughnutChart";
import BarChart from "@/components/chart/BarChart";
import { SELECT_DATE } from "@/lib/constants";
import { useExpenseStore } from "@/store/slices";
import { formatToYMD } from "@/utils/date";
import { useEffect, useState } from "react";
import CategoryExpenseList from "./CategoryExpenseList";
import { TbTrendingUp, TbTrendingDown, TbWallet, TbCoin, TbCalendar, TbChevronDown, TbChartBar } from "react-icons/tb";
import { formatNumber } from "@/utils/number";
import CustomRangePicker from "./CustomRangePicker";

function SummaryCard({ label, amount, icon, variant, change, isUp, isPercent = false }: any) {
  const iconColors: any = {
    income: "bg-[#d8f3dc] text-[#2d6a4f]",
    expense: "bg-[#ffe8e8] text-[#c1121f]",
    balance: "bg-[#e8f0fb] text-[#1a4f8a]",
    saving: "bg-[#fff0df] text-[#b5540a]",
  };

  return (
    <div className="bg-white rounded-[14px] border border-[#e8e4dc] p-5 relative shadow-sm hover:shadow-md transition-shadow">
      <div className={`absolute right-4 top-4 w-8 h-8 rounded-lg flex items-center justify-center text-[15px] ${iconColors[variant]}`}>
        {icon}
      </div>
      <div className="text-[11px] text-[#a8a49c] uppercase tracking-[0.8px] mb-2 font-medium">{label}</div>
      <div className="text-[26px] font-['DM_Serif_Display',serif] text-[#1a1a1a] tracking-tight">
        {isPercent ? "" : "฿"}{formatNumber(amount)}{isPercent ? "%" : ""}
      </div>
      <div className={`text-[11px] mt-2 flex items-center gap-1 ${isUp ? "text-[#2d6a4f]" : "text-[#c1121f]"}`}>
        <TbTrendingUp size={10} className={isUp ? "" : "rotate-180"} />
        {change}
      </div>
    </div>
  );
}

export default function ItemDashboard() {
  const { fetchDataDashboard, dataDashboard, selectDate, setSelectDate } = useExpenseStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => setDropdownOpen(prev => !prev);
  const [selectedOption, setSelectedOption] = useState(SELECT_DATE[0]);

  useEffect(() => {
    fetchDataDashboard(selectDate?.startDate, selectDate?.endDate);
  }, [fetchDataDashboard, selectDate]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setDropdownOpen(false);

    const today = new Date();
    let start: Date | null = null;
    let end: Date | null = new Date();

    switch (option) {
      case "Today":
        start = new Date(today);
        end = new Date(today);
        break;
      case "Last day":
        start = new Date(today);
        start.setDate(today.getDate() - 1);
        end = new Date(start);
        break;
      case "Last 7 days":
        start = new Date(today);
        start.setDate(today.getDate() - 6);
        break;
      case "Last 30 days":
        start = new Date(today);
        start.setDate(today.getDate() - 29);
        break;
      case "Last 1 year":
        start = new Date(today);
        start.setDate(today.getDate() - 364);
        break;
      case "Custom range":
        start = null;
        end = null;
        break;
      default:
        break;
    }
    const formattedStart = formatToYMD(start);
    const formattedEnd = formatToYMD(end);

    setSelectDate({ startDate: formattedStart, endDate: formattedEnd });
  };

  const totalExpense = dataDashboard?.sumAmount || 0;
  // Mocking some values since we might not have them yet from API
  const totalIncome = totalExpense * 1.5; // Example mock
  const balance = totalIncome - totalExpense;
  const savingRate = ((totalIncome - totalExpense) / totalIncome) * 100;

  return (
    <div className="space-y-6 font-['DM_Sans',sans-serif]">
      {/* FILTERS */}
      <div className="flex justify-end">
        <div className="relative">
          <button 
            onClick={handleDropdownToggle}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#e8e4dc] bg-white text-[12px] text-[#6b6b6b] hover:bg-[#f7f5f0] transition-colors"
          >
            <TbCalendar size={14} />
            {selectedOption}
            <TbChevronDown size={12} />
          </button>
          
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-[#e8e4dc] rounded-xl shadow-lg z-50 p-2 py-2">
              <ul className="space-y-0.5">
                {SELECT_DATE.map(option => (
                  <li key={option}>
                    <button 
                      onClick={() => handleOptionSelect(option)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-[12px] transition-colors
                        ${selectedOption === option ? "bg-[#1a1a1a] text-white" : "text-[#6b6b6b] hover:bg-[#f7f5f0]"}`}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* CUSTOM RANGE PICKER */}
      {selectedOption === "Custom range" && (
        <div className="border border-[#e8e4dc] rounded-[14px] overflow-hidden">
          <CustomRangePicker 
            onApply={(startDate, endDate) => {
              setSelectDate({ startDate, endDate });
              setDropdownOpen(false);
            }}
          />
        </div>
      )}

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard 
          label="Total Income" 
          amount={totalIncome} 
          icon={<TbTrendingUp />} 
          variant="income"
          change="+12% from last month"
          isUp={true}
        />
        <SummaryCard 
          label="Total Expense" 
          amount={totalExpense} 
          icon={<TbTrendingDown />} 
          variant="expense"
          change="+5% from last month"
          isUp={false}
        />
        <SummaryCard 
          label="Balance" 
          amount={balance} 
          icon={<TbWallet />} 
          variant="balance"
          change="on track"
          isUp={true}
        />
        <SummaryCard 
          label="Saving Rate" 
          amount={savingRate} 
          icon={<TbCoin />} 
          variant="saving"
          change="great progress"
          isUp={true}
          isPercent={true}
        />
      </div>

      {/* CHARTS ROW (Bar + Doughnut) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart Card */}
        <div className="bg-white rounded-[14px] border border-[#e8e4dc] p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[14px] font-medium text-[#1a1a1a] flex items-center gap-2">
              <TbChartBar className="text-[#a8a49c]" />
              แนวโน้มรายจ่ายตามหมวดหมู่
            </h3>
          </div>
          <div className="h-[300px]">
            <BarChart />
          </div>
        </div>

        {/* Doughnut Chart Card */}
        <div className="bg-white rounded-[14px] border border-[#e8e4dc] p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[14px] font-medium text-[#1a1a1a] flex items-center gap-2">
              <TbChartBar className="text-[#a8a49c]" />
              สัดส่วนรายจ่าย (Doughnut)
            </h3>
          </div>
          <div className="h-[300px] flex items-center justify-center">
            <DoughnutChart />
          </div>
        </div>
      </div>

      {/* CATEGORY LIST ROW (Bottom) */}
      <div className="bg-white rounded-[14px] border border-[#e8e4dc] overflow-hidden shadow-sm">
        <div className="p-5 border-b border-[#e8e4dc]">
          <h3 className="text-[14px] font-medium text-[#1a1a1a]">หมวดหมู่รายจ่าย</h3>
        </div>
        <div className="p-2">
          <CategoryExpenseList data={dataDashboard?.data ?? []} />
        </div>
      </div>
    </div>
  );
}
