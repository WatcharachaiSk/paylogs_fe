import InputLogin from "@/components/login/InputLogin";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
      <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full">
        <div>
          <h2 className="lg:text-5xl text-3xl font-bold lg:leading-[57px] text-slate-900">
            ระบบ Paylog จัดการรายรับรายจ่ายของคุณ
          </h2>
          <p className="text-sm mt-6 text-slate-500 leading-relaxed">
            ระบบ Paylog
            ถูกออกแบบมาเพื่อให้คุณสามารถบันทึกและติดตามรายรับรายจ่ายของคุณได้อย่างง่ายดาย
            ช่วยให้คุณควบคุมการเงินได้อย่างมีประสิทธิภาพ.
          </p>
          <p className="text-sm mt-12 text-slate-500">
            ยังไม่ได้สมัครสมาชิกใช่ไหม{" "}
            <a
              href="javascript:void(0);"
              className="text-blue-600 font-medium hover:underline ml-1"
            >
              ลงทะเบียนที่นี่
            </a>
          </p>
        </div>
        <InputLogin />
      </div>
    </div>
  );
}
