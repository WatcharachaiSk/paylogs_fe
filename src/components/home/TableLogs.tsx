"use client";

import { useState, useEffect } from "react";
import { useCategoryStore, useExpenseStore } from "@/store/slices";
import { Expense } from "@/store/slices/expenses/types";
import { formatDateTimeToTH, formatToYMD } from "@/utils/date";
import DatePicker from "react-datepicker";
import { TbSearch, TbCalendar, TbChevronDown, TbChevronLeft, TbChevronRight } from "react-icons/tb";

import InputLoading from "../loading/TableLoading";
import _ from "lodash";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import { GetIconComponent } from "../setIcon/GetIconComponent";
import { formatNumber } from "@/utils/number";
import { SELECT_DATE } from "@/lib/constants";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 8;

const TableComponent = () => {
  const { fetchExpenses, expenses, loading, selectDate, setSelectDate } = useExpenseStore();
  const { getCategories } = useCategoryStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedOption, setSelectedOption] = useState(SELECT_DATE[0]);
  const [sumAmount, setSumAmount] = useState<number | null>(null);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    fetchExpenses(selectDate?.startDate, selectDate?.endDate);
  }, [fetchExpenses, selectDate]);

  const handleDropdownToggle = () => setDropdownOpen(prev => !prev);
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
    setStartDate(start);
    setEndDate(end);
  };

  const filteredData = _.filter(expenses?.data, (item: Expense) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      item?.category?.name.toLowerCase().includes(searchLower) ||
      _.toString(item?.amount).includes(searchLower) ||
      item?.description.toLowerCase().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    if (!_.isEmpty(currentData)) setSumAmount(_.sumBy(filteredData, "amount"));
    else setSumAmount(0);
  }, [currentData, filteredData]);

  return (
    <div className="bg-white rounded-[14px] border border-[#e8e4dc] overflow-hidden shadow-sm font-['DM_Sans',sans-serif]">
      {/* HEADER & FILTERS */}
      <div className="p-4 lg:p-5 border-b border-[#e8e4dc] bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="font-medium text-[14px] text-[#1a1a1a]">รายการล่าสุด</h3>
        
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* SEARCH */}
          <div className="relative flex-1 sm:flex-initial">
            <TbSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8a49c]" size={14} />
            <input
              type="text"
              className="pl-9 pr-4 py-1.5 rounded-full border border-[#e8e4dc] bg-[#f7f5f0] text-[12px] text-[#1a1a1a] focus:ring-1 focus:ring-[#a8a49c] outline-none transition-all w-full sm:w-48"
              placeholder="ค้นหารายการ..."
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* DATE SELECTOR */}
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
      </div>

      {/* CUSTOM RANGE PICKER */}
      {selectedOption === "Custom range" && (
        <div className="p-4 bg-[#f7f5f0] border-b border-[#e8e4dc] flex flex-wrap items-end gap-3">
          <div className="space-y-1">
            <label className="text-[11px] text-[#a8a49c] uppercase tracking-wider font-medium">จากวันที่</label>
            <DatePicker 
              selected={startDate} 
              onChange={(date: Date | null) => setStartDate(date)} 
              selectsStart 
              startDate={startDate} 
              endDate={endDate} 
              className="w-full px-3 py-2 rounded-lg border border-[#e8e4dc] bg-[#f7f5f0] text-[13px] outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-[#a8a49c] uppercase tracking-wider font-medium">ถึงวันที่</label>
            <DatePicker 
              selected={endDate} 
              onChange={(date: Date | null) => setEndDate(date)} 
              selectsEnd 
              startDate={startDate} 
              endDate={endDate} 
              minDate={startDate || undefined}
              className="w-full px-3 py-2 rounded-lg border border-[#e8e4dc] bg-[#f7f5f0] text-[13px] outline-none"
            />
          </div>
          <button
            className="inline-flex items-center gap-2 px-6 h-9 rounded-lg text-[13px] font-sans cursor-pointer border border-[#1a1a1a] bg-[#1a1a1a] text-white hover:bg-black transition-all duration-200 shadow-sm"
            onClick={() => {
              if (!startDate || !endDate) {
                toast.error("กรุณาเลือกวันที่เริ่มต้นและสิ้นสุด");
                return;
              }
              const formattedStart = formatToYMD(startDate);
              const formattedEnd = formatToYMD(endDate);
              setDropdownOpen(false);
              setSelectDate({ startDate: formattedStart, endDate: formattedEnd });
            }}
          >
            Apply
          </button>
        </div>
      )}

      {/* TABLE */}
      <div className="overflow-x-auto min-h-[400px]">
        {loading ? (
          <div className="p-10"><InputLoading /></div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f7f5f0] text-[11px] text-[#a8a49c] uppercase tracking-wider font-normal">
              <tr>
                <th className="px-5 py-3 border-b border-[#e8e4dc]">วันที่</th>
                <th className="px-5 py-3 border-b border-[#e8e4dc]">รายการ</th>
                <th className="px-5 py-3 border-b border-[#e8e4dc]">หมวดหมู่</th>
                <th className="px-5 py-3 border-b border-[#e8e4dc] text-right">จำนวน</th>
                <th className="px-5 py-3 border-b border-[#e8e4dc] w-24"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8e4dc]">
              {currentData.length > 0 ? (
                _.map(currentData, (item: Expense) => (
                  <tr key={item._id} className="group hover:bg-[#f7f5f0] transition-colors">
                    <td className="px-5 py-3.5 text-[12px] text-[#a8a49c]">
                      {formatDateTimeToTH(item?.date).split(' ')[0]} {formatDateTimeToTH(item?.date).split(' ')[1]} {formatDateTimeToTH(item?.date).split(' ')[2]}
                    </td>
                    <td className="px-5 py-3.5 text-[13px] font-medium text-[#1a1a1a]">
                      {item?.description}
                    </td>
                    <td className="px-5 py-3.5">
                      <div 
                        className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-medium"
                        style={{ backgroundColor: item?.category?.color + '20', color: item?.category?.color }}
                      >
                        <GetIconComponent iconName={item?.category?.icon} size={12} />
                        {item?.category?.name}
                      </div>
                    </td>
                    <td className={`px-5 py-3.5 text-[13px] font-semibold text-right ${item.amount < 0 ? "text-[#c1121f]" : "text-[#2d6a4f]"}`}>
                      {item.amount < 0 ? "−" : "+"}฿{formatNumber(Math.abs(item.amount))}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <EditButton item={item} />
                        <DeleteButton item={item} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-20 text-[#a8a49c] text-[13px]">
                    ไม่พบรายการในช่วงเวลาที่เลือก
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* FOOTER & PAGINATION */}
      <div className="p-4 border-t border-[#e8e4dc] bg-[#f7f5f0] flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-[13px] text-[#1a1a1a]">
          ยอดรวมสุทธิ: <span className="font-['DM_Serif_Display',serif] text-[18px] ml-1">฿{formatNumber(sumAmount ?? 0)}</span>
        </div>
        
        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} 
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-[#e8e4dc] bg-white text-[#6b6b6b] disabled:opacity-30 transition-all hover:bg-[#f7f5f0]"
            >
              <TbChevronLeft size={16} />
            </button>
            
            <div className="flex items-center gap-1 px-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`min-w-[28px] h-7 rounded-lg text-[12px] transition-all
                    ${currentPage === num ? "bg-[#1a1a1a] text-white" : "text-[#6b6b6b] hover:bg-[#f0ede6]"}`}
                >
                  {num}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} 
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-[#e8e4dc] bg-white text-[#6b6b6b] disabled:opacity-30 transition-all hover:bg-[#f7f5f0]"
            >
              <TbChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableComponent;
