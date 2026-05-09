"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import { formatToYMD } from "@/utils/date";
import toast from "react-hot-toast";

interface CustomRangePickerProps {
  onApply: (startDate: string, endDate: string) => void;
  onClose?: () => void;
}

const CustomRangePicker = ({ onApply, onClose }: CustomRangePickerProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleApply = () => {
    if (!startDate || !endDate) {
      toast.error("กรุณาเลือกวันที่เริ่มต้นและสิ้นสุด");
      return;
    }
    const formattedStart = formatToYMD(startDate);
    const formattedEnd = formatToYMD(endDate);

    if (formattedStart && formattedEnd) {
      onApply(formattedStart, formattedEnd);
      if (onClose) onClose();
    }
  };

  return (
    <div className="p-4 bg-[#f7f5f0] border-b border-[#e8e4dc] flex flex-col sm:flex-row flex-wrap items-stretch sm:items-end justify-end gap-3 transition-all duration-300">
      <div className="space-y-1 flex-1 sm:flex-initial">
        <label className="text-[11px] text-[#a8a49c] uppercase tracking-wider font-medium block">จากวันที่</label>
        <DatePicker 
          selected={startDate} 
          onChange={(date: Date | null) => setStartDate(date)} 
          selectsStart 
          startDate={startDate} 
          endDate={endDate} 
          placeholderText="เลือกวันที่เริ่มต้น"
          className="w-full px-3 py-2 rounded-lg border border-[#e8e4dc] bg-white text-[13px] outline-none focus:ring-1 focus:ring-[#1a1a1a]"
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <div className="space-y-1 flex-1 sm:flex-initial">
        <label className="text-[11px] text-[#a8a49c] uppercase tracking-wider font-medium block">ถึงวันที่</label>
        <DatePicker 
          selected={endDate} 
          onChange={(date: Date | null) => setEndDate(date)} 
          selectsEnd 
          startDate={startDate} 
          endDate={endDate} 
          minDate={startDate || undefined}
          placeholderText="เลือกวันที่สิ้นสุด"
          className="w-full px-3 py-2 rounded-lg border border-[#e8e4dc] bg-white text-[13px] outline-none focus:ring-1 focus:ring-[#1a1a1a]"
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <button
        className="inline-flex items-center justify-center gap-2 px-6 h-9 rounded-lg text-[13px] font-sans cursor-pointer border border-[#1a1a1a] bg-[#1a1a1a] text-white hover:bg-black transition-all duration-200 shadow-sm mt-2 sm:mt-0 w-full sm:w-auto"
        onClick={handleApply}
      >
        Apply
      </button>
    </div>
  );
};

export default CustomRangePicker;
