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
        className="btn-flow-dark py-2 px-5 flex items-center gap-2 shadow-sm"
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
