import { CategoryData } from "@/store/slices/expenses/types";
import { formatDateTimeToTH } from "@/utils/date";
import { formatNumber } from "@/utils/number";
import _ from "lodash";
import { useState } from "react";
import { TbChevronDown } from "react-icons/tb";
import { GetIconComponent } from "../setIcon/GetIconComponent";

interface Props {
  data: CategoryData[] | [];
}

export default function CategoryExpenseList({ data }: Props) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleOpen = (categoryId: string) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="w-full space-y-1">
      {_.map(data, category => (
        <div key={category._id} className="overflow-hidden">
          <div 
            className="flex justify-between items-center cursor-pointer p-3 hover:bg-flow-bg rounded-xl transition-colors group" 
            onClick={() => toggleOpen(category._id)}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[14px]"
                style={{ backgroundColor: category.categoryInfo.color + '20', color: category.categoryInfo.color }}
              >
                <GetIconComponent iconName={category.categoryInfo.icon} size={16} />
              </div>
              <div>
                <div className="text-[13px] font-medium text-flow-ink">{category.categoryInfo.name}</div>
                <div className="text-[10px] text-flow-ink3 uppercase tracking-wider">{category.count} รายการ</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[14px] font-semibold text-flow-ink">฿{formatNumber(category.totalAmount)}</span>
              <div className={`text-flow-ink3 group-hover:text-flow-ink transition-transform duration-200 ${openCategory === category._id ? "rotate-180" : ""}`}>
                <TbChevronDown size={16} />
              </div>
            </div>
          </div>

          {openCategory === category._id && (
            <div className="pl-14 pr-3 pb-3 space-y-2 animate-in slide-in-from-top-1 duration-200">
              {category.expenses.map(expense => (
                <div key={expense._id} className="flex justify-between items-center py-2 border-b border-flow last:border-0">
                  <div>
                    <div className="text-[12px] text-flow-ink font-medium">{expense.description}</div>
                    <div className="text-[10px] text-flow-ink3">{formatDateTimeToTH(expense?.date).split(' ')[0]} {formatDateTimeToTH(expense?.date).split(' ')[1]}</div>
                  </div>
                  <div className="text-[12px] font-medium text-flow-ink2">฿{formatNumber(Math.abs(expense?.amount))}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
