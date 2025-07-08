"use client";
import { useState } from "react";
import ModalInput from "./ModalInput";

export default function AddLogs() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-end">
      {/*  */}
      <button
        onClick={() => {
          setIsOpen(true);
        }}
        type="button"
        className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-7.5 py-1.5 text-center inline-flex items-center me-2"
      >
        Add Logs
      </button>
      {/*  */}
      {isOpen && (
        <ModalInput isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
}
