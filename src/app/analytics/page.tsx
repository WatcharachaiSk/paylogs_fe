"use client";

import { useState } from "react";
import { 
  TbTrendingUp, 
  TbTrendingDown, 
  TbWallet, 
  TbPigMoney, 
  TbChartBar, 
  TbCalendarStats,
  TbArrowUpRight,
  TbArrowDownRight
} from "react-icons/tb";

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("เดือนนี้");

  const stats = [
    { label: "รายรับรวม", value: "฿50,000", sub: "+12% จากเดือนก่อน", subColor: "text-[#2d6a4f]", icon: TbTrendingUp, iconBg: "bg-[#d8f3dc]", iconColor: "text-[#2d6a4f]" },
    { label: "รายจ่ายรวม", value: "฿32,450", sub: "+5% จากเดือนก่อน", subColor: "text-[#c1121f]", icon: TbTrendingDown, iconBg: "bg-[#ffe8e8]", iconColor: "text-[#c1121f]" },
    { label: "ยอดคงเหลือ", value: "฿17,550", sub: "เดือนนี้", subColor: "text-[#a8a49c]", icon: TbWallet, iconBg: "bg-[#e8f0fb]", iconColor: "text-[#1a4f8a]" },
    { label: "Saving Rate", value: "35.1%", sub: "เป้าหมาย 30%", subColor: "text-[#2d6a4f]", icon: TbPigMoney, iconBg: "bg-[#fff0df]", iconColor: "text-[#b5540a]" },
  ];

  const categories = [
    { name: "Food", amount: "฿9,720", percentage: 75, color: "bg-[#52b788]" },
    { name: "Travel", amount: "฿6,480", percentage: 52, color: "bg-[#4a90d9]" },
    { name: "Shopping", amount: "฿5,200", percentage: 42, color: "bg-[#e8825a]" },
    { name: "Utilities", amount: "฿4,380", percentage: 35, color: "bg-[#f0c050]" },
    { name: "Health", amount: "฿2,800", percentage: 22, color: "bg-[#c8b8e0]" },
    { name: "Other", amount: "฿3,870", percentage: 32, color: "bg-[#e8e4dc]" },
  ];

  const topItems = [
    { name: "Starbucks", category: "Food", count: 12, total: "฿2,220", avg: "฿185", badgeColor: "bg-[#d8f3dc] text-[#2d6a4f]" },
    { name: "Grab", category: "Travel", count: 8, total: "฿2,560", avg: "฿320", badgeColor: "bg-[#fff0df] text-[#b5540a]" },
    { name: "Netflix", category: "Entertain", count: 5, total: "฿2,095", avg: "฿419", badgeColor: "bg-[#ffe8e8] text-[#c1121f]" },
    { name: "Big C", category: "Shopping", count: 6, total: "฿7,440", avg: "฿1,240", badgeColor: "bg-[#e8f0fb] text-[#1a4f8a]" },
    { name: "ค่าไฟ", category: "Utilities", count: 3, total: "฿3,600", avg: "฿1,200", badgeColor: "bg-[#fff0df] text-[#b5540a]" },
  ];

  return (
    <div className="space-y-6 font-['DM_Sans',sans-serif]">
      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-[14px] border border-[#e8e4dc] shadow-sm relative overflow-hidden group hover:border-[#a8a49c] transition-all">
            <div className={`absolute top-4 right-4 w-9 h-9 ${stat.iconBg} ${stat.iconColor} rounded-lg flex items-center justify-center transition-transform group-hover:scale-110`}>
              <stat.icon size={18} />
            </div>
            <p className="text-[11px] text-[#a8a49c] uppercase tracking-wider mb-2 font-medium">{stat.label}</p>
            <h3 className="text-[26px] font-['DM_Serif_Display',serif] text-[#1a1a1a] mb-1">{stat.value}</h3>
            <p className={`text-[11px] font-medium ${stat.subColor}`}>{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CATEGORY SPENDING */}
        <div className="bg-white rounded-[14px] border border-[#e8e4dc] overflow-hidden shadow-sm flex flex-col">
          <div className="p-5 border-b border-[#e8e4dc] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TbChartBar className="text-[#1a1a1a]" size={20} />
              <h3 className="text-[14px] font-semibold text-[#1a1a1a]">รายจ่ายตามหมวดหมู่</h3>
            </div>
            <div className="flex bg-[#f0ede6] p-1 rounded-lg gap-1">
              {["เดือนนี้", "3 เดือน", "1 ปี"].map(t => (
                <button 
                  key={t}
                  onClick={() => setPeriod(t)}
                  className={`px-3 py-1 rounded-md text-[11px] font-medium transition-all
                    ${period === t ? "bg-white text-[#1a1a1a] shadow-sm" : "text-[#6b6b6b] hover:text-[#1a1a1a]"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="p-6 space-y-5 flex-1">
            {categories.map((cat, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-[12px]">
                  <span className="font-medium text-[#6b6b6b]">{cat.name}</span>
                  <span className="font-semibold text-[#1a1a1a]">{cat.amount}</span>
                </div>
                <div className="h-2.5 bg-[#e8e4dc] rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${cat.color} rounded-full transition-all duration-1000`} 
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MONTHLY TRENDS MOCKUP */}
        <div className="bg-white rounded-[14px] border border-[#e8e4dc] overflow-hidden shadow-sm flex flex-col">
          <div className="p-5 border-b border-[#e8e4dc]">
            <div className="flex items-center gap-2">
              <TbCalendarStats className="text-[#1a1a1a]" size={20} />
              <h3 className="text-[14px] font-semibold text-[#1a1a1a]">แนวโน้มรายเดือน</h3>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex-1 bg-[#f7f5f0] rounded-xl p-4 flex items-center justify-center relative min-h-[160px]">
              <svg className="w-full h-24" viewBox="0 0 300 80" preserveAspectRatio="none">
                <polyline 
                  points="0,60 50,45 100,55 150,30 200,40 250,20 300,28" 
                  fill="none" stroke="#52b788" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"
                />
                <polyline 
                  points="0,70 50,65 100,72 150,58 200,62 250,50 300,55" 
                  fill="none" stroke="#e8825a" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"
                />
              </svg>
              <div className="absolute bottom-4 left-4 flex gap-4">
                <div className="flex items-center gap-1.5 text-[10px] text-[#6b6b6b]">
                  <div className="w-2.5 h-0.5 bg-[#52b788] rounded-full" /> รายรับ
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#6b6b6b]">
                  <div className="w-2.5 h-0.5 bg-[#e8825a] rounded-full" /> รายจ่าย
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-center p-3.5 bg-[#d8f3dc] rounded-xl border border-[#52b788]/10 transition-transform hover:scale-[1.01]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#52b788] flex items-center justify-center text-white">
                    <TbArrowDownRight size={18} />
                  </div>
                  <span className="text-[13px] font-semibold text-[#2d6a4f]">เดือนที่ใช้จ่ายน้อยสุด</span>
                </div>
                <span className="text-[13px] text-[#2d6a4f] font-medium">กุมภาพันธ์ · ฿24,100</span>
              </div>
              <div className="flex justify-between items-center p-3.5 bg-[#ffe8e8] rounded-xl border border-[#c1121f]/10 transition-transform hover:scale-[1.01]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#c1121f] flex items-center justify-center text-white">
                    <TbArrowUpRight size={18} />
                  </div>
                  <span className="text-[13px] font-semibold text-[#c1121f]">เดือนที่ใช้จ่ายมากสุด</span>
                </div>
                <span className="text-[13px] text-[#c1121f] font-medium">มกราคม · ฿38,500</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TOP ITEMS TABLE */}
      <div className="bg-white rounded-[14px] border border-[#e8e4dc] overflow-hidden shadow-sm">
        <div className="p-5 border-b border-[#e8e4dc]">
          <h3 className="text-[14px] font-semibold text-[#1a1a1a]">Top 5 รายการที่ใช้จ่ายบ่อย</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] border-collapse">
            <thead className="bg-[#f7f5f0] text-[#a8a49c] uppercase tracking-wider font-medium">
              <tr>
                <th className="px-6 py-3.5 border-b border-[#e8e4dc]">รายการ</th>
                <th className="px-6 py-3.5 border-b border-[#e8e4dc]">หมวดหมู่</th>
                <th className="px-6 py-3.5 border-b border-[#e8e4dc] text-center">ครั้ง</th>
                <th className="px-6 py-3.5 border-b border-[#e8e4dc] text-right">รวม</th>
                <th className="px-6 py-3.5 border-b border-[#e8e4dc] text-right">เฉลี่ย/ครั้ง</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8e4dc]">
              {topItems.map((item, i) => (
                <tr key={i} className="hover:bg-[#f7f5f0]/50 transition-colors group">
                  <td className="px-6 py-4 font-semibold text-[#1a1a1a]">{item.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor}`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center font-medium text-[#6b6b6b]">{item.count}</td>
                  <td className="px-6 py-4 text-right font-bold text-[#c1121f]">{item.total}</td>
                  <td className="px-6 py-4 text-right font-medium text-[#a8a49c]">{item.avg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
