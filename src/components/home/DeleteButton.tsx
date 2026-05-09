"use client";
import { useState } from "react";
import { Expense } from "@/store/slices/expenses/types";
import ModalInputDelete from "./ModalInputDelete";
import { useExpenseStore } from "@/store/slices";
import { TbTrash } from "react-icons/tb";

export default function DeleteButton({ item }: { item: Expense }) {
  const { setExpenseEdit } = useExpenseStore();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          setExpenseEdit(item);
          setIsOpen(true);
        }}
        type="button"
        className="w-7 h-7 flex items-center justify-center rounded-lg text-flow-ink2 hover:text-red hover:bg-red-light transition-all"
        title="ลบรายการ"
      >
        <TbTrash size={16} />
      </button>
      {isOpen && (
        <ModalInputDelete isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}
