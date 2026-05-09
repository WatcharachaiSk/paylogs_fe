# สรุปโปรเจค PayLogs (Frontend)

โปรเจคนี้คือระบบจัดการบันทึกรายจ่าย (Expense Tracker) ที่พัฒนาด้วยเทคโนโลยีสมัยใหม่ เน้นความเร็วและ UI ที่ใช้งานง่าย

## 🛠 เทคโนโลยีที่ใช้ (Tech Stack)

- **Framework**: Next.js 15.3.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 (รุ่นล่าสุด)
- **State Management**: Zustand (จัดการ State ของ Auth, Expenses, Categories)
- **HTTP Client**: Axios (สำหรับติดต่อกับ Backend API)
- **Charts**: Chart.js & react-chartjs-2 (แสดงผลกราฟวงกลม)
- **Authentication**: Google OAuth (@react-oauth/google) และระบบ Token ผ่าน Cookies
- **UI Libraries**: Headless UI, React Icons, React Hot Toast (แจ้งเตือน), React Datepicker (เลือกวันที่)

## ✨ ฟีเจอร์หลักในปัจจุบัน

1.  **ระบบ Authentication**:
    - รองรับการ Login ด้วย Email/Password และ Google OAuth
    - **ดีไซน์ใหม่สไตล์ Apple**: หน้า Login แบบ Minimalist, สะอาดตา, และรองรับการแสดงผลทุกหน้าจอ (Responsive)
    - มี Middleware คอยตรวจสอบ Token เพื่อป้องกันการเข้าถึงหน้าที่ต้องล็อกอิน
2.  **การจัดการบันทึก (Logs Management)**:
    - สามารถเพิ่ม (Create), แก้ไข (Update), และลบ (Delete) รายการค่าใช้จ่ายได้
    - มีตารางแสดงรายการ (TableLogs) พร้อมระบบกรองข้อมูลตามช่วงวันที่
3.  **แดชบอร์ดสรุปผล (Dashboard)**:
    - แสดงกราฟวงกลม (Doughnut Chart) สรุปสัดส่วนค่าใช้จ่ายตามหมวดหมู่
    - รายการสรุปยอดรวมในแต่ละหมวดหมู่
4.  **ระบบเพิ่มข้อมูลแบบกลุ่ม (Bulk Add)**:
    - หน้าจอพิเศษสำหรับกรอกรายการหลายรายการพร้อมกันในรูปแบบตาราง
    - รองรับการลบแถว เพิ่มแถว และการบันทึกข้อมูลทั้งหมดในครั้งเดียว
    - มีระบบเลือกประเภท (รายรับ/รายจ่าย) และหมวดหมู่แยกรายแถว
5.  **ส่วนประกอบ UI (Layout)**:
    - Sidebar ที่สามารถเปิด-ปิดได้
    - ระบบแจ้งเตือน (Toast Notification) เมื่อทำรายการสำเร็จหรือล้มเหลว
    - รองรับการแสดงผลแบบ Responsive

## 📁 โครงสร้างโฟลเดอร์ที่สำคัญ

- `src/app/`: จัดการ Routing (หน้าหลัก, Login, Dashboard)
- `src/components/`: คอมโพเนนต์แยกตามฟีเจอร์ (home, dashboard, login, layout)
- `src/store/`: จัดการ State ทั้งหมดด้วย Zustand แยกเป็น Slice
- `src/lib/`: การตั้งค่า API (Axios config), Path ต่างๆ และค่าคงที่
- `src/utils/`: ฟังก์ชันช่วยจัดการวันที่และตัวเลข
- `public/`: เก็บไฟล์ Static เช่น รูปภาพและไอคอน

---
*บันทึกเมื่อ: 9 พฤษภาคม 2026*
