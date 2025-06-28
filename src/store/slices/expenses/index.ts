import { create } from "zustand";
import { Expense } from "./types";
import axios from "axios";
import configAxios from "@/lib/configAxios";
import { API_PATHS } from "@/lib/apiPaths";

// Zustand store interface
interface ExpenseState {
  expenses: Expense[];
  setExpenses: (expenses: Expense[]) => void;
  fetchExpenses: () => Promise<void>;
}

export const useExpenseStore = create<ExpenseState>((set) => ({
  expenses: [],
  setExpenses: (expenses) => set({ expenses }),

  fetchExpenses: async () => {
    try {
      const res = await axios(configAxios("get", API_PATHS.LOGS));
      if (res.status == 200) set({ expenses: res.data });
      console.log("expenses is ", res.data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  },
}));
