"use client";

import { useCategoryStore, useExpenseStore } from "@/store/slices";
import { CreateExpense } from "@/store/slices/expenses/types";
import { formatToYMD } from "@/utils/date";
import _ from "lodash";
import { useEffect, useState } from "react";
import { TbPlus, TbTrash, TbDeviceFloppy, TbInfoCircle, TbChevronDown } from "react-icons/tb";
import toast from "react-hot-toast";

interface BulkRow extends CreateExpense {
  id: string;
  type: "income" | "expense";
}

export default function BulkAddPage() {
  const { categories, getCategories } = useCategoryStore();
  const { createBulkExpenses, loading } = useExpenseStore();

  const [rows, setRows] = useState<BulkRow[]>([]);

  useEffect(() => {
    getCategories();
    // Initial rows
    const initialRows: BulkRow[] = _.range(3).map(() => ({
      id: _.uniqueId("row-"),
      date: formatToYMD(new Date()) || "",
      description: "",
      category: "",
      amount: "",
      type: "expense",
    }));
    setRows(initialRows);
  }, [getCategories]);

  useEffect(() => {
    if (categories.length > 0 && rows.every(r => !r.category)) {
      setRows(prev => prev.map(r => ({ ...r, category: categories[0]._id })));
    }
  }, [categories, rows]);

  const addRow = () => {
    const newRow: BulkRow = {
      id: _.uniqueId("row-"),
      date: formatToYMD(new Date()) || "",
      description: "",
      category: categories[0]?._id || "",
      amount: "",
      type: "expense",
    };
    setRows([...rows, newRow]);
  };

  const deleteRow = (id: string) => {
    if (rows.length <= 1) {
      toast.error("ต้องมีอย่างน้อย 1 รายการ");
      return;
    }
    setRows(rows.filter(r => r.id !== id));
  };

  const handleInputChange = (id: string, field: keyof BulkRow, value: string) => {
    setRows(rows.map(r => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const handleSaveAll = async () => {
    const validRows = rows.filter(r => r.description && r.amount && r.category);
    if (validRows.length === 0) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วนอย่างน้อย 1 รายการ");
      return;
    }

    const payload: CreateExpense[] = validRows.map(r => ({
      date: r.date,
      description: r.description,
      category: r.category,
      amount: r.type === "expense" ? -Math.abs(Number(r.amount)) : Math.abs(Number(r.amount)),
    }));

    const success = await createBulkExpenses(payload);
    if (success) {
      // Clear rows or redirect
      setRows(_.range(3).map(() => ({
        id: _.uniqueId("row-"),
        date: formatToYMD(new Date()) || "",
        description: "",
        category: categories[0]?._id || "",
        amount: "",
        type: "expense",
      })));
    }
  };

  return (
    <div className="space-y-6 font-['DM_Sans',sans-serif]">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[20px] font-['DM_Serif_Display',serif] text-[#1a1a1a]">Bulk Transactions</h2>
          <p className="text-[12px] text-[#a8a49c]">เพิ่มหลายรายการพร้อมกันอย่างรวดเร็ว</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setRows([])} 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] border border-[#e8e4dc] bg-white text-[#1a1a1a] hover:bg-[#f7f5f0] transition-all"
          >
            <TbTrash size={16} />
            ล้างทั้งหมด
          </button>
          <button 
            onClick={handleSaveAll}
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-[13px] bg-[#1a1a1a] text-white hover:bg-black transition-all shadow-sm disabled:opacity-50"
          >
            {loading ? "กำลังบันทึก..." : "บันทึกทั้งหมด"}
            {!loading && <TbDeviceFloppy size={16} />}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[14px] border border-[#e8e4dc] overflow-hidden shadow-sm">
        <div className="p-4 lg:p-5 border-b border-[#e8e4dc] flex justify-between items-center">
          <span className="font-medium text-[14px] text-[#1a1a1a]">กรอกรายการ</span>
          <div className="flex items-center gap-3">
            <span className="text-[12px] text-[#a8a49c]">{rows.length} รายการ</span>
            <button 
              onClick={addRow}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#e8e4dc] bg-[#f7f5f0] text-[12px] text-[#1a1a1a] hover:bg-[#e8e4dc] transition-all"
            >
              <TbPlus size={14} />
              เพิ่มแถว
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f7f5f0] text-[11px] text-[#a8a49c] uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 border-b border-[#e8e4dc] w-10 text-center">#</th>
                <th className="px-4 py-3 border-b border-[#e8e4dc] w-40">วันที่</th>
                <th className="px-4 py-3 border-b border-[#e8e4dc]">ชื่อรายการ</th>
                <th className="px-4 py-3 border-b border-[#e8e4dc] w-44">หมวดหมู่</th>
                <th className="px-4 py-3 border-b border-[#e8e4dc] w-32">ประเภท</th>
                <th className="px-4 py-3 border-b border-[#e8e4dc] w-40">จำนวน (฿)</th>
                <th className="px-4 py-3 border-b border-[#e8e4dc] w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8e4dc]">
              {rows.map((row, index) => (
                <tr key={row.id} className="group hover:bg-[#f7f5f0]/50 transition-colors">
                  <td className="px-4 py-3 text-[12px] text-[#a8a49c] text-center font-medium">
                    {index + 1}
                  </td>
                  <td className="px-2 py-2">
                    <input 
                      type="date" 
                      value={row.date}
                      onChange={(e) => handleInputChange(row.id, "date", e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg border border-transparent bg-transparent focus:border-[#a8a49c] focus:bg-white outline-none text-[13px] transition-all"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input 
                      type="text" 
                      placeholder="เช่น ค่าอาหาร, ลาเต้..."
                      value={row.description}
                      onChange={(e) => handleInputChange(row.id, "description", e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg border border-transparent bg-transparent focus:border-[#a8a49c] focus:bg-white outline-none text-[13px] transition-all"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <div className="relative">
                      <select 
                        value={row.category}
                        onChange={(e) => handleInputChange(row.id, "category", e.target.value)}
                        className="w-full px-2 py-1.5 rounded-lg border border-transparent bg-transparent focus:border-[#a8a49c] focus:bg-white outline-none text-[13px] transition-all appearance-none cursor-pointer"
                      >
                        {categories.map(cat => (
                          <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                      </select>
                      <TbChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-[#a8a49c] pointer-events-none" size={14} />
                    </div>
                  </td>
                  <td className="px-2 py-2">
                    <div className="relative">
                      <select 
                        value={row.type}
                        onChange={(e) => handleInputChange(row.id, "type", e.target.value as any)}
                        className={`w-full px-2 py-1.5 rounded-lg border border-transparent bg-transparent focus:border-[#a8a49c] focus:bg-white outline-none text-[12px] font-medium transition-all appearance-none cursor-pointer
                          ${row.type === "income" ? "text-[#2d6a4f]" : "text-[#c1121f]"}`}
                      >
                        <option value="expense">❤️ รายจ่าย</option>
                        <option value="income">💚 รายรับ</option>
                      </select>
                      <TbChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-[#a8a49c] pointer-events-none" size={14} />
                    </div>
                  </td>
                  <td className="px-2 py-2">
                    <input 
                      type="number" 
                      placeholder="0.00"
                      value={row.amount}
                      onChange={(e) => handleInputChange(row.id, "amount", e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg border border-transparent bg-transparent focus:border-[#a8a49c] focus:bg-white outline-none text-[13px] font-semibold text-right transition-all"
                    />
                  </td>
                  <td className="px-2 py-2 text-center">
                    <button 
                      onClick={() => deleteRow(row.id)}
                      className="p-1.5 rounded-lg text-[#a8a49c] hover:text-[#c1121f] hover:bg-red-light transition-all opacity-0 group-hover:opacity-100"
                    >
                      <TbTrash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-[#f7f5f0] border-t border-[#e8e4dc] flex items-center gap-3">
          <TbInfoCircle className="text-[#a8a49c]" size={18} />
          <span className="text-[12px] text-[#a8a49c]">กด Tab เพื่อเลื่อนระหว่างช่อง · บันทึกเฉพาะแถวที่มีข้อมูลครบถ้วน</span>
        </div>
      </div>
    </div>
  );
}
