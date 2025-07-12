import _ from "lodash";

export default function DashboardPage() {
  const dataTest = ["1", "2", "3"];
  return (
    <div className="h-screen">
      {/* Card 1: Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {_.map(dataTest, (item) => {
          return (
            <div key={item}>
              <div className="bg-white rounded shadow p-4">
                <h2 className="text-lg font-semibold mb-2">
                  ค่าใช้จ่ายทั้งหมด(กำลังพัฒนา)
                </h2>
                <p className="text-3xl font-bold text-blue-600">฿125,000</p>
              </div>

              {/* Card 2: Chart placeholder */}
              <div className="bg-white rounded shadow p-4">
                <h2 className="text-lg font-semibold mb-2">รายงานกราฟ</h2>
                <div className="h-40 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                  กราฟตัวอย่าง
                </div>
              </div>

              {/* Card 3: Recent activities */}
              <div className="bg-white rounded shadow p-4">
                <h2 className="text-lg font-semibold mb-2">กิจกรรมล่าสุด</h2>
                <ul className="list-disc list-inside text-gray-700">
                  <li>ผู้ใช้ใหม่ลงทะเบียน 5 คน</li>
                  <li>ออเดอร์ที่ถูกยกเลิก 2 รายการ</li>
                  <li>สินค้าใหม่เพิ่ม 3 รายการ</li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
