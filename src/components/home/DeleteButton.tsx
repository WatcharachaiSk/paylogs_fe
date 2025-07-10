"use client";
import { useState } from "react";
import { Expense } from "@/store/slices/expenses/types";
import ModalInputDelete from "./ModalInputDelete";
import { useExpenseStore } from "@/store/slices";
import { MdDelete } from "react-icons/md";

export default function DeleteButton({ item }: { item: Expense }) {
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
        className="hover:text-white border border-b-rose-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-1 py-1 text-center me-2 mb-2"
      >
        <MdDelete size={20} />
      </button>
      {/*  */}
      {isOpen && (
        <ModalInputDelete isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
}
