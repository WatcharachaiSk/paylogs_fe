"use client";
import { useState } from "react";
import { Expense } from "@/store/slices/expenses/types";
import ModalInputEdit from "./ModalInputEdit";
import { useExpenseStore } from "@/store/slices";

export default function EditButton({ item }: { item: Expense }) {
  const { setExpenseEdit } = useExpenseStore();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-end">
      {/*  */}
      <button
        onClick={() => {
          // console.log("item is", item);
          setExpenseEdit(item);
          setIsOpen(true);
        }}
        type="button"
        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2"
      >
        Edit
      </button>
      {/*  */}
      {isOpen && (
        <ModalInputEdit isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
}
