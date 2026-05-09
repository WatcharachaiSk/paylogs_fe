"use client";

import { 
  TbPlus, 
  TbEdit, 
  TbCircleCheck, 
  TbPlayerPause,
  TbCalendarRepeat,
  TbTrash
} from "react-icons/tb";

export default function RecurringPage() {
  const recurringItems = [
    { name: "เงินเดือน", category: "Salary", freq: "ทุกเดือน", nextDate: "1 มิ.ย. 2026", amount: "+฿50,000", status: "Active", type: "income", badgeColor: "bg-[#e8f0fb] text-[#1a4f8a]" },
    { name: "Netflix", category: "Entertain", freq: "ทุกเดือน", nextDate: "15 พ.ค. 2026", amount: "−฿419", status: "Active", type: "expense", badgeColor: "bg-[#ffe8e8] text-[#c1121f]" },
    { name: "ค่าเช่าบ้าน", category: "Housing", freq: "ทุกเดือน", nextDate: "1 มิ.ย. 2026", amount: "−฿8,000", status: "Active", type: "expense", badgeColor: "bg-[#fff0df] text-[#b5540a]" },
    { name: "ประกันชีวิต", category: "Insurance", freq: "ทุกปี", nextDate: "1 ม.ค. 2027", amount: "−฿12,000", status: "Paused", type: "expense", badgeColor: "bg-[#f7f5f0] text-[#a8a49c]" },
  ];

  return (
    <div className="space-y-6 font-['DM_Sans',sans-serif]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-[20px] font-['DM_Serif_Display',serif] text-[#1a1a1a]">รายการประจำ</h2>
          <p className="text-[12px] text-[#a8a49c]">จัดการรายรับและรายจ่ายที่จะเกิดขึ้นโดยอัตโนมัติ</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a1a1a] text-white text-[13px] hover:bg-black transition-all shadow-sm self-start">
          <TbPlus size={16} />
          เพิ่มรายการประจำ
        </button>
      </div>

      <div className="bg-white rounded-[14px] border border-[#e8e4dc] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] border-collapse">
            <thead className="bg-[#f7f5f0] text-[#a8a49c] uppercase tracking-wider font-medium">
              <tr>
                <th className="px-6 py-3.5 border-b border-[#e8e4dc]">รายการ</th>
                <th className="px-6 py-3.5 border-b border-[#e8e4dc]">หมวดหมู่</th>
                <th className="px-6 py-3.5 border-b border-[#e8e4dc]">ความถี่</th>
                <th className="px-6 py-3.5 border-b border-[#e8e4dc]">วันถัดไป</th>
                <th className="px-6 py-3.5 border-b border-[#e8e4dc] text-right">จำนวน</th>
                <th className="px-6 py-3.5 border-b border-[#e8e4dc] text-center">สถานะ</th>
                <th className="px-6 py-3.5 border-b border-[#e8e4dc] w-20"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8e4dc]">
              {recurringItems.map((item, i) => (
                <tr key={i} className="hover:bg-[#f7f5f0]/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${item.type === 'income' ? 'bg-[#d8f3dc]' : 'bg-[#ffe8e8]'} flex items-center justify-center text-[18px]`}>
                        <TbCalendarRepeat className={item.type === 'income' ? 'text-[#2d6a4f]' : 'text-[#c1121f]'} />
                      </div>
                      <span className="font-semibold text-[#1a1a1a]">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor}`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#6b6b6b]">{item.freq}</td>
                  <td className="px-6 py-4 text-[#a8a49c]">{item.nextDate}</td>
                  <td className={`px-6 py-4 text-right font-bold ${item.type === 'income' ? 'text-[#2d6a4f]' : 'text-[#c1121f]'}`}>
                    {item.amount}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {item.status === "Active" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#d8f3dc] text-[#2d6a4f] text-[10px] font-bold">
                        <TbCircleCheck size={12} /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f0ede6] text-[#a8a49c] text-[10px] font-bold">
                        <TbPlayerPause size={12} /> Paused
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-md hover:bg-[#f0ede6] text-[#6b6b6b] transition-colors">
                        <TbEdit size={16} />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-[#ffe8e8] text-[#c1121f] transition-colors">
                        <TbTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-[#f7f5f0] border-t border-[#e8e4dc] flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-[#e8f0fb] flex items-center justify-center text-[#1a4f8a]">
            <TbCalendarRepeat size={14} />
          </div>
          <span className="text-[12px] text-[#a8a49c]">คุณมีรายการที่ต้องจ่ายในอีก 7 วันข้างหน้าทั้งหมด 2 รายการ</span>
        </div>
      </div>
    </div>
  );
}
