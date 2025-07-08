import { Category } from "../category/type";

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
