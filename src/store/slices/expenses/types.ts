import { Category } from "../category/type";

export interface GetExpense {
  data: Expense[];
  sumAmount: number;
}
export interface Expense {
  _id: string;
  user: string;
  amount: number;
  category: Category;
  description: string;
  date: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface CreateExpense {
  amount: number | string;
  date: string;
  description: string;
  category: string;
}
export interface EditExpense {
  id: string;
  amount: number | string;
  date: string;
  description: string;
  category: string;
}

export interface DeleteExpense {
  id: string;
}

export interface SelectDate {
  startDate: string | null;
  endDate: string | null;
}

export interface DataDashboard {
  data: CategoryData[];
  sumAmount: number;
}

export interface CategoryData {
  _id: string;
  totalAmount: number;
  count: number;
  expenses: Expense[];
  categoryInfo: Category;
}
