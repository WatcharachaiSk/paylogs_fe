import { create } from "zustand";
import { Expense } from "./types";
import axios from "axios";
import configAxios from "@/lib/configAxios";
import { API_PATHS } from "@/lib/apiPaths";

// Zustand store interface
interface ExpenseState {
  loading: boolean;
  expenses: Expense[];
  setExpenses: (expenses: Expense[]) => void;
  fetchExpenses: (start?: string | null, end?: string | null) => Promise<void>;
}

export const useExpenseStore = create<ExpenseState>((set) => ({
  loading: false,
  expenses: [],
  setExpenses: (expenses) => set({ expenses }),

  fetchExpenses: async (start?: string | null, end?: string | null) => {
    set({ loading: true });
    try {
      let path = API_PATHS.LOGS;
      if (start || end) {
        path = `${API_PATHS.LOGS}?stDate=${start ? start : ""}&${
          end ? end : ""
        }`;
      }
      const res = await axios(configAxios("get", path));
      if (res.status == 200) set({ expenses: res.data });
    } catch (err) {
      console.error("Error fetching expenses:", err);
    } finally {
      set({ loading: false });
    }
  },
}));
