import { create } from "zustand";
import { CreateExpense, DataDashboard, DeleteExpense, EditExpense, Expense, GetExpense, SelectDate } from "./types";
import axios from "axios";
import configAxios from "@/lib/configAxios";
import { API_PATHS } from "@/lib/apiPaths";
import _ from "lodash";
import toast from "react-hot-toast";
import { setLastDateByDay } from "@/utils/date";
import { deleteCookie } from "cookies-next";

// Zustand store interface
interface ExpenseState {
  loading: boolean;
  expenses: GetExpense | null;
  expenseEdit: Expense | null;
  dataDashboard: DataDashboard | null;
  selectDate: SelectDate;
  setExpenses: (expenses: GetExpense) => void;
  setDataDashboard: (dataDashboard: DataDashboard) => void;
  setSelectDate: (selectDate: SelectDate) => void;
  setExpenseEdit: (expenses: Expense) => void;
  fetchExpenses: (start?: string | null, end?: string | null) => Promise<void>;
  fetchDataDashboard: (start?: string | null, end?: string | null) => Promise<void>;
  createExpenses: (payload: CreateExpense) => void;
  createBulkExpenses: (payload: CreateExpense[]) => Promise<boolean>;
  importExpenses: (file: File) => Promise<boolean>;
  editExpenses: (payload: EditExpense) => void;
  deleteExpenses: (payload: DeleteExpense) => void;
}

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  loading: false,
  expenses: null,
  expenseEdit: null,
  dataDashboard: null,
  selectDate: { startDate: setLastDateByDay(0), endDate: setLastDateByDay(0) },
  setExpenses: expenses => set({ expenses }),
  setDataDashboard: dataDashboard => set({ dataDashboard }),
  setExpenseEdit: expenseEdit => set({ expenseEdit }),
  setSelectDate: selectDate => set({ selectDate }),
  fetchExpenses: async (start?: string | null, end?: string | null) => {
    set({ loading: true });
    try {
      let path = API_PATHS.LOGSUSER;
      if (start || end) {
        path = `${API_PATHS.LOGSUSER}?stDate=${start ? start : ""}&${end ? `endDate=${end}` : ""}`;
      }
      const res = await axios(configAxios("get", path));
      if (res.status == 200) set({ expenses: res.data });
    } catch (error: any) {
      set({ expenses: null });
      console.error("Error fetching expenses:", error);
      if (error?.status == 404) {
        toast("ไม่พบ logs ของวันที่ค้นหา", {
          duration: 5000,
        });
      } else if (error?.status == 401) {
        toast.error("กรุณาทำการ login ใหม่");
        deleteCookie("token");
        localStorage.clear();
        location.reload();
      } else {
        toast.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
      }
    } finally {
      set({ loading: false });
    }
  },
  fetchDataDashboard: async (start?: string | null, end?: string | null) => {
    set({ loading: true });
    try {
      let path = API_PATHS.LOGSDASHBOARD;
      if (start || end) {
        path = `${API_PATHS.LOGSDASHBOARD}?stDate=${start ? start : ""}&${end ? `endDate=${end}` : ""}`;
      }
      const res = await axios(configAxios("get", path));
      if (res.status == 200) set({ dataDashboard: res.data });
    } catch (error: any) {
      set({ dataDashboard: null });
      console.error("Error fetching Data Dashboard:", error);
      if (error?.status == 404) {
        toast("ไม่พบข้อมูลแดชบอร์ด", {
          duration: 5000,
        });
      } else if (error?.status == 401) {
        toast.error("กรุณาทำการ login ใหม่");
        deleteCookie("token");
        localStorage.clear();
        location.reload();
      } else {
        toast.error("เกิดข้อผิดพลาดในระบบแดชบอร์ด");
      }
    } finally {
      set({ loading: false });
    }
  },
  createExpenses: async (payload: CreateExpense) => {
    set({ loading: true });
    try {
      payload.amount = _.toNumber(payload.amount);
      const res = await axios(configAxios("post", API_PATHS.LOGS, payload));
      if (res.status == 201) {
        toast.success("บันทึกข้อมูลเรียบร้อย!");
        get().fetchExpenses(get().selectDate.startDate, get().selectDate.endDate);
      }
    } catch (error: unknown) {
      console.error("Error Create expenses:", error);
      toast.error("ไม่สามารถบันทึกข้อมูลได้");
    } finally {
      set({ loading: false });
    }
  },
  createBulkExpenses: async (payload: CreateExpense[]) => {
    set({ loading: true });
    try {
      // Convert amounts to numbers
      const formattedPayload = _.map(payload, item => ({
        ...item,
        amount: _.toNumber(item.amount),
      }));

      const res = await axios(configAxios("post", `${API_PATHS.LOGS}/bulk`, formattedPayload));
      if (res.status == 201) {
        toast.success(`บันทึกสำเร็จ ${payload.length} รายการ!`);
        get().fetchExpenses(get().selectDate.startDate, get().selectDate.endDate);
        return true;
      }
      return false;
    } catch (error: any) {
      console.error("Error Bulk Create expenses:", error);
      toast.error("ไม่สามารถบันทึกข้อมูลแบบกลุ่มได้");
      return false;
    } finally {
      set({ loading: false });
    }
  },
  importExpenses: async (file: File) => {
    set({ loading: true });
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios(
        configAxios("post", API_PATHS.LOGSIMPORT, formData, {
          "Content-Type": "multipart/form-data",
        })
      );

      if (res.status == 201 || res.status == 200) {
        toast.success("นำเข้าข้อมูลสำเร็จ!");
        get().fetchExpenses(get().selectDate.startDate, get().selectDate.endDate);
        return true;
      }
      return false;
    } catch (error: any) {
      console.error("Error Import expenses:", error);
      toast.error("ไม่สามารถนำเข้าข้อมูลได้");
      return false;
    } finally {
      set({ loading: false });
    }
  },
  editExpenses: async (payload: EditExpense) => {
    set({ loading: true });
    try {
      payload.amount = _.toNumber(payload.amount);
      const res = await axios(configAxios("post", API_PATHS.LOGSEDIT, payload));
      if (res.status == 201) {
        toast.success("แก้ไขข้อมูลเรียบร้อย!");
        get().fetchExpenses(get().selectDate.startDate, get().selectDate.endDate);
      }
    } catch (error) {
      console.error("Error Edit expenses:", error);
      toast.error("ไม่สามารถแก้ไขข้อมูลได้");
    } finally {
      set({ loading: false });
    }
  },
  deleteExpenses: async (payload: DeleteExpense) => {
    set({ loading: true });
    try {
      const res = await axios(configAxios("post", API_PATHS.LOGSDELETE, payload));
      if (res.status == 201) {
        toast.success("ลบข้อมูลเรียบร้อย!");
        get().fetchExpenses(get().selectDate.startDate, get().selectDate.endDate);
      }
    } catch (error) {
      console.error("Error Delete expenses:", error);
      toast.error("ไม่สามารถลบข้อมูลได้");
    } finally {
      set({ loading: false });
    }
  },
}));
