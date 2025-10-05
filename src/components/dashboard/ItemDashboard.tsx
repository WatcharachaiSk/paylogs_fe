"use client";

import DoughnutChart from "@/components/chart/DoughnutChart";
import { SELECT_DATE } from "@/lib/constants";
import { useExpenseStore } from "@/store/slices";
import { formatToYMD } from "@/utils/date";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import CategoryExpenseList from "./CategoryExpenseList";
// import _ from "lodash";

export default function ItemDashboard() {
  const { fetchDataDashboard, dataDashboard, selectDate, setSelectDate } = useExpenseStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => setDropdownOpen(prev => !prev);
  const [selectedOption, setSelectedOption] = useState(SELECT_DATE[0]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    fetchDataDashboard(selectDate?.startDate, selectDate?.endDate);
  }, [fetchDataDashboard, selectDate]);

  const handleOptionSelect = (option: string) => {
    // console.log("option is ", option);
    setSelectedOption(option);
    setDropdownOpen(false);

    const today = new Date();
    let start: Date | null = null;
    let end: Date | null = new Date();

    switch (option) {
      case "Today":
        start = new Date(today);
        start.setDate(today.getDate());
        end.setDate(today.getDate());
        break;
      case "Last day":
        start = new Date(today);
        start.setDate(today.getDate() - 1);
        end.setDate(today.getDate() - 1);
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
        start.setDate(today.getDate() - 364); // รวมวันนี้
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

    // console.log("Selected Range:", {
    //   start: formattedStart,
    //   end: formattedEnd,
    // });

    setSelectDate({ startDate: formattedStart, endDate: formattedEnd });
    // console.log("SelectDate is ", SelectDate);

    setStartDate(start);
    setEndDate(end);
  };
  return (
    <>
      <div className="flex-col md:flex-row xl:flex-row gap-y-2 flex justify-end items-center mb-4">
        <div className="relative">
          {/* ------------------------------------------------------------------------------ */}
          <div className="flex justify-end">
            <button onClick={handleDropdownToggle} className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 ">
              <svg className="w-3 h-3 me-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
              </svg>
              {selectedOption}
              <svg className="w-2.5 h-2.5 ms-2.5" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M1 1l4 4 4-4" />
              </svg>
            </button>
          </div>
          {dropdownOpen && (
            <div className="z-10 absolute mt-1 w-72 bg-white divide-y divide-gray-100 rounded-lg shadow-lg p-3 space-y-3">
              {/* ตัวเลือกวัน */}
              <ul className="space-y-1 text-sm text-gray-700">
                {SELECT_DATE.map(option => (
                  <li key={option}>
                    <div className="flex items-center p-2 rounded-sm hover:bg-gray-100 cursor-pointer" onClick={() => handleOptionSelect(option)}>
                      <input type="radio" checked={selectedOption === option} readOnly className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                      <label className="w-full ms-2 text-sm font-medium text-gray-900">{option}</label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* DatePicker */}
      <div className="flex justify-end p-2">
        {selectedOption === "Custom range" && (
          <div className=" space-x-2 flex flex-col w-full justify-center">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1 text-gray-700">Start date</label>
              <DatePicker selected={startDate} onChange={(date: Date | null) => setStartDate(date)} selectsStart startDate={startDate} endDate={endDate} className="border border-gray-300 rounded px-2 py-1 text-sm w-full" placeholderText="Select start date" />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1 text-gray-700">End date</label>
              <DatePicker selected={endDate} onChange={(date: Date | null) => setEndDate(date)} selectsEnd startDate={startDate} endDate={endDate} minDate={startDate ? startDate : new Date()} className="border border-gray-300 rounded px-2 py-1 text-sm w-full" placeholderText="Select end date" />
            </div>

            {/* ปุ่ม Apply */}
            <div className="flex my-2 justify-end">
              <button
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                onClick={() => {
                  if (!startDate || !endDate) {
                    alert("Please select both start and end dates.");
                    return;
                  }

                  const formattedStart = formatToYMD(startDate);
                  const formattedEnd = formatToYMD(endDate);

                  // console.log("Custom Range Selected:", {
                  //   start: formattedStart,
                  //   end: formattedEnd,
                  // });

                  setDropdownOpen(false);
                  setSelectDate({
                    startDate: formattedStart,
                    endDate: formattedEnd,
                  });
                  setStartDate(startDate);
                  setEndDate(endDate);
                }}
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
      {/*  */}
      {/* Card 1: Summary */}
      <div className="my-5 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-3">
        {/* Card 1*/}
        <div className="bg-white rounded shadow p-4 text-center">
          <h2 className="text-lg font-semibold mb-2">ค่าใช้จ่ายทั้งหมด</h2>
          <p className="text-3xl font-bold text-blue-600">{dataDashboard?.sumAmount ?? ""}</p>
        </div>

        {/* Card 2: Chart placeholder */}
        <div className="md:col-span-2 xl:col-span-3 bg-white rounded shadow p-4">
          <div className="rounded flex items-center justify-center text-gray-500">
            <DoughnutChart />
          </div>
        </div>
        {/* Card 3*/}
        <div className="md:col-span-3 xl:col-span-3 bg-white rounded shadow p-4">
          <div className=" text-gray-500">
            <CategoryExpenseList data={dataDashboard?.data ?? []} />
          </div>
        </div>
      </div>
    </>
  );
}
