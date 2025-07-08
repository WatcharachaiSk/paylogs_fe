import { create } from "zustand";
import { Category } from "./type";
import { API_PATHS } from "@/lib/apiPaths";
import axios from "axios";
import configAxios from "@/lib/configAxios";
// import { getCookie, setCookie } from "cookies-next";

interface CategoryState {
  loading: boolean;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  fetchCategories: () => Promise<void>;
  getCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  loading: false,
  categories: [],
  setCategories: (categories) => set({ categories }),
  fetchCategories: async () => {
    set({ loading: true });
    try {
      const res = await axios(configAxios("get", API_PATHS.CATEGORIES));
      if (res.status === 200) {
        set({ categories: res.data });
        localStorage.setItem("categories", JSON.stringify(res.data));
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      set({ loading: false });
    }
  },
  getCategories: async () => {
    const currentState = get();

    if (currentState.categories.length > 0) {
      return currentState.categories;
    }
    const localData = localStorage.getItem("categories");
    if (localData) {
      try {
        const parsed = JSON.parse(localData as string);
        set({ categories: parsed });
        return parsed;
      } catch (err) {
        console.error("Invalid categories cookie:", err);
      }
    }
    // state และ cookie → fetch ใหม่
    await get().fetchCategories();
    return get().categories;
  },
}));
