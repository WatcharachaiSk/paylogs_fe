import { CategoryData } from "@/store/slices/expenses/types";
import { formatDateTimeToTH } from "@/utils/date";
import { formatNumber } from "@/utils/number";
import _ from "lodash";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface Props {
  data: CategoryData[] | [];
}

export default function CategoryExpenseList({ data }: Props) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleOpen = (categoryId: string) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="w-full max-w-auto mx-auto mt-5">
      {_.map(data, category => (
        <div key={category._id} className="border-b border-gray-200 py-2">
          <div className="flex justify-between items-center cursor-pointer px-2 py-2 bg-gray-100 rounded" onClick={() => toggleOpen(category._id)}>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.categoryInfo.color }} />
              <span className="font-semibold">{category.categoryInfo.name_th}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">{category.totalAmount.toLocaleString()} บาท</span>
              {openCategory === category._id ? <FaChevronUp /> : <FaChevronDown />}
            </div>
          </div>

          {openCategory === category._id && (
            <ul className="pl-6 mt-2">
              {category.expenses.map(expense => (
                <li key={expense._id} className="flex justify-between py-1 border-b border-gray-100">
                  <div>
                    <div className="text-sm">{expense.description}</div>
                    <div className="text-xs text-gray-500">{formatDateTimeToTH(expense?.date)}</div>
                  </div>
                  <div className="text-sm font-medium">{formatNumber(expense?.amount) ?? ""}฿</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
