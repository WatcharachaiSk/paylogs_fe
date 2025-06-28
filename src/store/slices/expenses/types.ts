interface Category {
  _id: string;
  name: string;
  name_th: string;
  icon: string;
  color: string;
  __v: number;
}

// ประเภทของรายการใช้จ่าย (expense)
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