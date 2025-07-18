import { create } from "zustand";
import {
  CreateExpense,
  DataDashboard,
  DeleteExpense,
  EditExpense,
  Expense,
  GetExpense,
  SelectDate,
} from "./types";
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
  fetchDataDashboard: (
    start?: string | null,
    end?: string | null
  ) => Promise<void>;
  createExpenses: (payload: CreateExpense) => void;
  editExpenses: (payload: EditExpense) => void;
  deleteExpenses: (payload: DeleteExpense) => void;
}

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  loading: false,
  expenses: null,
  expenseEdit: null,
  dataDashboard: null,
  selectDate: { startDate: setLastDateByDay(0), endDate: setLastDateByDay(0) },
  setExpenses: (expenses) => set({ expenses }),
  setDataDashboard: (dataDashboard) => set({ dataDashboard }),
  setExpenseEdit: (expenseEdit) => set({ expenseEdit }),
  setSelectDate: (selectDate) => set({ selectDate }),
  fetchExpenses: async (start?: string | null, end?: string | null) => {
    set({ loading: true });
    try {
      let path = API_PATHS.LOGSUSER;
      if (start || end) {
        path = `${API_PATHS.LOGSUSER}?stDate=${start ? start : ""}&${
          end ? `endDate=${end}` : ""
        }`;
      }
      const res = await axios(configAxios("get", path));
      if (res.status == 200) set({ expenses: res.data });
    } catch (error: any) {
      set({ expenses: null });
      console.error("Error fetching expenses:", error);
      if (error?.status == 404) {
        toast("ไม่พบ logs ของวันที่ค้นหา", {
          duration: 10000,
        });
      } else if (error?.status == 401) {
        toast(" กรุณาทำการ login ใหม่", {
          duration: 10000,
        });
        deleteCookie("token");
        localStorage.clear();
        location.reload();
      } else {
        alert("Error fetching expenses: " + JSON.stringify(error));
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
        path = `${API_PATHS.LOGSDASHBOARD}?stDate=${start ? start : ""}&${
          end ? `endDate=${end}` : ""
        }`;
      }
      const res = await axios(configAxios("get", path));
      if (res.status == 200) set({ dataDashboard: res.data });
    } catch (error: any) {
      set({ dataDashboard: null });
      console.error("Error fetching Data Dashboard:", error);
      if (error?.status == 404) {
        toast("ไม่พบ Data Dashboard ของวันที่ค้นหา", {
          duration: 10000,
        });
      } else if (error?.status == 401) {
        toast(" กรุณาทำการ login ใหม่", {
          duration: 10000,
        });
        deleteCookie("token");
        localStorage.clear();
        location.reload();
      } else {
        alert("Error Data Dashboard: " + JSON.stringify(error));
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
        toast.success("Save Create Log Successfully!");
        get().fetchExpenses(
          get().selectDate.startDate,
          get().selectDate.endDate
        );
      }
    } catch (error: unknown) {
      console.error("Error Create expenses:", error);
      toast.error("Failed to Create categories");
      // alert("Error Create expenses: " + JSON.stringify(error));
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
        toast.success("Save Edit Log Successfully!");
        get().fetchExpenses(
          get().selectDate.startDate,
          get().selectDate.endDate
        );
      }
    } catch (error) {
      console.error("Error Edit expenses:", error);
      alert("Error Create expenses: " + JSON.stringify(error));
    } finally {
      set({ loading: false });
    }
  },
  deleteExpenses: async (payload: DeleteExpense) => {
    set({ loading: true });
    try {
      const res = await axios(
        configAxios("post", API_PATHS.LOGSDELETE, payload)
      );
      if (res.status == 201) {
        toast.success("Delete Log Successfully!");
        get().fetchExpenses(
          get().selectDate.startDate,
          get().selectDate.endDate
        );
      }
    } catch (error) {
      console.error("Error Edit expenses:", error);
      alert("Error Create expenses: " + JSON.stringify(error));
    } finally {
      set({ loading: false });
    }
  },
}));
