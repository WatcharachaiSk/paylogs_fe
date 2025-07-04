"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useExpenseStore } from "@/store/slices";
import { Expense } from "@/store/slices/expenses/types";
import { GetIconComponent } from "../Icon/GetIconComponent";
import {
  formatDateTimeToTH,
  formatToYMD,
  setLastDateByDay,
} from "@/utils/date";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputLoading from "../loading/TableLoading";

const ITEMS_PER_PAGE = 10;
const SELECT_DATE = [
  "Last day",
  "Last 7 days",
  "Last 30 days",
  "Last 1 year",
  "Custom range",
];

// const generateMockData = (count: any) => {
//   const categories = ["Laptop", "Tablet", "Accessories", "PC Desktop"];
//   const colors = ["Silver", "Black", "White", "Gold"];

//   return Array.from({ length: count }, (_, i) => ({
//     id: i + 1,
//     name: `Mock Product ${i + 1}`,
//     color: colors[i % colors.length],
//     category: categories[i % categories.length],
//     price: `$${(Math.random() * 4000 + 100).toFixed(2)}`,
//   }));
// };

const TableComponent = () => {
  const { fetchExpenses, expenses, loading } = useExpenseStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  //
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [SelectDate, setSelectDate] = useState<{
    startDate: string | null;
    endDate: string | null;
  } | null>({ startDate: setLastDateByDay(1), endDate: null });
  //
  const [selectedOption, setSelectedOption] = useState("Last day");

  // useEffect(() => {
  //   fetchExpenses();
  // }, []);

  useEffect(() => {
    fetchExpenses(SelectDate?.startDate, SelectDate?.endDate);
  }, [SelectDate]);

  const handleDropdownToggle = () => setDropdownOpen((prev) => !prev);
  const handleOptionSelect = (option: string) => {
    console.log("option is ", option);
    setSelectedOption(option);
    setDropdownOpen(false);

    const today = new Date();
    let start: Date | null = null;
    let end: Date | null = new Date();

    switch (option) {
      case "Last day":
        start = new Date(today);
        start.setDate(today.getDate() - 1);
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

    console.log("Selected Range:", {
      start: formattedStart,
      end: formattedEnd,
    });

    setSelectDate({ startDate: formattedStart, endDate: formattedEnd });
    console.log("SelectDate is ", SelectDate);

    setStartDate(start);
    setEndDate(end);
  };

  const filteredData = expenses.filter((item: Expense) =>
    item?.category?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  function getPageNumbers(current: number, total: number): (number | string)[] {
    const delta = 2;
    const range: (number | string)[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | undefined;

    for (let i = 1; i <= total; i++) {
      if (
        i === 1 ||
        i === total ||
        (i >= current - delta && i <= current + delta)
      ) {
        range.push(i);
      }
    }

    for (const i of range) {
      if (l !== undefined) {
        if (typeof i === "number" && i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (typeof i === "number" && i - l > 2) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = typeof i === "number" ? i : l;
    }

    return rangeWithDots;
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-2">
      <div className="flex justify-between items-center mb-4">
        {/* Search----------------------------------------------------------------------- */}
        <input
          type="text"
          className="block p-2 px-4 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Search for items"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />

        <div className="relative">
          {/* ------------------------------------------------------------------------------ */}
          <div className="flex justify-end">
            <button
              onClick={handleDropdownToggle}
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 "
            >
              <svg
                className="w-3 h-3 me-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
              </svg>
              {selectedOption}
              <svg
                className="w-2.5 h-2.5 ms-2.5"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M1 1l4 4 4-4"
                />
              </svg>
            </button>
          </div>
          {dropdownOpen && (
            <div className="z-10 absolute mt-1 w-72 bg-white divide-y divide-gray-100 rounded-lg shadow-lg p-3 space-y-3">
              {/* ตัวเลือกวัน */}
              <ul className="space-y-1 text-sm text-gray-700">
                {SELECT_DATE.map((option) => (
                  <li key={option}>
                    <div
                      className="flex items-center p-2 rounded-sm hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleOptionSelect(option)}
                    >
                      <input
                        type="radio"
                        checked={selectedOption === option}
                        readOnly
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                      />
                      <label className="w-full ms-2 text-sm font-medium text-gray-900">
                        {option}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* DatePicker */}
      <div className="flex justify-end">
        {selectedOption === "Custom range" && (
          <div className="space-x-2 flex items-end">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1 text-gray-700">
                Start date
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                placeholderText="Select start date"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1 text-gray-700">
                End date
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date: Date | null) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate ? startDate : new Date()}
                className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                placeholderText="Select end date"
              />
            </div>

            {/* ปุ่ม Apply */}
            <div className="justify-end">
              <button
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                onClick={() => {
                  if (!startDate || !endDate) {
                    alert("Please select both start and end dates.");
                    return;
                  }

                  const formattedStart = formatToYMD(startDate);
                  const formattedEnd = formatToYMD(endDate);

                  console.log("Custom Range Selected:", {
                    start: formattedStart,
                    end: formattedEnd,
                  });

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

      {/* Item-------------------------------------------------------------------------- */}
      {loading ? (
        <InputLoading />
      ) : (
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">category</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">description</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          {/* List Item-------------------------------------------------------------------------- */}
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((item: Expense) => (
                <tr key={item._id} className="bg-white  hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900 ">
                    <div className="flex">
                      <GetIconComponent
                        iconName={item?.category?.icon}
                        size={20}
                        style={{ marginRight: 8 }}
                        color={item?.category?.color}
                      />
                      {item?.category?.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">{item?.amount}</td>
                  {/* <td className="px-6 py-4">{item?.amount}</td> */}
                  <td className="px-6 py-4">{item?.description}</td>
                  <td className="px-6 py-4">
                    {formatDateTimeToTH(item?.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href="#"
                      className="text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  Data Not Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      {currentData.length > 0 && (
        <div className="flex justify-end mt-4 space-x-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {getPageNumbers(currentPage, totalPages).map((item, idx) =>
            item === "..." ? (
              <span key={idx} className="px-3 py-1 text-sm text-gray-500">
                ...
              </span>
            ) : (
              <button
                key={idx}
                onClick={() => setCurrentPage(Number(item))}
                className={`px-3 py-1 text-sm border rounded ${
                  currentPage === item
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {item}
              </button>
            )
          )}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TableComponent;
