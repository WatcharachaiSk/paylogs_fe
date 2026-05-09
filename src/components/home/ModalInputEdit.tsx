"use client";
import { useCategoryStore, useExpenseStore } from "@/store/slices";
import { formatDateToLocalInputString } from "@/utils/date";
import { useEffect, useState } from "react";
import CategorySelector from "./CategorySelector";
import { EditExpense } from "@/store/slices/expenses/types";
import { TbX, TbDeviceFloppy } from "react-icons/tb";

export default function ModalInputEdit({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { categories } = useCategoryStore();
  const { expenseEdit, loading, editExpenses } = useExpenseStore();
  
  const [type, setType] = useState<"income" | "expense">("expense");
  const [form, setForm] = useState<EditExpense>({
    id: "",
    amount: 0,
    category: "",
    date: "",
    description: "",
  });

  useEffect(() => {
    if (expenseEdit) {
      const isExpense = expenseEdit.amount < 0;
      setType(isExpense ? "expense" : "income");
      setForm({
        id: expenseEdit._id,
        amount: Math.abs(expenseEdit.amount),
        category: expenseEdit.category._id,
        date: formatDateToLocalInputString(expenseEdit.date) || "",
        description: expenseEdit.description,
      });
    }
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
    const finalAmount = type === "expense" ? -Math.abs(Number(form.amount)) : Math.abs(Number(form.amount));
    await editExpenses({ ...form, amount: finalAmount });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
      
      {/* MODAL */}
      <div className="relative w-full max-w-[380px] bg-white rounded-[14px] shadow-2xl border border-flow overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6">
          <div className="flex justify-between items-start mb-1">
            <h2 className="text-[20px] font-display text-flow-ink">Edit Transaction</h2>
            <button onClick={onClose} className="text-flow-ink3 hover:text-flow-ink transition-colors">
              <TbX size={20} />
            </button>
          </div>
          <p className="text-[12px] text-flow-ink3 mb-6">แก้ไขข้อมูลรายรับหรือรายจ่าย</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* TYPE TOGGLE */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-flow-surface2 rounded-[10px]">
              <button
                type="button"
                onClick={() => setType("income")}
                className={`py-2 text-[13px] font-medium rounded-lg transition-all ${
                  type === "income" ? "bg-green-light text-green" : "text-flow-ink2 hover:bg-white/50"
                }`}
              >
                💚 รายรับ
              </button>
              <button
                type="button"
                onClick={() => setType("expense")}
                className={`py-2 text-[13px] font-medium rounded-lg transition-all ${
                  type === "expense" ? "bg-red-light text-red" : "text-flow-ink2 hover:bg-white/50"
                }`}
              >
                ❤️ รายจ่าย
              </button>
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-1">
              <label className="text-[11px] text-flow-ink3 uppercase tracking-wider font-medium">ชื่อรายการ</label>
              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="เช่น Starbucks, เงินเดือน..."
                className="w-full px-3 py-2.5 rounded-lg border border-flow bg-flow-bg text-[13px] focus:border-flow-ink3 outline-none transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* AMOUNT */}
              <div className="space-y-1">
                <label className="text-[11px] text-flow-ink3 uppercase tracking-wider font-medium">จำนวนเงิน (฿)</label>
                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full px-3 py-2.5 rounded-lg border border-flow bg-flow-bg text-[13px] focus:border-flow-ink3 outline-none transition-all"
                  required
                />
              </div>

              {/* CATEGORY */}
              <div className="space-y-1">
                <label className="text-[11px] text-flow-ink3 uppercase tracking-wider font-medium">หมวดหมู่</label>
                <CategorySelector categories={categories} form={form} setForm={setForm} />
              </div>
            </div>

            {/* DATE */}
            <div className="space-y-1">
              <label className="text-[11px] text-flow-ink3 uppercase tracking-wider font-medium">วันที่ทำรายการ</label>
              <input
                type="datetime-local"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-lg border border-flow bg-flow-bg text-[13px] focus:border-flow-ink3 outline-none transition-all"
                required
              />
            </div>

            {/* FOOTER */}
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 btn-flow justify-center py-2.5"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-flow-dark justify-center py-2.5 disabled:opacity-50"
              >
                {loading ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}
                {!loading && <TbDeviceFloppy size={16} className="ml-1" />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
