"use client";
import { useCategoryStore, useExpenseStore } from "@/store/slices";
// import { Category } from "@/store/slices/category/type";
import { MdOutlineSaveAs } from "react-icons/md";
import { formatDateToLocalInputString } from "@/utils/date";
// import _ from "lodash";
import { useEffect, useState } from "react";
import CategorySelector from "./CategorySelector";
import { EditExpense } from "@/store/slices/expenses/types";

export default function ModalInputEdit({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { categories } = useCategoryStore();
  const { expenseEdit, loading, editExpenses } = useExpenseStore();
  const [form, setForm] = useState<EditExpense>({
    id: "",
    amount: 0,
    category: "",
    date: "",
    description: "",
  });
  useEffect(() => {
    setForm({
      id: expenseEdit?._id ?? "",
      amount: expenseEdit?.amount ?? "",
      category: expenseEdit?.category._id ?? "",
      date: formatDateToLocalInputString(expenseEdit?.date ?? null) ?? "",
      description: expenseEdit?.description ?? "",
    });
  }, [expenseEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Edit Product:", form);
    await editExpenses(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Edit Logs</h3>
            <button type="button" onClick={onClose} className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center">
              <svg className="w-3 h-3" viewBox="0 0 14 14" fill="none">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Body */}
          <form className="p-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              {/* Category */}
              <div className="col-span-2">
                <CategorySelector categories={categories} form={form} setForm={setForm} />
              </div>

              {/* Price */}
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
                  Price
                </label>
                <input type="number" id="amount" name="amount" value={form.amount} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="150" required />
              </div>

              {/* Datetime */}
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="datetime" className="block mb-2 text-sm font-medium text-gray-900">
                  Date & Time
                </label>
                <input type="datetime-local" id="date" name="date" value={form.date} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required />
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
                  Description
                </label>
                <textarea id="description" name="description" rows={4} value={form.description} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="Write description here" required></textarea>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" className="gap-x-3.5 w-full flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
              <MdOutlineSaveAs size={20} />
              Save Edit Log{" "}
              {loading == true && (
                <svg aria-hidden="true" role="status" className="mx-5 inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
