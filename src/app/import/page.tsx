"use client";

import { useState } from "react";
import { 
  TbCloudUpload, 
  TbFileSpreadsheet, 
  TbFileText, 
  TbBrandGoogle, 
  TbDownload, 
  TbCheck, 
  TbAlertCircle, 
  TbCopy, 
  TbCircleCheck, 
  TbAlertTriangle, 
  TbCircleX,
  TbInfoCircle,
  TbFileUpload
} from "react-icons/tb";
import { useExpenseStore } from "@/store/slices";
import toast from "react-hot-toast";

export default function ImportPage() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { importExpenses } = useExpenseStore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      mockUpload();
    }
  };

  const mockUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setStep(2);
    }, 1500);
  };

  const handleImport = async () => {
    if (!file) return;
    const success = await importExpenses(file);
    if (success) {
      setStep(3);
      toast.success("นำเข้าข้อมูลสำเร็จ");
    }
  };

  return (
    <div className="space-y-8 font-['DM_Sans',sans-serif]">
      {/* STEPPER */}
      <div className="flex items-center gap-0 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 flex-1">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-medium transition-colors
            ${step >= 1 ? "bg-[#1a1a1a] text-white" : "bg-[#e8e4dc] text-[#a8a49c]"}`}>1</div>
          <span className={`text-[12px] font-medium ${step >= 1 ? "text-[#1a1a1a]" : "text-[#a8a49c]"}`}>อัปโหลดไฟล์</span>
        </div>
        <div className={`h-[1px] flex-1 mx-2 transition-colors ${step >= 2 ? "bg-[#52b788]" : "bg-[#e8e4dc]"}`} />
        <div className="flex items-center gap-3 flex-1">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-medium transition-colors
            ${step >= 2 ? "bg-[#1a1a1a] text-white" : "bg-[#e8e4dc] text-[#a8a49c]"}`}>2</div>
          <span className={`text-[12px] font-medium ${step >= 2 ? "text-[#1a1a1a]" : "text-[#a8a49c]"}`}>ตรวจสอบข้อมูล</span>
        </div>
        <div className={`h-[1px] flex-1 mx-2 transition-colors ${step >= 3 ? "bg-[#52b788]" : "bg-[#e8e4dc]"}`} />
        <div className="flex items-center gap-3 flex-1 justify-end">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-medium transition-colors
            ${step >= 3 ? "bg-[#52b788] text-white" : "bg-[#e8e4dc] text-[#a8a49c]"}`}>3</div>
          <span className={`text-[12px] font-medium ${step >= 3 ? "text-[#1a1a1a]" : "text-[#a8a49c]"}`}>เสร็จสิ้น</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* LEFT COLUMN: UPLOAD */}
        <div className="space-y-4">
          <div 
            className={`border-2 border-dashed rounded-[14px] p-10 text-center bg-[#f7f5f0] transition-all
              ${isUploading ? "opacity-50 pointer-events-none" : "hover:border-[#a8a49c] hover:bg-[#f0ede6] cursor-pointer"}`}
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <input 
              id="file-upload" 
              type="file" 
              className="hidden" 
              accept=".xlsx,.csv" 
              onChange={handleFileChange}
            />
            <div className="flex flex-col items-center">
              {isUploading ? (
                <div className="w-10 h-10 border-4 border-[#1a1a1a]/20 border-t-[#1a1a1a] rounded-full animate-spin mb-4" />
              ) : (
                <TbCloudUpload size={40} className="text-[#a8a49c] mb-3" />
              )}
              <h3 className="text-[15px] font-medium mb-1.5">
                {file ? file.name : "ลากไฟล์มาวางที่นี่"}
              </h3>
              <p className="text-[13px] text-[#a8a49c] mb-4">รองรับ .xlsx, .csv ขนาดไม่เกิน 10MB</p>
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a1a1a] text-white text-[12px] hover:bg-black transition-all">
                <TbFileUpload size={16} />
                เลือกไฟล์
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 py-2">
            <div className="h-[1px] bg-[#e8e4dc] flex-1" />
            <span className="text-[12px] text-[#a8a49c]">หรือ</span>
            <div className="h-[1px] bg-[#e8e4dc] flex-1" />
          </div>

          <div className="bg-white rounded-[14px] border border-[#e8e4dc] p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <TbBrandGoogle size={20} className="text-[#4285f4]" />
              <span className="text-[14px] font-medium text-[#1a1a1a]">Google Sheets URL</span>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] text-[#a8a49c] uppercase tracking-wider mb-1.5">วาง URL</label>
                <input 
                  type="text" 
                  placeholder="https://docs.google.com/spreadsheets/d/..."
                  className="w-full px-3 py-2.5 rounded-lg border border-[#e8e4dc] bg-[#f7f5f0] text-[13px] outline-none focus:border-[#a8a49c] transition-all"
                />
              </div>
              <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#1a1a1a] text-white text-[13px] hover:bg-black transition-all">
                <TbDownload size={16} />
                ดึงข้อมูล
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PREVIEW & INFO */}
        <div className="space-y-4">
          {step >= 2 && (
            <div className="bg-white rounded-[14px] border border-[#e8e4dc] overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4">
              <div className="p-4 border-b border-[#e8e4dc] flex flex-wrap items-center justify-between gap-3">
                <span className="text-[14px] font-medium">ตัวอย่างข้อมูล</span>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#d8f3dc] text-[#2d6a4f] text-[10px]">
                    <TbCheck size={12} /> 47 rows valid
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#ffe8e8] text-[#c1121f] text-[10px]">
                    <TbAlertCircle size={12} /> 2 errors
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#fff0df] text-[#b5540a] text-[10px]">
                    <TbCopy size={12} /> 1 duplicate
                  </span>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[12px] border-collapse">
                  <thead className="bg-[#f7f5f0] text-[#a8a49c] uppercase tracking-wider font-medium">
                    <tr>
                      <th className="px-4 py-2.5 border-b border-[#e8e4dc] w-24">วันที่</th>
                      <th className="px-4 py-2.5 border-b border-[#e8e4dc]">รายการ</th>
                      <th className="px-4 py-2.5 border-b border-[#e8e4dc] w-24">หมวดหมู่</th>
                      <th className="px-4 py-2.5 border-b border-[#e8e4dc] w-24 text-right">จำนวน</th>
                      <th className="px-4 py-2.5 border-b border-[#e8e4dc] w-14 text-center">สถานะ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e8e4dc]">
                    <tr className="hover:bg-[#f7f5f0]/50 transition-colors">
                      <td className="px-4 py-2.5">2026-05-01</td>
                      <td className="px-4 py-2.5">Starbucks</td>
                      <td className="px-4 py-2.5">
                        <span className="px-2 py-0.5 rounded-full bg-[#d8f3dc] text-[#2d6a4f] text-[10px]">Food</span>
                      </td>
                      <td className="px-4 py-2.5 text-right font-medium text-[#c1121f]">−185.00</td>
                      <td className="px-4 py-2.5 text-center"><TbCircleCheck className="mx-auto text-[#52b788]" size={16} /></td>
                    </tr>
                    <tr className="hover:bg-[#f7f5f0]/50 transition-colors border-l-3 border-[#f0c050]">
                      <td className="px-4 py-2.5">2026-05-02</td>
                      <td className="px-4 py-2.5">Grab</td>
                      <td className="px-4 py-2.5">
                        <span className="px-2 py-0.5 rounded-full bg-[#fff0df] text-[#b5540a] text-[10px]">Travel</span>
                      </td>
                      <td className="px-4 py-2.5 text-right font-medium text-[#c1121f]">−320.00</td>
                      <td className="px-4 py-2.5 text-center"><TbAlertTriangle className="mx-auto text-[#b5540a]" size={16} /></td>
                    </tr>
                    <tr className="hover:bg-[#f7f5f0]/50 transition-colors border-l-3 border-[#c1121f]">
                      <td className="px-4 py-2.5">—</td>
                      <td className="px-4 py-2.5 text-[#c1121f]">ไม่มีวันที่</td>
                      <td className="px-4 py-2.5">—</td>
                      <td className="px-4 py-2.5 text-right font-medium">750.00</td>
                      <td className="px-4 py-2.5 text-center"><TbCircleX className="mx-auto text-[#c1121f]" size={16} /></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-[#f7f5f0] border-t border-[#e8e4dc] flex justify-end gap-3">
                <button 
                  onClick={() => setStep(1)}
                  className="px-4 py-1.5 rounded-lg border border-[#e8e4dc] bg-white text-[12px] hover:bg-[#f7f5f0] transition-all"
                >
                  ยกเลิก
                </button>
                <button 
                  onClick={handleImport}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#1a1a1a] text-white text-[12px] hover:bg-black transition-all"
                >
                  <TbCheck size={14} />
                  ยืนยัน Import 47 รายการ
                </button>
              </div>
            </div>
          )}

          <div className="bg-white rounded-[14px] border border-[#e8e4dc] p-5 shadow-sm">
            <h4 className="text-[13px] font-medium mb-3">รูปแบบไฟล์ที่รองรับ</h4>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-[12px] text-[#6b6b6b]">
                <TbFileSpreadsheet className="text-[#2d6a4f]" size={18} />
                Excel (.xlsx) — แนะนำ
              </div>
              <div className="flex items-center gap-2.5 text-[12px] text-[#6b6b6b]">
                <TbFileText className="text-[#1a4f8a]" size={18} />
                CSV (.csv)
              </div>
              <div className="flex items-center gap-2.5 text-[12px] text-[#6b6b6b]">
                <TbBrandGoogle className="text-[#4285f4]" size={18} />
                Google Sheets URL
              </div>
            </div>
            <div className="mt-4 p-3 bg-[#e8f0fb] rounded-lg border border-[#1a4f8a]/10">
              <div className="flex gap-2">
                <TbInfoCircle className="text-[#1a4f8a] shrink-0" size={16} />
                <p className="text-[11px] text-[#1a4f8a] leading-relaxed">
                  คอลัมน์ที่ต้องมี: <span className="font-semibold">date, title, amount</span><br />
                  คอลัมน์ category, type จะถูกตรวจจับอัตโนมัติ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
