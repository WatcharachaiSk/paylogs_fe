"use client";
import { useState } from "react";
import ModalInput from "./ModalInput";
import { TbPlus } from "react-icons/tb";

export default function AddLogs() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-end mb-6">
      <button
        onClick={() => {
          setIsOpen(true);
        }}
        type="button"
        className="btn-flow-dark py-2.5 px-6 flex items-center justify-center gap-2 shadow-sm w-full sm:w-auto"
      >
        <TbPlus size={18} />
        Add Transaction
      </button>
      {isOpen && (
        <ModalInput isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
}
