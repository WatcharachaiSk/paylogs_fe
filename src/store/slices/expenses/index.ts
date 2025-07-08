import { create } from "zustand";
import { CreateExpense, EditExpense, Expense } from "./types";
import axios from "axios";
import configAxios from "@/lib/configAxios";
import { API_PATHS } from "@/lib/apiPaths";
import _ from "lodash";
import toast from "react-hot-toast";

// Zustand store interface
interface ExpenseState {
  loading: boolean;
  expenses: Expense[];
  expenseEdit: Expense | null;
  setExpenses: (expenses: Expense[]) => void;
  setExpenseEdit: (expenses: Expense) => void;
  fetchExpenses: (start?: string | null, end?: string | null) => Promise<void>;
  createExpenses: (payload: CreateExpense) => void;
  editExpenses: (payload: EditExpense) => void;
}

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  loading: false,
  expenses: [],
  expenseEdit: null,
  setExpenses: (expenses) => set({ expenses }),
  setExpenseEdit: (expenseEdit) => set({ expenseEdit }),

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
    } catch (error) {
      // console.error("Error fetching expenses:", error);
      alert("Error Create expenses: " + JSON.stringify(error));
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
        get().fetchExpenses();
      }
    } catch (error: unknown) {
      toast.error(error?.message || "Failed to fetch categories");
      console.error("Error Create expenses:", error);
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
        get().fetchExpenses();
      }
    } catch (error) {
      console.error("Error Edit expenses:", error);
      alert("Error Create expenses: " + JSON.stringify(error));
    } finally {
      set({ loading: false });
    }
  },
}));
