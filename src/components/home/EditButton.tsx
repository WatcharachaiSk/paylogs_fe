"use client";
import { useState } from "react";
import { Expense } from "@/store/slices/expenses/types";
import ModalInputEdit from "./ModalInputEdit";
import { useExpenseStore } from "@/store/slices";
import { TbEdit } from "react-icons/tb";

export default function EditButton({ item }: { item: Expense }) {
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
        className="w-7 h-7 flex items-center justify-center rounded-lg text-flow-ink2 hover:text-flow-ink hover:bg-flow-surface2 transition-all"
        title="แก้ไขรายการ"
      >
        <TbEdit size={16} />
      </button>
      {isOpen && (
        <ModalInputEdit isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}
