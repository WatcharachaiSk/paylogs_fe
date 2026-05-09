"use client";
import { useExpenseStore } from "@/store/slices";
import { TbTrash, TbX } from "react-icons/tb";

export default function ModalInputDelete({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { deleteExpenses, loading, expenseEdit } = useExpenseStore();

  const handleDeleteSubmit = async () => {
    const payload = { id: expenseEdit?._id ?? "" };
    deleteExpenses(payload);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
      
      {/* MODAL */}
      <div className="relative w-full max-w-[360px] max-h-[calc(100vh-2rem)] bg-white rounded-[14px] shadow-2xl border border-flow flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 text-center overflow-y-auto scrollbar-thin scrollbar-thumb-flow-ink3 scrollbar-track-transparent">
          <div className="flex justify-end absolute top-4 right-4">
            <button onClick={onClose} className="text-flow-ink3 hover:text-flow-ink transition-colors">
              <TbX size={20} />
            </button>
          </div>
          
          <div className="w-12 h-12 bg-red-light text-red rounded-full flex items-center justify-center mx-auto mb-4">
            <TbTrash size={24} />
          </div>
          
          <h2 className="text-[20px] font-display text-flow-ink mb-2">Delete Transaction</h2>
          <p className="text-[13px] text-flow-ink2 mb-6">
            คุณแน่ใจหรือไม่ว่าต้องการลบรายการ <br/>
            <span className="font-semibold text-flow-ink">&quot;{expenseEdit?.description}&quot;</span>?
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-flow justify-center py-2.5"
            >
              ยกเลิก
            </button>
            <button
              type="button"
              onClick={handleDeleteSubmit}
              disabled={loading}
              className="flex-1 bg-red text-white py-2.5 px-4 rounded-lg font-medium text-[13px] hover:bg-red/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? "กำลังลบ..." : "ลบรายการ"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
